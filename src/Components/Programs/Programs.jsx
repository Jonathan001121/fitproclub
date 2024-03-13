import React from 'react'
import "./Programs.css"
import {programsData} from "../../data/programsData"
import RightArrow from "../../assets/rightArrow.png"

const Programs= () => {
  return (
    <div className="Programs" id="programs">
        <div className="programs-header">
    
            <span>Programs</span>
            <span className='stroke-text'>Description</span>
        </div>
        <div className="programs-categories">
            {programsData.map((program)=>(
                <div className="category">
                    {program.image}
                    <span>{program.heading}</span>
                    <span>{program.details}</span>
                    <ul>
                {program.exersise.map((exercise, index) => (
                <li key={index}>{exercise}</li>
                ))}
                </ul>
                    <div className="join-now">
                        <span>Join Now</span>
                    </div>
                </div>
            ))}
        </div>
    </div>

  )
}

export default Programs
