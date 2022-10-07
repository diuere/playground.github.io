import React from 'react';
import { closeGameInfo } from '../../store/functions';

export default function CloseGameInfo(){
    return (
        <div className="close-icon" onClick={closeGameInfo}>
            <span className="left"></span>
            <span className="right"></span>
        </div>
    )
}