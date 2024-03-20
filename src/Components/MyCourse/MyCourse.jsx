import React from 'react'
import CourseCard from '../CourseCard/CourseCard'
import Navnode from '../Navnode/Navnode'; 
import "./MyCourse.css"
import useCursor from "../elderly_cursor";
   <Navnode /> 
const MyCourse= () => {
  const { cursor, changePosition } = useCursor();
  return (
    <div className="Course" onMouseMove={changePosition}>
         <div className="cursor-style" ref={cursor} ></div>
        <CourseCard />
        <Navnode /> 
    </div>

  )
}

export default MyCourse
