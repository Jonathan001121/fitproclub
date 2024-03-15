import React from 'react'
import {exercisesDetail} from "../../data/exercisesDetail"
import "./Exercises.css"
import { useLocation } from 'react-router-dom';
import ExerciseCard from '../ExerciseCard/ExerciseCard';
const Exercises= () => {

    const location = useLocation();
    const exerciseId = location.pathname.split('/exercise').pop(); // Extract the exercise ID from the path
    let num=0;


    return (
        <div className="ExerciseCard">
          <div className="exercise-header">
            <span>Exercises</span>
            <span className="stroke-text">Description</span>
          </div>
          <div className="Exercise">
            {exercisesDetail.map((exercise) => {
                
              if (exercise.cid == exerciseId) {
                num= num+1;

                return (
                    <div>
                    <ExerciseCard
                        num={num}
                        exercise={exercise.exersise}
                        category={exercise.category}
                        Instruction={exercise.Instruction}
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
