import React from 'react';

export default function Score(props){
    return (
        <div className="best-score-content-wrapper">
            <div className="best-score"><span>Nº rolls:</span> {props.rolls} <span>-</span> <span>Time:</span> {props.time}</div>
            <button className="delete-fav-score" onClick={props.handleClick}>-</button>
        </div>
    )
}