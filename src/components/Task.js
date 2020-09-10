import React from "react";

export const Task = ({ task }) => {
  return (
    <div className="border border-grey-300 mb-2 p-2 rounded-md">
      {task.content}
    </div>
  );
};
