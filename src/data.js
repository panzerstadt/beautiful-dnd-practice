const initialData = {
  tasks: {
    // any structure is fine
    "task-1": { id: "task-1", content: "take out the garbage" },
    "task-2": { id: "task-2", content: "take out the garbage again" },
    "task-3": { id: "task-3", content: "take out the garbage the third time" },
    "task-4": { id: "task-4", content: "have orange juice" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To Do",
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
      // know which task is currently inside which column
      // this array is also used to maintain order
    },
  },
  columnOrder: ["column-1"],
};

export default initialData;
