import React from 'react'
import {exercisesDetail} from "../../data/exercisesDetail"
import "./Exercises.css"
import { useLocation } from 'react-router-dom';
import ExerciseCard from '../ExerciseCard/ExerciseCard';
import Navnode from '../Navnode/Navnode'; 
import useCursor from "../elderly_cursor";
const Exercises= () => {



    // cursor
    const { cursor, changePosition } = useCursor();



    const location = useLocation();
    const exerciseId = location.pathname.split('/exercise').pop(); // Extract the exercise ID from the path
    let num=0;
 
   

    return (
        <div className="ExerciseDirectory" onMouseMove={changePosition}>
                <div className="cursor-style" ref={cursor}></div>
              <Navnode /> 
          <div className="exercise-header">
            <span>Exercises</span>
            <span className="stroke-text">Description</span>
          </div>


          <div className="ExerciseCards">
            {exercisesDetail.map((exercise) => {
              if (exercise.cid == exerciseId) {
                num= num+1;
               
                return (
                    <div className="AnExerciseCard">
                 
                    <ExerciseCard
                        num={exercise.number}
                        exercise={exercise.exersise}
                        category={exercise.category}
                        Instruction={exercise.Instruction}
                        cid={parseInt(exercise.cid)}    
                        fbx={exercise.fbx}
                        image={exercise.image}
                        startIllustration={exercise.startIllustration}
                        middleIllustration={exercise.middleIllustration}
                    /> 
                    </div>
                );
              } else {
                return null; // Render nothing if the condition is not met
              }
            })}

     
          </div>
        </div>
   















      );
    };

export default Exercises
