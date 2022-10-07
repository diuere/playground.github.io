import React from 'react';

import QuizQuestion from './QuizQuestion';

export default function QuizHandler(props) {
    const { data, isSuccess, isError, quizId, setQuizId, setStartQuiz, setEndQuiz} = props;

    if(isSuccess){
        const currentQuiz = data[quizId]; // return an object similar to this sample: { question: value , correct_answer: value , incorrect_answers: [...values]}
        
        const generateOptions = () => {
            const gatherOptions = [currentQuiz.correct_answer, ...currentQuiz.incorrect_answers]; // gather all the possible options
            const optionsGathered = [];
            let initial = 0;

            while(initial < gatherOptions.length){
                const randomIndex = Math.floor(Math.random() * gatherOptions.length); // generate a random index based on _gatherOptions_ length
                let idUsed = optionsGathered.includes(gatherOptions[randomIndex]); // verify if the _gatheredOption_ already have a value similar to the _gatherOptions[randomIndex]_

                if(!idUsed){ // if the value is totally brand new, it shall be pushed into the _gatheredOptions_ array and will be one step closer to the conclusion
                    optionsGathered.push(gatherOptions[randomIndex]);
                    initial++;
                } else { // else, the loop should continue on trying to accomplish the previous statement, thus _initial_ should remain the same
                    initial = initial;
                }
            }

            return optionsGathered;
        }
        
        const quizOptions = generateOptions();

        return (
            <div className="quiz-wrapper quiz-wrapper-main-style">
                <QuizQuestion currentQuiz={currentQuiz} quizOptions={quizOptions} quizId={quizId} setQuizId={setQuizId} setStartQuiz={setStartQuiz} setEndQuiz={setEndQuiz}/>
            </div>
        )
    }
    
    return (
        <div className="quiz-wrapper">
            { isError ? 
                <div className="quiz-error">Error</div> :
                <div className="quiz-loading"></div>
            }
        </div>
    )
}
