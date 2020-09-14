import React, { useState } from "react";
import ReactDOM from "react-dom";
import { DragDropContext } from "react-beautiful-dnd";
import "./styles/tailwind.output.css";

import { Column } from "./components/Column";
import initialData from "./data";

const DELETE_ON_DRAG_AWAY = true;

const App = () => {
  const [data, setData] = useState(initialData);
  const [homeIndex, setHomeIndex] = useState(null);

  const onDelete = (result) => {
    if (window.confirm("Would you like to delete this task?")) {
      alert("too bad. this is still TODO");
    } else {
      console.log("delete cancelled.");
    }
  };

  const onDragStart = (start) => {
    document.body.style.color = "#7d8491";
    document.body.style.transition =
      "background-color 300ms ease, color 300ms ease";

    const homeIndex = data.columnOrder.indexOf(start.source.droppableId);
    setHomeIndex(homeIndex);
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

    setHomeIndex(null);

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
    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds); // FROM (immutable copy)
      newTaskIds.splice(source.index, 1); // remove FROM index
      newTaskIds.splice(destination.index, 0, draggableId); // update TO index

      const newColumn = {
        ...start,
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
      return;
    }

    // moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const startColumn = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const finishColumn = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [startColumn.id]: startColumn,
        [finishColumn.id]: finishColumn,
      },
    };

    setData(newState);

    // maybe send the update to the server in a useEffect that listens to data changes (to update the database, which in this case is just the data.js)
  };

  return (
    <DragDropContext
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <div className={`grid grid-cols-${data.columnOrder.length} gap-4 m-4`}>
        {data.columnOrder.map((columnId, index) => {
          const column = data.columns[columnId];
          const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

          const isDropDisabled = index < homeIndex;

          return (
            <Column
              key={column.id}
              column={column}
              tasks={tasks}
              isDropDisabled={isDropDisabled}
            />
          );
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
