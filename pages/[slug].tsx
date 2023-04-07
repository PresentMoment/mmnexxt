import { NextSeo } from "next-seo";
import React, { Suspense,useState } from 'react'

import Gallery from '../components/gallery'
import {client} from '../sanity/lib/client'
const Pdf = React.lazy(() => import('../components/pdf'))
const ChecklistPDF = React.lazy(() => import('../components/checklistPdf'))


const Exhibit = ({exhibit}) => {
  const [showExhibit, setShowExhibit] = useState(false)
  const [showSingles, setShowSingles] = useState(false)
  const [showEngPdf, setShowEngPdf] = useState(false)
  const [showItPdf, setShowItPdf] = useState(false)
  const [showChecklist, setShowChecklist] = useState(false)

  const handleClick = (x) => {
    let currentTarget = "show" + x;
    const scrollTarget = document.getElementById(`${x}`);
    if (currentTarget === "showExhibit") {
      setShowExhibit(!showExhibit);
    } else if (currentTarget === "showSingles") {
      setShowSingles(!showSingles);
    } else if (currentTarget === "showEngPdf") {
      setShowEngPdf(!showEngPdf);
    } else if (currentTarget === "showItPdf") {
      setShowItPdf(!showItPdf);
    } else if (currentTarget === "showChecklist") {
      setShowChecklist(!showChecklist);
    }
    scrollTarget.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
  return (
    <>
        <NextSeo
      title={`${exhibit.name.artist}: ${exhibit.title}`}
      description="MMXX"
      openGraph={{
        type: 'website',
        locale: 'en_IE',
        //url: `${process.env.BASE_URL+router.asPath}`,
        title: `${exhibit.name.artist}: ${exhibit.title} - MMXX`,
        description: 'MMXX',
        images: [
          {
            url: `${exhibit.imgUrl}`,
            width: 800,
            height: 600,
            alt: `${exhibit.name.artist}: ${exhibit.title}`,
          },
        ],
        site_name: 'MMXX',
      }}
      // twitter={{
      //   site: `${process.env.BASE_URL}`,
      //   cardType: "summary_large_image",
      // }}
    />
    <div className="content">
        <div className="exhibitTitle">
       <p>{exhibit.name.artist}<i> {exhibit.title && exhibit.title}</i> {exhibit.dates}</p>
        </div>
        <div id="Exhibit" className='galleryButton'>
        <p
            onClick={() => handleClick("Exhibit")}
            className="exhibitItems"
          >
            Exhibition Views
          </p>
          {showExhibit &&
      <div className='galleryContainer'>
        <Gallery props={exhibit.images} />
      </div>
          }
      </div>
      {exhibit.singleWorks &&
      <div id="Singles">
              <p
                onClick={() => handleClick("Singles")}
                className="exhibitItems"
              >
                Single works
              </p>
              {showSingles &&
      <div className='galleryContainer'>
      <Gallery props={exhibit.singleWorks} />
    </div>
        } 
        </div>    
      }
      {exhibit.checklistUrl &&
      <div id="Checklist" className='pdfLinkContainer'>
        <p
            onClick={() => handleClick("Checklist")}
            className="exhibitItems"
          >
            Checklist
          </p>
          {showChecklist ? (
            <div>
              <Suspense fallback={<div>Loading...</div>}>
              <ChecklistPDF exhibit={exhibit} />
              </Suspense>
            </div>
          ) : null}
      </div>
      }
       <div id="EngPdf" className='pdfLinkContainer'>
          <p
            onClick={() => handleClick("EngPdf")}
            className="exhibitItems"
          >
            Press release
          </p>
          {showEngPdf ? (
            <div>
              <Suspense fallback={<div>Loading...</div>}>
              <Pdf exhibit={exhibit} language="English" />
              </Suspense>
            </div>
          ) : null}
        </div>
        
        {exhibit.pressrelease.length > 1 &&
        <div id="ItPdf" className='pdfLinkContainer'>
          <p
            onClick={() => handleClick("ItPdf")}
            className="exhibitItems"
            >
            Press release (Italian)
          </p>
          {showItPdf ? (
            <div>
              <Suspense fallback={<div>Loading...</div>}>
              <Pdf exhibit={exhibit} language="Italian" />
              </Suspense>
            </div>
          ) : null}
        </div>
        }

      </div>
      </>
  )
}

export async function getStaticPaths() {
  const paths = await client.fetch(
    `*[_type == "exhibit" && defined(slug.current)][].slug.current`
  )

  return {
    paths: paths.map((slug) => ({params: {slug}})),
    fallback: true,
  }
}

export async function getStaticProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = context.params
  const exhibit = await client.fetch(`
    *[_type == "exhibit" && slug.current == $slug ]{
      ...,
      "pdfFileUrl": [pressrelease[0].asset->url, pressrelease[1].asset->url],
      "checklistUrl": checklist.asset->url,
      "imgUrl": image.asset->url,
      "name": artist->{artist},
      "imgMeta": image {
        asset->{
          metadata->
        }
      }
     }[0]
  `, { slug })
  
  return {
    props: {
      exhibit
    }
  }
}

export default Exhibit