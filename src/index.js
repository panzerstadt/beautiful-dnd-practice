import React, { useState } from "react";
import ReactDOM from "react-dom";
import { DragDropContext } from "react-beautiful-dnd";
import "./styles/tailwind.output.css";

import { Column } from "./components/Column";
import initialData from "./data";

const App = () => {
  const [data, setData] = useState(initialData);

  const onDelete = (result) => {
    if (window.confirm("Would you like to delete this task?")) {
      alert("too bad. this is still TODO");
    } else {
      console.log("delete cancelled.");
    }
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) onDelete(result);

    // check to see if the location of the draggable changed
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // from here, dnd needs to rearrange stuff
    // 1. reorder task ids from array
    const column = data.columns[source.droppableId]; // FROM

    const newTaskIds = Array.from(column.taskIds); // FROM (immutable copy)
    console.log("original ID array: ", newTaskIds);
    newTaskIds.splice(source.index, 1); // remove FROM index
    console.log("removed old ID: ", source.index, newTaskIds);
    newTaskIds.splice(destination.index, 0, draggableId); // replace TO index
    console.log("replaced new ID: ", destination.index, newTaskIds);

    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newColumn.id]: newColumn,
      },
    };

    setData(newState); // optimistic update, the server doesn't know this yet

    // maybe send the update to the server here (to update the database, which in this case is just the data.js)
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
