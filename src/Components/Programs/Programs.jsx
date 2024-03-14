import React from 'react'
import "./Programs.css"
import {programsData} from "../../data/programsData"
import RightArrow from "../../assets/rightArrow.png"
import { Link as Route} from "react-router-dom";

const Programs= (prop) => {
  return (
    <div className="Programs" id="programs">
        <div className="programs-header">
    
            <span>Programs</span>
            <span className='stroke-text'>Description</span>
        </div>
        <div className="programs-categories">
            {programsData.map((program)=>(
            <Route
                to="/exercise"
                style={{textDecoration: 'none'}}
            >
                             
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
                        <span>{prop.details}</span>
                    </div>
                </div>
            </Route>
            ))}
        </div>
    </div>

  )
}

export default Programs
