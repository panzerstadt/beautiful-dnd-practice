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
    const isSameColumn = source.droppableId === destination.droppableId;
    // 1. reorder task ids from array
    const fromColumn = data.columns[source.droppableId]; // FROM
    console.log("from column", fromColumn);

    const newFromTaskIds = Array.from(fromColumn.taskIds); // FROM (immutable copy)
    console.log("original ID array: ", newFromTaskIds);
    newFromTaskIds.splice(source.index, 1); // remove FROM index
    console.log("removed old ID: ", source.index, newFromTaskIds);

    const toColumn = data.columns[destination.droppableId]; // TO
    console.log("to column", toColumn);

    const newToTaskIds = isSameColumn
      ? newFromTaskIds
      : Array.from(toColumn.taskIds);
    newFromTaskIds.splice(destination.index, 0, draggableId); // replace TO index
    console.log("replaced new ID: ", destination.index, newToTaskIds);

    const newFromColumn = {
      ...fromColumn,
      taskIds: newFromTaskIds,
    };

    const newToColumn = {
      ...toColumn,
      taskIds: newToTaskIds,
    };

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newFromColumn.id]: newFromColumn,
        [newToColumn.id]: newToColumn,
      },
    };

    setData(newState); // optimistic update, the server doesn't know this yet

    // maybe send the update to the server here (to update the database, which in this case is just the data.js)
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={`grid grid-cols-${data.columnOrder.length}`}>
        {data.columnOrder.map((columnId) => {
          const column = data.columns[columnId];
          const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </div>
    </DragDropContext>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
