import React from 'react';
import { RiCloseLine } from "react-icons/ri";

export default function CloseGameInfo({ closeTenzyGameInfo, toggleAddMeme, toggleQuizOverLay }){
    const handleClick = () => {
        if(closeTenzyGameInfo) closeTenzyGameInfo();
        if(toggleAddMeme) toggleAddMeme();
        if(toggleQuizOverLay) toggleQuizOverLay();
    }

    return (
        <div className="close-icon" onClick={handleClick}>
            <RiCloseLine />
        </div>
    )
}