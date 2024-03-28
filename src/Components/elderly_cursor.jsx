import React, { useRef } from 'react';

const useCursor = () => {
  const cursor = useRef(null);

  const changePosition = (e) => {
    cursor.current.style.top = `${e.clientY}px`;
    cursor.current.style.left = `${e.clientX}px`;
    cursor.current.style.zIndex = '9999'
  };

  return { cursor, changePosition };
};

export default useCursor;



//Add below four things into destinated. html
// 1) import useCursor from "../elderly_cursor";
// 2)  const { cursor, changePosition } = useCursor();
// 3)    <div className="Course" onMouseMove={changePosition}>
// 4)   <div className="cursor-style" ref={cursor} ></div>