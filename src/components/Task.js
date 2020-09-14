import React from "react";
import { Draggable } from "react-beautiful-dnd";

// snapshot returns
// isDragging: Boolean
// draggingOver: id / null

const Handle = ({ dragHandleProps, children, ...rest }) => {
  return (
    <div
      className=" bg-orange-300 rounded-md h-4 w-4"
      {...rest}
      {...dragHandleProps}
    >
      {children}
    </div>
  );
};

const Container = ({ dndProvided, isDragging, children, ...rest }) => {
  const bgColor = isDragging ? "bg-green-200" : "bg-white";
  return (
    <div
      className={
        "flex justify-between items-center border border-gray-300 mb-2 p-2 rounded-md shadow-sm text-xs " +
        bgColor
      }
      {...rest}
      {...dndProvided.draggableProps}
      // {...dndProvided.dragHandleProps}
      ref={dndProvided.innerRef}
      isDragging={isDragging}
    >
      {children}
      <Handle dragHandleProps={dndProvided.dragHandleProps} />
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
