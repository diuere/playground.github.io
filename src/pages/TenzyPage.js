import React from 'react';
import Die from '../components/tenzyComponents/Die';
import InfoBtn from '../components/tenzyComponents/InfoBtn';
import Overlay from '../components/tenzyComponents/Overlay';

// zustand
import shallow from 'zustand/shallow';
import { useTenzyStore } from "../store/store";

// generating the elements for the dice state 
function generateNumbers(){
    const newArr = [];
    for(let i = 0; i < 8; i++){
        newArr.push(
            {
                value: Math.floor((Math.random() * 6) + 1),
                isHeld: false,
                id: i
            }
            )    
        }
    return newArr;
}

export default function TenzyPage(){ 
    const [dice, setDice] = React.useState(generateNumbers);
    
    const { roll, setRoll, hold, setHold, setGameTime, setAddFav } = useTenzyStore(state => ( { roll: state.roll, setRoll: state.setRoll, hold: state.hold, setHold: state.setHold, setGameTime: state.setGameTime, setAddFav: state.setAddFav, } )
    , shallow );
    
    let isDone = dice.every(item => item.isHeld);// variable that assists on determining the content of the button

    // re-assigning value to the dice's items after a roll event occurs
    React.useMemo(() => {
        setDice(prevState => prevState.map(item => item.isHeld ? { ...item, value: hold } : { ...item, value: Math.ceil(Math.random() * 6) }))
    }, [roll]);

    // rendering dice's elements
    const diceElem = dice.map(item => <Die key={item.id} id={item.id} classNm={item.classNm} number={item.value} handleClick={selectDie} selected={item.isHeld ? "die-selected" : ""} />);
    
    // this function will be trigged once a die gets clicked
    function selectDie(e, id){
        const { innerHTML } = e.target;

        if(hold.length < 1 || hold === innerHTML){
            setHold(innerHTML)
            setDice(prevState => prevState.map(item => item.id === id ? { value: innerHTML, id: id, isHeld: true} : item));
        }
    }

    // rolling the dice or resetting the dice
    function resetDice(e){
        const {innerHTML} = e.target;
        if(innerHTML === "Reset Game") {
            // reset all main states
            setHold()
            setRoll();
            setGameTime();
            setAddFav(true);
            setDice(generateNumbers);
        } else {
            setRoll(1);
        }
    }
    
    // counting second after the first die gets clicked
    React.useEffect(() => {
        let timing;
        if(hold.length > 0 && isDone === false){
            timing = setInterval(() => setGameTime(1), 1000);
        } 
        return () => clearInterval(timing);
    }, [hold, isDone]);
    
    return (
        <main className="tenzyGame-page page" id="tenzyGamePage">
            <div className="container">
                <div className="tenzy-body">
                    <h1 className="tenzy-title">Tenzy</h1>
                    <p className="tenzy-p">Roll until all the dice are the same. Click each dice to freeze it at its current value between rolls</p>
                    <div className="dice-wrapper">
                        {diceElem}
                    </div>
                    <InfoBtn resetDice={resetDice} isDone={isDone} hold={hold}/>
                    <Overlay />
                </div>
            </div>
        </main>
    )
}
