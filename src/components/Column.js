import React from "react";
import { Droppable } from "react-beautiful-dnd";

import { Task } from "./Task";

const Container = ({ children }) => {
  return (
    <div className="border border-grey-700 rounded-md bg-white flex flex-col">
      {children}
    </div>
  );
};

const Title = ({ children }) => {
  return <h3 className="p-4">{children}</h3>;
};

const TaskList = ({ children, isDragging, innerRef }) => {
  const defaultStyle = "p-4 flex-grow";
  const draggingStyle =
    "border border-2 border-dashed bg-indigo-100 " + defaultStyle;
  return (
    <div
      style={{ minHeight: 100 }}
      className={isDragging ? draggingStyle : defaultStyle}
      ref={innerRef}
    >
      {children}
    </div>
  );
};

export const Column = (props) => {
  return (
    <Container>
      <Title>{props.column.title}</Title>
      <Droppable
        droppableId={props.column.id}
        // type={props.column.id === "column-3" ? "done" : "active"} // method 1: disabling by matching type
        isDropDisabled={props.isDropDisabled} // method 2
      >
        {(provided, snapshot) => {
          return (
            <TaskList
              {...provided.droppableProps}
              isDragging={snapshot.isDraggingOver}
              innerRef={provided.innerRef}
            >
              {props.tasks.map((task, index) => (
                <Task key={task.id} index={index} task={task} />
              ))}
              {provided.placeholder}
            </TaskList>
          );
        }}
      </Droppable>
    </Container>
  );
};
