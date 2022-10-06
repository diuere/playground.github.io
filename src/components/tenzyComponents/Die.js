import React from 'react';

export default function Die(props){
    return (
        <div className="die" onClick={(e) => props.handleClick(e, props.id)} style={props.style}>{props.number}</div>
    )
}