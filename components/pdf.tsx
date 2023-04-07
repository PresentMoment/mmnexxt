import React, { useState } from 'react'
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PdfProps {
  exhibit: ExhibitItem[],
  language: string;
}

interface ExhibitItem {
  pdfFileUrl: string;
  pressrelease: any[];
}


const Pdf: React.FC<PdfProps> = (props) => {
  const [numPages, setNumPages] = useState(null)
  const fileString = props.exhibit.pdfFileUrl[props.exhibit.pressrelease.findIndex(i => i.language.includes(props.language))]
  return(
    <Document
    file={fileString}
    //onLoadSuccess={onDocumentLoadSuccess}
  >
    {Array.from(new Array(numPages), (el, index) => (
      <Page
        key={`page_${index + 1}`}
        pageNumber={index + 1}
        //width={this.screenSizeSwitch(this.state.window)}
      />
    ))}
  </Document>
    )
}
export default Pdf