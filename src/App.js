import "./App.css";
import Draggable from "react-draggable";
import feathersClient from "./feathersClient";

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

  const onDrag = (event, ui) => {
    const { x, y } = ui;
    xycoordsService.create({ x, y }).then((wut) => {
      console.log(wut);
    });
  };

  return (
    <div>
      {/* <Draggable onDrag={onDrag} onStart={onStart} onStop={onStop}>÷ */}
      <Draggable onDrag={onDrag}>
        <div className="box">Progummy</div>
      </Draggable>
    </div>
  );
}

export default App;
