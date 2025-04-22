//
import React from "react";

const HistoryControls = ({ undo, redo, canUndo, canRedo }) => {
  return (
    <div className="mt-4 flex justify-between">
      <button
        onClick={undo}
        className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 disabled:opacity-50"
        disabled={!canUndo}
      >
        Undo
      </button>
      <button
        onClick={redo}
        className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 disabled:opacity-50"
        disabled={!canRedo}
      >
        Redo
      </button>
    </div>
  );
};

export default HistoryControls;
