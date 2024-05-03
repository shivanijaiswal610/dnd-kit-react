// Droppable.js

import React, { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { Document, Page } from "react-pdf";
import PDFJSWorker from 'pdfjs-dist/legacy/build/pdf.worker.entry'

import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf'

pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJSWorker

const CustomStyle = {
  display: "flex",
  width: "600px",
  height: "600px",
  background: "red",
  border: "5px solid #ccc",
};

export function Droppable({ children }) {
  const [error, setError] = useState(null);
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable"
  });
  const handleError = (err) => {
    setError(err);
  };
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div style={CustomStyle}>
      <div ref={setNodeRef} style={{ border: "2px solid black", position: "relative" }}>
        <Document
          file={"https://projectforce-qa-ui.s3.amazonaws.com/clients/09PF05VD/document-templates/344/TEST%20SIGN%20DOC_2024_04-03_05_53_47.pdf?AWSAccessKeyId=AKIA3HZE22ORMPIT7SWU&Expires=1714721272&Signature=4%2B4zSC1D9rIZRU8woJXNevPvQJQ%3D"}
          error={handleError}
        >
          {error ? (
            <div>Failed to load PDF: {error.message}</div>
          ) : (
            <div style={{ border: "2px solid black", position: "relative" }}> {/* Border style for PDF */}
              <Page pageNumber={2} />
            </div>
          )}
        </Document>
      </div>
      {children}
    </div>
  );
}
