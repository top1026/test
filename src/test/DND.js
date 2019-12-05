import React, { useState } from "react";

var placeholder = document.createElement("li");
placeholder.className = "placeholder";

function Test2() {
  const [list, setList] = useState([
    {
      id: "1",
      taskName: "Read book",
      type: "inProgress",
      backgroundColor: "red"
    },
    {
      id: "2",
      taskName: "Pay bills",
      type: "inProgress",
      backgroundColor: "green"
    },
    {
      id: "3",
      taskName: "Go to the gym",
      type: "Done",
      backgroundColor: "blue"
    },
    {
      id: "4",
      taskName: "Play baseball",
      type: "Done",
      backgroundColor: "green"
    }
  ]);
  const tasks = { inProgress: [], Done: [] };

  const onDragStart = (event, taskName) => {
    console.log("dragstart on div: ", taskName);
    event.dataTransfer.setData("taskName", taskName);
  };
  const onDragOver = event => {
    event.preventDefault();
  };

  const onDrop = (event, cat) => {
    let taskName = event.dataTransfer.getData("taskName");

    console.log(taskName, cat);
    let tmp = list.filter(task => {
      if (task.taskName === taskName) {
        task.type = cat;
      }
      return task;
    });

    console.log(tmp);
    setList(tmp);
  };

  list.forEach(task => {
    tasks[task.type].push(
      <div
        key={task.taskName}
        className="draggable"
        style={{ backgroundColor: task.bgcolor }}
        onDragStart={event => onDragStart(event, task.taskName)}
        draggable
      >
        {task.taskName}
      </div>
    );
  });

  console.log(tasks);
  return (
    <div className="drag-container">
      <h2 className="head">To Do List Drag & Drop</h2>
      <div
        className="inProgress"
        onDragOver={event => onDragOver(event)}
        onDrop={event => {
          onDrop(event, "inProgress");
        }}
      >
        <span className="group-header">In Progress</span>
        {tasks.inProgress}
      </div>
      <div
        className="droppable"
        onDragOver={event => onDragOver(event)}
        onDrop={event => onDrop(event, "Done")}
      >
        <span className="group-header">Done</span>
        {tasks.Done}
      </div>
    </div>
  );
}

export default Test2;
