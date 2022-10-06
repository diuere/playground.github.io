import React from "react";
import Score from "./Score";
import CloseGameInfo from "./CloseGameInfo";
import RoundInfo from "./RoundInfo";

export default function Overlay(){
    const [bestScore, setBestScore] = React.useState(
        () => JSON.parse(localStorage.getItem("bestScore")) || []
    );

    // saving to local storage
    React.useEffect(() => {
        localStorage.setItem("bestScore", JSON.stringify(bestScore))
    }, [bestScore]);
    
    // const that will be used to render the favorite score
    const best = bestScore.map(item => <Score key={item.id} rolls={item.rolls} time={item.time} handleClick={() => removeFavScore(item.id)}/>);

    // removing the favorite score
    function removeFavScore(id){
        setBestScore(prevScore => prevScore.filter(item => item.id !== id));
    }
    
    return (
        <div className="tenzy-overlay main-overlay-style">
            <div className="info-wrapper" id="gameInfoWrapper">
                <CloseGameInfo />
                <RoundInfo score={{bestScore, setBestScore}} />
                <div className="best-score-wrapper">
                    {best}
                </div>
            </div>
        </div>
    )
}