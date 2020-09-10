import React, { useState } from "react";
import ReactDOM from "react-dom";
import { DragDropContext } from "react-beautiful-dnd";
import "./styles/tailwind.output.css";

import { Column } from "./components/Column";
import initialData from "./data";

const App = () => {
  const [data, setData] = useState(initialData);

  const onDragEnd = (result) => {
    // the only required function in dnd
    // FIXME: todo
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {data.columnOrder.map((columnId) => {
        const column = data.columns[columnId];
        const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

        return <Column key={column.id} column={column} tasks={tasks} />;
      })}
    </DragDropContext>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
