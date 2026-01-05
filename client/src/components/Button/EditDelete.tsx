"use client";
import { useOptions } from "@/stores/userStore";
import React from "react";
import { useRef } from "react";

const EditDelete = ({setEditHandler, DeleteHandler}: {setEditHandler: any, DeleteHandler: any}) => {
  const toggleFloatBox = useRef<HTMLDivElement>(null);
  // const setEditComment = useOptions((state) => state.setEditComment);
  return (
    <React.Fragment>
      <div
        onMouseEnter={() => toggleFloatBox.current?.classList.toggle("hidden")}
        onMouseLeave={() => toggleFloatBox.current?.classList.add("hidden")}
        className="w-fit"
      >
        •••
        <span ref={toggleFloatBox} className="hidden">
          <button className="text-2xl border px-2" onClick={setEditHandler}>🖋️</button>
          <button className="text-2xl border px-2" onClick={DeleteHandler}>🗑️</button>
        </span>
      </div>
    </React.Fragment>
  );
};

export default EditDelete;
