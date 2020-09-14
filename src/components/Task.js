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

const Container = ({
  dndProvided,
  isDragging,
  children,
  isDragDisabled,
  ...rest
}) => {
  const generic =
    "flex justify-between items-center mb-2 p-2 rounded-md shadow-sm text-xs";
  const bgColor = isDragging ? "bg-green-200" : "bg-white";
  const border = `border ${
    isDragDisabled ? "border-gray-100" : "border-gray-300"
  }`;
  const color = isDragDisabled ? "text-gray-500" : "text-gray-800";
  return (
    <div
      className={[generic, bgColor, border, color].join(" ")}
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
  const isDragDisabled = task.id === "task-1";
  return (
    <Draggable
      draggableId={task.id}
      index={index}
      isDragDisabled={isDragDisabled}
    >
      {(provided, snapshot) => {
        return (
          <Container
            dndProvided={provided}
            isDragging={snapshot.isDragging}
            isDragDisabled={isDragDisabled}
          >
            {task.content}
          </Container>
        );
      }}
    </Draggable>
  );
};
