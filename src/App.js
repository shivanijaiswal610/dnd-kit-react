import React, { useState } from "react";
import { DndContext, useDraggable } from "@dnd-kit/core";
import { Draggable } from "./Draggable";
import { Droppable } from "./Droppable";

const notesData = [
  {
    id: "1",
    content: "Drag me....",
    position: {
      x: 0,
      y: 0
    }
  }
];

export default function App() {
  const [notes, setNotes] = useState(notesData);

  function handleDragEnd(ev) {
    // What to do here??
    // It's not a sortable, it's a free drag and drop
    const note = notes.find((x) => x.id === ev.active.id);
    note.position.x += ev.delta.x;
    note.position.y += ev.delta.y;
    const _notes = notes.map((x) => {
      if (x.id === note.id) return note;
      return x;
    });
    console.log("ev>>>>>>>>>>>>>", _notes);

    setNotes(_notes);
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Droppable>
        {notes.map((note) => (
          <Draggable
            styles={{
              position: "absolute",
              left: `${note.position.x}px`,
              top: `${note.position.y}px`
            }}
            key={note.id}
            id={note.id}
            content={note.content}
          />
        ))}
      </Droppable>
    </DndContext>
  );
}
