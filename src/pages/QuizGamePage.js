import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import EndQuiz from '../components/quizGameComponents/EndQuiz';
import QuizHandler from '../components/quizGameComponents/QuizHandler';
import StartQuiz from '../components/quizGameComponents/StartQuiz'
;
import { getQuizQuestions } from '../store/functions';

export default function QuizGamePage() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [endQuiz, setEndQuiz] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const [quizId, setQuizId] = useState(0);
 
  // OPEN TRIVIA DATABASE api call
  const { data, isError, isSuccess, refetch } = useQuery(["quiz-questions"], () => getQuizQuestions(difficulty ? difficulty : "easy"), 
  {
    refetchOnWindowFocus: false,
  });

  return(
    <main className="quizGame-page page" id="quizGamePage">
        <div className="container">
          {!startQuiz && !endQuiz && <StartQuiz difficulty={difficulty} setDifficulty={setDifficulty} setStartQuiz={setStartQuiz} />}
          {startQuiz && <QuizHandler data={data} isError={isError} isSuccess={isSuccess} quizId={quizId} setQuizId={setQuizId} setStartQuiz={setStartQuiz} setEndQuiz={setEndQuiz}/>}
          {endQuiz && <EndQuiz setEndQuiz={setEndQuiz} setQuizId={setQuizId} refetch={refetch}/>}
        </div>
    </main>
  )
}
