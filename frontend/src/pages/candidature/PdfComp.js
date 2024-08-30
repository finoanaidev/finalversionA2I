import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf"; // Assurez-vous d'importer pdfjs de react-pdf

function PdfComp(props) {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="pdf-div">
      {numPages && (
        <p>
          Page {pageNumber} of {numPages}
        </p>
      )}
      <Document
        file={props.pdfFile}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.apply(null, Array(numPages || 0))
          .map((x, i) => i + 1)
          .map((page) => {
            return (
              <Page
                key={page}
                pageNumber={page}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            );
          })}
      </Document>
    </div>
  );
}
export default PdfComp;
