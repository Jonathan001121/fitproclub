import React from 'react'

import "./GameDirectory.css"
import { useLocation } from 'react-router-dom';
import GameCard from '../GameCard/GameCard';



// ----------------------------------------
import Navnode from '../Navnode/Navnode'; 
import useCursor from "../elderly_cursor";
const GameDirectory= () => {

    const location = useLocation();
    const { cursor, changePosition } = useCursor();

    return (
   
        <div className="game-directory" onMouseMove={changePosition}>
                    <div className="cursor-style" ref={cursor} ></div>
      <Navnode /> 
          <div className="gamedirectory-header">
            <span>Game </span>
            <span className="stroke-text">Directory</span>
          </div>
        
        <div class="gameCardField">
          <GameCard/> 
        </div>
        </div>
      );
    };

export default GameDirectory
