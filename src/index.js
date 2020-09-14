import React, { useState } from "react";
import ReactDOM from "react-dom";
import { DragDropContext } from "react-beautiful-dnd";
import "./styles/tailwind.output.css";

import { Column } from "./components/Column";
import initialData from "./data";

const DELETE_ON_DRAG_AWAY = true;

const App = () => {
  const [data, setData] = useState(initialData);

  const onDelete = (result) => {
    if (window.confirm("Would you like to delete this task?")) {
      alert("too bad. this is still TODO");
    } else {
      console.log("delete cancelled.");
    }
  };

  const onDragStart = () => {
    document.body.style.color = "#7d8491";
    document.body.style.transition =
      "background-color 300ms ease, color 300ms ease";
  };

  const onDragUpdate = (update) => {
    const { destination } = update;
    const opacity = destination
      ? destination.index / Object.keys(data.tasks).length
      : 0;

    document.body.style.backgroundColor = `rgba(24, 48, 89, ${opacity})`;
  };

  const onDragEnd = (result) => {
    document.body.style.color = "inherit";
    document.body.style.backgroundColor = "inherit";

    const hasLocationChanged = (destination, source) =>
      destination.droppableId === source.droppableId &&
      destination.index === source.index;

    const { destination, source, draggableId } = result;

    // deal with invalid / outside drops
    if (!destination) {
      DELETE_ON_DRAG_AWAY && onDelete(result);
      return;
    }
    // deal with same location drops
    if (hasLocationChanged(destination, source)) return;

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
    <DragDropContext
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <div className={`grid grid-cols-${data.columnOrder.length} gap-4 m-4`}>
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
