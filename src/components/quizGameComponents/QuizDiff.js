import React from 'react';
import { handleSpecSelectionStyle } from '../../store/functions';

export default function QuizDiff(props) {
    const { mainClassName, classSelected, setDiffSpec, handleSelection } = props;

    const handleClick = (e, setDiffSpec, handleSelection, value)  => {
      if(setDiffSpec) setDiffSpec(value);
      if(handleSelection) handleSelection(value, false);

      handleSpecSelectionStyle(e); // imported function, handles the switch class action on user click. class applied or removed: .quiz-specification-selected
    }

  return (
    <div className="quiz-difficulty-wrapper">
        <button className={`${mainClassName} quiz-main-btn-style ${classSelected}`} onClick={(e) => handleClick(e, setDiffSpec, handleSelection, "easy")}>Easy</button>
        <button className={`${mainClassName} quiz-main-btn-style`} onClick={(e) => handleClick(e, setDiffSpec, handleSelection, "medium")}>Medium</button>
        <button className={`${mainClassName} quiz-main-btn-style`} onClick={(e) => handleClick(e, setDiffSpec, handleSelection, "hard")}>Hard</button>
    </div>
  )
}
