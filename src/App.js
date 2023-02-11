import "./App.css";
import feathersClient from "./feathersClient";
import { useRef, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const xycoordsService = feathersClient.service("xycoords");
const clientUUID = uuidv4();

function App() {
  const draggableElemRef = useRef(null);
  const [getDragStartProps, setDragStartProps] = useState({});
  const [getIsDragging, setIsDragging] = useState(false);

  function executeCSSTranslate(xValue, yValue) {
    draggableElemRef.current.style.transform = `translate(${xValue}px, ${yValue}px)`;
  }

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
        executeCSSTranslate(xValue, yValue);
        draggableElemRef.current.style.visibility = "visible";
      });

    xycoordsService.on("created", (coord) => {
      if (clientUUID !== coord.clientUUID) {
        const { xValue, yValue } = coord;
        // const { left, top } = draggableElemRef.current.getBoundingClientRect();
        executeCSSTranslate(xValue, yValue);
        // debugger;
      }
    });
  }, []);

  function executeUpdatePosition(clientX, clientY) {
    const xValue =
      getDragStartProps.dragStartLeft + clientX - getDragStartProps.dragStartX;
    const yValue =
      getDragStartProps.dragStartTop + clientY - getDragStartProps.dragStartY;
    executeCSSTranslate(xValue, yValue);

    xycoordsService.create({ xValue, yValue, clientUUID }).catch((error) => {
      console.error("Error creating coordinates!");
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

  const stopDragging = () => {
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
