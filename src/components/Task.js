import React from "react";
import { Draggable } from "react-beautiful-dnd";

// snapshot returns
// isDragging: Boolean
// draggingOver: id / null

const Container = ({ dndProvided, isDragging, children, ...rest }) => {
  const bgColor = isDragging ? "bg-green-200" : "bg-white";
  return (
    <div
      className={
        "border border-gray-300 mb-2 p-2 rounded-md shadow-sm " + bgColor
      }
      {...rest}
      {...dndProvided.draggableProps}
      {...dndProvided.dragHandleProps}
      ref={dndProvided.innerRef}
      isDragging={isDragging}
    >
      {children}
    </div>
  );
};

export const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => {
        return (
          <Container dndProvided={provided} isDragging={snapshot.isDragging}>
            {task.content}
          </Container>
        );
      }}
    </Draggable>
  );
};
