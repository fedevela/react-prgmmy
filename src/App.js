import { useEffect, useState } from "react";
import "./App.css";
import Draggable from "react-draggable";

function App() {
  const onDrag = (event, ui) => {
    // console.log(event);
    console.log(`(${ui.x},${ui.y})`);
    // this.setState({
    //   deltaPosition: {
    //     x: x + ui.deltaX,
    //     y: y + ui.deltaY,
    //   },
    // });
  };


  const onStart = () => {
    console.log(`START`)
  };
  const onStop = () => {
    console.log(`STOP`)
  };

  return (
    <div>
      <Draggable onDrag={onDrag} onStart={onStart} onStop={onStop}>
        <div className="box">Progummy</div>
      </Draggable>
    </div>
  );
}

export default App;
