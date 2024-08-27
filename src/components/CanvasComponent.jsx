import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';

const CanvasComponent = forwardRef(({ color, lineWidth }, ref) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState([]);
  const [undoIndex, setUndoIndex] = useState(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const ctx = canvas.getContext('2d');
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctxRef.current = ctx;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  useEffect(() => {
    if (ctxRef.current) {
      ctxRef.current.strokeStyle = color;
    }
  }, [color]);

  useEffect(() => {
    if (ctxRef.current) {
      ctxRef.current.lineWidth = lineWidth;
    }
  }, [lineWidth]);

  const startDrawing = (e) => {
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const newHistory = history.slice(0, undoIndex + 1);
    setHistory([...newHistory, canvas.toDataURL()]);
    setUndoIndex(undoIndex + 1);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctxRef.current.stroke();
  };

  useImperativeHandle(ref, () => ({
    undoLastAction() {
      if (undoIndex <= 0) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const previousImage = new Image();
      previousImage.src = history[undoIndex - 1];
      previousImage.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(previousImage, 0, 0);
        setUndoIndex(undoIndex - 1);
      };
    },

    redoLastAction() {
      if (undoIndex >= history.length - 1) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const nextImage = new Image();
      nextImage.src = history[undoIndex + 1];
      nextImage.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(nextImage, 0, 0);
        setUndoIndex(undoIndex + 1);
      };
    },

    downloadPNG() {
      const canvas = canvasRef.current;
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'dibujo.png';
      link.click();
    },

    downloadWithWhiteBG() {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');

      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      tempCtx.fillStyle = 'white';
      tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

      const img = new Image();
      img.src = image;
      img.onload = () => {
        tempCtx.drawImage(img, 0, 0);
        const newDataURL = tempCanvas.toDataURL('image/png');
        link.href = newDataURL;
        link.download = 'dibujo_con_fondo_blanco.png';
        link.click();
      };
    }
  }));

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      className="border border-pink-300 bg-white shadow-lg cursor-crosshair rounded-lg w-full h-full"
    />
  );
});

export default CanvasComponent;
