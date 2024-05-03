import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";

const CustomStyle = {
  display: "flex",
  width: "140px",
  height: "140px",
  backgroundColor: "#e8e8a2"
};

const inputStyle = {
  width: "100%",
  height: "10%",
  border: "1px solid #ccc",
  padding: "8px"
};

export function Draggable({ id, content, styles }) {
  const [inputValue, setInputValue] = useState(content); // State to hold input value
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id
  });

  if (!setNodeRef) {
    throw new Error(
      "The setNodeRef function is missing. Make sure you're using the Draggable component within a proper context."
    );
  }

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
      }
    : {};

  // Function to handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Update input value
  };

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, ...styles }}
      {...listeners}
      {...attributes}
    >
     <button type="button">Click Me!</button>
    </div>
  );
}
