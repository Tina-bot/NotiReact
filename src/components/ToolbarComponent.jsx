import React from 'react';

const Toolbar = ({ undoLastAction, redoLastAction, downloadPNG, downloadWithWhiteBG, color, setColor, lineWidth, setLineWidth }) => {
  return (
    <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 p-4 bg-pink-200 rounded-lg shadow-lg fixed top-4 left-1/2 transform -translate-x-1/2 z-10">
      <label className="flex items-center space-x-2">
        <span className="font-bold text-sm text-pink-700">🎨 Color</span>
        <input
          className="w-10 h-10 cursor-pointer bg-pink-200"
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </label>

      <label className="flex items-center space-x-2">
        <span className="font-bold text-sm text-pink-700">🖌️ Grosor</span>
        <input
          className="w-32 h-10 cursor-pointer range-slider acent"
          type="range"
          min="1"
          max="50"
          value={lineWidth}
          onChange={(e) => setLineWidth(e.target.value)}
        />
      </label>

      <button
        onClick={undoLastAction}
        className="bg-pink-300 hover:bg-pink-400 text-pink-900 p-2 rounded-lg shadow-md border border-pink-400 text-sm font-bold"
      >
        ↩️ Deshacer
      </button>

      <button
        onClick={redoLastAction}
        className="bg-pink-300 hover:bg-pink-400 text-pink-900 p-2 rounded-lg shadow-md border border-pink-400 text-sm font-bold"
      >
        🔁 Rehacer
      </button>

      <button
        onClick={downloadPNG}
        className="bg-pink-300 hover:bg-pink-400 text-pink-900 p-2 rounded-lg shadow-md border border-pink-400 text-sm font-bold"
      >
        📥 Descargar PNG
      </button>

      <button
        onClick={downloadWithWhiteBG}
        className="bg-pink-300 hover:bg-pink-400 text-pink-900 p-2 rounded-lg shadow-md border border-pink-400 text-sm font-bold"
      >
        📥 Descargar con F. Blanco
      </button>
    </div>
  );
};

export default Toolbar;
