import React from "react";
import { Droppable } from "react-beautiful-dnd";

import { Task } from "./Task";

const Container = ({ children }) => {
  return (
    <div className="m-4 border border-grey-700 rounded-md">{children}</div>
  );
};

const Title = ({ children }) => {
  return <h3 className="p-4">{children}</h3>;
};

const TaskList = ({ children, innerRef }) => {
  return (
    <div className="p-4" ref={innerRef}>
      {children}
    </div>
  );
};

export const Column = (props) => {
  console.log(props);
  // return JSON.stringify(props);

  return (
    <Container>
      <Title>{props.column.title}</Title>
      <Droppable droppableId={props.column.id}>
        {(provided, snapshot) => {
          return (
            <TaskList {...provided.droppableProps} innerRef={provided.innerRef}>
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
