import React from "react";
import { Draggable } from "react-beautiful-dnd";

export const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => {
        return (
          <div
            className="border border-gray-300 mb-2 p-2 rounded-md bg-white shadow-sm"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {task.content}
          </div>
        );
      }}
    </Draggable>
  );
};
