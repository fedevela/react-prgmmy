import "./App.css";
import Draggable from "react-draggable";
import feathersClient from "./feathersClient";
import { useEffect, useRef, useState } from "react";

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
  useEffect(() => {
    xycoordsService
      .find({
        query: {
          $limit: 1,
          $sort: {
            createdAt: -1,
          },
        },
      })
      .then((startCoords) => {
        const { x, y } = startCoords.data[0];
        setX(x);
        setY(y);
      });
  }, []);

  const onDrag = (event, ui) => {
    const { x, y } = ui;
    xycoordsService.create({ x, y }).then((createdCoords) => {
      console.log(createdCoords);
    });
  };

  return (
    <div>
      {/* <Draggable onDrag={onDrag} onStart={onStart} onStop={onStop}>÷ */}
      <Draggable
        onDrag={onDrag}
        position={{x: getX, y: getY}}
      >
        <div className="box">Progummy</div>
      </Draggable>
      <div>
        {getX},{getY}
      </div>
    </div>
  );
}

export default App;
