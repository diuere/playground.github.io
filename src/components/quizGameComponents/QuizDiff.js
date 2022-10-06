import React from 'react';
import { handleSpecSelectionStyle } from '../../store/functions';

export default function QuizDiff(props) {
    const { mainClassName, classSelected, setState } = props;

    const handleClick = (e, setToState, value)  => {
       setToState(value);

        handleSpecSelectionStyle(e); // imported function, handles the switch class action on user click. class applied or removed: .quiz-specification-selected
    }

  return (
    <div className="quiz-difficulty-wrapper">
        <button className={`${mainClassName} quiz-main-btn-style ${classSelected}`} onClick={(e) => handleClick(e, setState, "easy")}>Easy</button>
        <button className={`${mainClassName} quiz-main-btn-style`} onClick={(e) => handleClick(e, setState, "medium")}>Medium</button>
        <button className={`${mainClassName} quiz-main-btn-style`} onClick={(e) => handleClick(e, setState, "hard")}>Hard</button>
    </div>
  )
}
