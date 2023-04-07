import React, { useEffect,useState } from 'react'
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PdfProps {
  exhibit: ExhibitItem
}

interface ExhibitItem {
  pdfFileUrl: string;
  pressrelease: any[];
  checklistUrl: any;
}


const ChecklistPDF: React.FC<PdfProps> = (props) => {
  console.log(typeof props.exhibit)
  const [numPages, setNumPages] = useState(null)
  const fileString = props.exhibit.checklistUrl;
  return(
    <Document
    file={fileString}
  >
    {Array.from(new Array(numPages), (el, index) => (
      <Page
        key={`page_${index + 1}`}
        pageNumber={index + 1}
      />
    ))}
  </Document>
    )
}
export default ChecklistPDF