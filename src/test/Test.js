import React from "react";

var placeholder = document.createElement("li");
placeholder.className = "placeholder";

function Test() {
  const list = ["a", "b", "c", "d"];
  var dragged, over;

  return (
    <div
      onDragOver={e => {
        console.log(e);
        e.preventDefault();
        dragged.style.display = "none";
        if (e.target.className === "placeholder") return;
        over = e.target;
        e.target.parentNode.insertBefore(placeholder, e.target);
      }}
    >
      {list.map((el, index) => {
        return (
          <div
            style={{
              width: 100,
              hegith: 50,
              backgroundColor: "red",
              border: "1px solid"
            }}
            data-id={index}
            draggable
            onDragStart={e => {
              console.log("start", e);
              dragged = e.currentTarget;
              e.dataTransfer.effectAllowed = "move";
              e.dataTransfer.setData("text/html", dragged);
            }}
            onDragEnd={e => {
              dragged.style.display = "block";
              dragged.parentNode.removeChild(placeholder);

              console.log("end", dragged.dataset.id, over.dataset.id);
            }}
          >
            {el}
          </div>
        );
      })}
    </div>
  );
}

export default Test;
