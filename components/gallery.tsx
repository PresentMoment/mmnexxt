

import createClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from "@sanity/image-url/lib/types/types"
import useEmblaCarousel from 'embla-carousel-react'
import { useNextSanityImage } from 'next-sanity-image';

import {client} from '../sanity/lib/client'

const builder = imageUrlBuilder(client);

const configuredSanityClient = createClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
	useCdn: true
});

const Gallery = (props) => {
  const imageProps = useNextSanityImage(configuredSanityClient, props.props);

  const urlFor = (source: SanityImageSource) => {
    return builder.image(source)}
    
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center', containScroll: 'trimSnaps' })
  
return(
  <div className="embla">
  <div className="embla__viewport" ref={emblaRef}>
    <div className="embla__container">
  {props.props.map((e) => {
    return(
      <div className="embla__slide" key={e._key}>
      <img className='slideImage' src={builder.image(e).url()} alt="" key={e._key}/>
      </div>
    )
  })}
  </div>
  </div>
  </div>
)
}

export default Gallery;