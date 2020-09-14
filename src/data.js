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
      taskIds: ["task-1", "task-2"],
      // know which task is currently inside which column
      // this array is also used to maintain order
    },
    "column-2": {
      id: "column-2",
      title: "Doing",
      taskIds: ["task-3", "task-4"],
      // know which task is currently inside which column
      // this array is also used to maintain order
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      taskIds: [],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3"], // dependency between here and columns obj (react looks here to build columns)
};

export default initialData;
