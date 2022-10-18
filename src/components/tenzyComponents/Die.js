import React from 'react';

export default function Die({ selected, handleClick, id, number }){
    return (
        <div className={`die ${selected}`} onClick={(e) => handleClick(e, id)}>{number}</div>
    )
}