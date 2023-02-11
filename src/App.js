import "./App.css";
// import Draggable from "react-draggable";
import feathersClient from "./feathersClient";
import { useRef, useEffect, useState } from "react";

const xycoordsService = feathersClient.service("xycoords");

function App() {
  // const onDrag = (event, ui) => {
  //   // console.log(event);
  //   console.log(`(${ui.x},${ui.y})`);
  //   // this.setState({
  //   //   deltaPosition: {
  //   //     x: x + ui.deltaX,
  //   //     y: y + ui.deltaY,
  //   //   },
  //   // });
  // };

  // const onStart = () => {
  //   console.log(`START`);
  // };
  // const onStop = () => {
  //   console.log(`STOP`);
  // };
  const [getX, setX] = useState(0);
  const [getY, setY] = useState(0);
  // useEffect(() => {
  //   xycoordsService
  //     .find({
  //       query: {
  //         $limit: 1,
  //         $sort: {
  //           createdAt: -1,
  //         },
  //       },
  //     })
  //     .then((startCoords) => {
  //       const { x, y } = startCoords.data[0];
  //       setX(x);
  //       setY(y);
  //     });
  // }, []);
  const elemRef = useRef(null);
  // const dragProps = useRef(null);
  const [getDragProps, setDragProps] = useState({});

  const [getIsDragging, setIsDragging] = useState(false);

  const onMouseDown = (event) => {
    console.log("MOUSE DOWN");
    // console.log(event);
    setIsDragging(true);
    const { target, clientX, clientY } = event;
    const { offsetTop, offsetLeft } = target;
    const { left, top } = elemRef.current.getBoundingClientRect();

    setDragProps({
      dragStartLeft: left - offsetLeft,
      dragStartTop: top - offsetTop,
      dragStartX: clientX,
      dragStartY: clientY,
    });
    // window.addEventListener("mousemove", doDragging, false);
    // window.addEventListener("mouseup", stopDragging, false);
  };

  const doDragging = (event) => {
    if (getIsDragging) {
      elemRef.current.style.transform = `translate(${
        getDragProps.dragStartLeft + event.clientX - getDragProps.dragStartX
      }px, ${
        getDragProps.dragStartTop + event.clientY - getDragProps.dragStartY
      }px)`;
      // console.log("MOUSE DRAG");
      console.log(`(${event.clientX},${event.clientY})`);
    }
  };

  const stopDragging = (event) => {
    console.log("MOUSE UP");
    // console.log(event);
    setIsDragging(false);

    // window.removeEventListener("mousemove", doDragging, false);
    // window.removeEventListener("mouseup", stopDragging, false);
  };

  // const onDrag = (event, ui) => {
  //   const { x, y } = ui;
  //   xycoordsService.create({ x, y }).then((createdCoords) => {
  //     console.log(createdCoords);
  //   });

  //   // event.preventDefault();
  //   event.stopPropagation();
  // };

  return (
    <div
      onMouseDown={onMouseDown}
      onMouseMove={doDragging}
      onMouseUp={stopDragging}
      ref={elemRef}
      className="box"
    >
      Progummy
    </div>
    // <Draggable
    //     onDrag={onDrag}>
    // <div>
    //   <h1>I can now be moved around!</h1>
    // </div>
    // </Draggable>
    // <div>
    //   {/* <Draggable onDrag={onDrag} onStart={onStart} onStop={onStop}>÷ */}
    //   <Draggable
    //     // onDrag={onDrag}
    //     // position={{x: getX, y: getY}}
    //   >
    //     <div className="box">Progummy</div>
    //   </Draggable>
    //   <div>
    //     {getX},{getY}
    //   </div>
    // </div>
  );
}

export default App;
