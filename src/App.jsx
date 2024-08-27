import React, { useState } from 'react';
import CanvasComponent from './components/CanvasComponent';
import Toolbar from './components/ToolbarComponent';
import './App.css';

const PaintApp = () => {
  const canvasRef = React.useRef(null);
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(5);

  const undoLastAction = () => canvasRef.current.undoLastAction();
  const redoLastAction = () => canvasRef.current.redoLastAction();
  const downloadPNG = () => canvasRef.current.downloadPNG();
  const downloadWithWhiteBG = () => canvasRef.current.downloadWithWhiteBG();

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-pink-100">
      <Toolbar
        undoLastAction={undoLastAction}
        redoLastAction={redoLastAction}
        downloadPNG={downloadPNG}
        downloadWithWhiteBG={downloadWithWhiteBG}
        color={color}
        setColor={setColor}
        lineWidth={lineWidth}
        setLineWidth={setLineWidth}
      />
      <CanvasComponent
        ref={canvasRef}
        color={color}
        lineWidth={lineWidth}
      />
    </div>
  );
};

export default PaintApp;
