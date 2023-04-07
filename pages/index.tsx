/* eslint-disable @next/next/no-img-element */
import imageUrlBuilder from "@sanity/image-url"
import groq from "groq";
import Link from 'next/link'
import { NextSeo } from "next-seo";

import {client} from '../sanity/lib/client'

const pageQuery = groq`
*[_type == 'exhibit']{
  dates,
  image,
  title,
  _id,
  "name": artist->{artist}
 }`;

const builder = imageUrlBuilder({
  projectId: "qqm4pe8m",
  dataset: "production"
})
export default function IndexPage(props) {

  return (
    <>
            <NextSeo
      title="MMXX"
      description="Via Donatello 35, 20131 MILANO"
      openGraph={{
        type: 'website',
        locale: 'en_IE',
        //url: `${process.env.BASE_URL+router.asPath}`,
        title: `MMXX`,
        description: 'Via Donatello 35, 20131 MILANO',
        // images: [
        //   {
        //     url: `${exhibit.imgUrl}`,
        //     width: 800,
        //     height: 600,
        //     alt: `${exhibit.name.artist}: ${exhibit.title}`,
        //   },
        // ],
        site_name: 'MMXX',
      }}
      // twitter={{
      //   site: `${process.env.BASE_URL}`,
      //   cardType: "summary_large_image",
      // }}
    />
            {props.res.map((obj) => {
              let linkName = obj.title.toLowerCase().replace(/\s+/g, '').replace(/&/g,"").slice(0, 200)
              return(
                <div key={obj._id} className="content">
                <Link key={obj._id} href={linkName}>
                  <p>{obj.name.artist}<i> {obj.title}</i> {obj.dates}</p>
                  <div className="exhibitImg">
                    <img 
                    src={builder.image(obj.image).url()}
                    alt={obj.name.artist}
                    width="50%"
                    />
                  </div>
                </Link>
                </div>
              )
            })}
    </>
  )
}

IndexPage.getInitialProps = async() => {
  const res = await client.fetch(pageQuery)
  return {
    res
  }
}