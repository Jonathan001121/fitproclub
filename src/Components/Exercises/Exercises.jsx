import React from 'react'
import {exercisesDetail} from "../../data/exercisesDetail"
import "./Exercises.css"
import RightArrow from "../../assets/rightArrow.png"
import { motion } from "framer-motion"
const Exercises= (prop) => {
  return (
    <div className="Exercise" >
        <div className="programs-header">
    
            <span>Exercises</span>
            <span className='stroke-text'>Description</span>
        </div>
        <div className="exercise-categories">
            {exercisesDetail.map((exercise)=>(
                <div className="category">
                    {/* {program.image} */}
                    <span>Exercise:{exercise.number}</span>
                    <span>Name: {exercise.exersise}</span>
                    <span>Category: {exercise.category}</span>
                    <span>Target Muscle: {exercise.targetmuscle}</span>
                    <span>Set and Reps: {exercise.setandrep}</span>
                    <span>{exercise.Instruction}</span>
                    <div className="join-now">
                        <span>Start now</span>
                        <motion.img
                    animate={{x:10}}
                    transition={{ ease: "backOut", duration: 1, repeat:Infinity }}
                    
                    src={RightArrow}
                    />
                        
                    
                    </div>
                </div>
            ))}
        </div>
    </div>

  )
}

export default Exercises
