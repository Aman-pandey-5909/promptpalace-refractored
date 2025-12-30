"use client";
import React from "react";
import { useRef } from "react";

const EditDelete = ({editHandler, deleteHandler}: {editHandler: () => void, deleteHandler: () => void}) => {
  const toggleFloatBox = useRef<HTMLDivElement>(null);
  return (
    <React.Fragment>
      <div
        onMouseEnter={() => toggleFloatBox.current?.classList.toggle("hidden")}
        onMouseLeave={() => toggleFloatBox.current?.classList.add("hidden")}
        className="w-fit"
      >
        •••
        <span
          ref={toggleFloatBox}
          
          className="hidden"
        >
          <button className="text-2xl border px-2" onClick={editHandler}>🖋️</button>
          <button className="text-2xl border px-2" onClick={deleteHandler}>🗑️</button>
        </span>
      </div>
    </React.Fragment>
  );
};

export default EditDelete;
