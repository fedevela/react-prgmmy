import "./App.css";
import feathersClient from "./feathersClient";
import { useRef, useEffect, useState } from "react";

const xycoordsService = feathersClient.service("xycoords");

function App() {
  const draggableElemRef = useRef(null);
  const [getDragStartProps, setDragStartProps] = useState({});
  const [getIsDragging, setIsDragging] = useState(false);

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
        const { xValue, yValue } = startCoords.data[0];
        draggableElemRef.current.style.transform = `translate(${xValue}px, ${yValue}px)`;
        draggableElemRef.current.style.visibility = "visible";
      });
  }, []);

  function executeUpdatePosition(clientX, clientY) {
    const xValue =
      getDragStartProps.dragStartLeft + clientX - getDragStartProps.dragStartX;
    const yValue =
      getDragStartProps.dragStartTop + clientY - getDragStartProps.dragStartY;
    draggableElemRef.current.style.transform = `translate(${xValue}px, ${yValue}px)`;

    xycoordsService
      .create({ xValue, yValue })
      .catch((error) => {
        console.error(error);
      });
  }

  const startDragging = (event) => {
    setIsDragging(true);
    const { target, clientX, clientY } = event;
    const { offsetTop, offsetLeft } = target;
    const { left, top } = draggableElemRef.current.getBoundingClientRect();

    setDragStartProps({
      dragStartLeft: left - offsetLeft,
      dragStartTop: top - offsetTop,
      dragStartX: clientX,
      dragStartY: clientY,
    });
  };

  const doDragging = (event) => {
    if (getIsDragging) {
      const { clientX, clientY } = event;
      executeUpdatePosition(clientX, clientY);
    }
  };

  const stopDragging = (event) => {
    setIsDragging(false);
  };

  return (
    <div
      onMouseDown={startDragging}
      onMouseMove={doDragging}
      onMouseUp={stopDragging}
      ref={draggableElemRef}
      className="box"
    >
      Progummy
    </div>
  );
}

export default App;
