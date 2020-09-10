import React from "react";

import { Task } from "./Task";

const Container = ({ children }) => {
  return (
    <div className="m-4 border border-grey-700 rounded-md">{children}</div>
  );
};

const Title = ({ children }) => {
  return <h3 className="p-4">{children}</h3>;
};

const TaskList = ({ children }) => {
  return <div className="p-4">{children}</div>;
};

export const Column = (props) => {
  console.log(props);
  // return JSON.stringify(props);

  return (
    <Container>
      <Title>{props.column.title}</Title>
      <TaskList>
        {props.tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </TaskList>
    </Container>
  );
};
