import React, { useState } from 'react'
import { useEffect } from 'react';
import shallow from "zustand/shallow";
import { handleTimeLimitStyle } from '../../store/functions';

import { useQuizGamePlayerStore, useQuizGameTimeStore } from '../../store/store';

export default function QuizQuestion(props) {
    const { currentQuiz, quizOptions, quizId, setQuizId, setStartQuiz, setEndQuiz} = props;
    const { timeLimit, counter, setCounter, decreaseCounter } = useQuizGameTimeStore(store => ({ timeLimit: store.timeLimit, counter: store.counter, setCounter: store.setCounter, decreaseCounter: store.decreaseCounter }),
    shallow);
    const addPlayerScore = useQuizGamePlayerStore(store => store.addPlayerScore);

    const skipOrReset = () => {
      if(quizId === 9){ // finish the quiz game
        setStartQuiz(false);
        setEndQuiz(true)
        setQuizId(0);
      } else { // skip to another quiz question
        setQuizId(prevId => prevId + 1);
        setCounter(timeLimit);
      }
    }

    const verifyOptionSelected = (event, add, remove) => { // event is obtained when the user selects a btn. add and remove are booleans used  when this function is called on the next useEffect bellow
      const allOptionsBtn = document.querySelectorAll(`.quiz-answer`);
      
      if(event){ // if event is true, thus if the btn was clicked,
        const optionBtn = event.target;
        const { innerHTML } = optionBtn;

        if(innerHTML === currentQuiz.correct_answer){ // and if the btn holds the text that evaluates to the right answer, the function should add a certain className to it 
          optionBtn.classList.add("quiz-correct-answer")
  
          if(quizId == 9) {
            setTimeout(() => skipOrReset(), 0); // this should prevent the unexpected app crash if the user click too rapidly on the answers.
          } else {
            setTimeout(() => {
              skipOrReset();
              handleTimeLimitStyle(timeLimit, counter, true); // imported function that handles the style change of the .time-bar element
              addPlayerScore(); // zustand setState. it simply increments the player score once it gets called
            }, 400);
          };
        } else { // if the  btn that received the click event wasn't the correct answer, the function should add some other a className
          optionBtn.classList.add("quiz-incorrect-answer")

          allOptionsBtn.forEach(btn => { // additionally to adding a proper className to the btn that holds the value that evaluates to the right answer
            if(btn.innerHTML === currentQuiz.correct_answer) {
              btn.classList.add("quiz-correct-answer");
            }
          } )

          if(quizId == 9) {
            setTimeout(() => skipOrReset(), 0); // this prevents the unexpected app crash if the user click too rapidly on the answers.
          } else {
            setTimeout(() => {
              skipOrReset();
              handleTimeLimitStyle(timeLimit, counter, true); // imported function that handles the style change of  the .time-bar element
            }, 400);
          }
        } 
      }
      if(add){ // if add is true, the function should add a proper className to the btn that holds the value that evaluates to the right answer
        allOptionsBtn.forEach(btn => {
          if(btn.innerHTML === currentQuiz.correct_answer) btn.classList.add("quiz-correct-answer");
        } )
      }
      if(remove){ // if remove is true, the function should remove all classNames that was previously added.
        allOptionsBtn.forEach(btn => {
          btn.classList.remove("quiz-correct-answer");
          btn.classList.remove("quiz-incorrect-answer");
        })
      }
    }

    useEffect(() => {
      let timing = setInterval(() => decreaseCounter(), 1000); // handles the counter decrease action on each second passed
      return () => clearInterval(timing);
    }, [quizId])

    // timers for the following timeouts
    const timerInterval = parseInt(`${timeLimit}000`);
    const revilerInterval = parseInt(`${timeLimit + 5}000`);

    useEffect(() => {
      let timeToAnswer = setTimeout(() => verifyOptionSelected(null, true, false), timerInterval); // allows the app to show the right answer once the counter hits 0
      let timeToSkip = setTimeout(() => skipOrReset(), revilerInterval); // allows the app to "skip" to the next question or finish the question section.

      return () => {
        verifyOptionSelected(null, false, true); // removing all style classes from the answers btn
        clearTimeout(timeToAnswer);
        clearTimeout(timeToSkip);
      }
    }, [quizId]);

    useEffect(() => {
      handleTimeLimitStyle(timeLimit, counter); // imported function that handles the style change of the .time-bar element
    }, [counter])

    const entityDecode = (input) => { // handling entities decode
      const parser = new DOMParser().parseFromString(input, "text/html");
      return parser.documentElement.textContent;
    }

  return (
    <>
      <h2 className='quiz-question'>{entityDecode(currentQuiz.question)}</h2>
      <div className="quiz-answer-wrapper">
        {
          quizOptions.map((option, id) => (
          <button key={id} className="quiz-answer quiz-main-btn-style" onClick={(e) => verifyOptionSelected(e)}>
            {entityDecode(option)}
          </button> 
          ))
        }
      </div>
      <div className="time-bar-wrapper">
        <div className="time-counter">{counter > 0 ? counter : 5 - (-counter)}</div>
        <div className="time-bar "></div>
      </div>
    </>
  )
}
