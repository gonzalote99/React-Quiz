import {useState} from 'react';
import {quiz} from '../data/quiz';
import Score from './Score';
import Choices from './Choices';
import Button from './Button';

const QuizApp = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const {questions} = quiz;


  const {question, choices, correctAnswer} = quiz.questions[activeQuestion];

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);

  function handleNext() {
    if(activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
      setActiveQuestion(0)
    }

    setResult((prev) => 
      selectedAnswer ? {...prev, score: prev.score + 5,
                       correctAnswers: prev.correctAnswers + 1,} : {...prev, wrongAnswers: prev.wrongAnswers + 1}
    );
  setSelectedAnswerIndex(null);

  }

  function handleSelected(choice, index) {
    if(correctAnswer === choice) {
      setSelectedAnswer(true);
    } else {
      setSelectedAnswer(false);
    }
    setSelectedAnswerIndex(index);
  }

  function handlePlayAgain() {
    window.location.reload();
  }


  return(
    <div className='h-auto w-[30rem] bg-white rounded-xl p-5 shadow-xl'>
      {!showResult ? (
      <>
      <Score
           addLeadingZero={addLeadingZero}
        activeQuestion={activeQuestion}
        questions={questions}
        />
        <h2 className='text-xl'>{question}</h2>
        <ul className='flex flex-col gap-3 my-3'>
          {choices.map((choice, index) => {
        return(
          <Choices
            key={index}
            choice={choice}
            index={index}
            handleSelected={handleSelected}
            selectedAnswerIndex={selectedAnswerIndex}
            />
        );
          })}
        </ul>

        <Button
          onClickEvent={handleNext}
          disabled={selectedAnswerIndex === null}
          classes="text-end"
          selectedAnswerIndex={selectedAnswerIndex}
          >{activeQuestion !== questions.length - 1 ? "next" : "finish"}</Button>
      </>
      ) : (
      <>
      <h1 className='text-center text-3xl mb-5'>result</h1>
        <div className='px-10 text-center'>
        <h2 className='text-2xl'>total questions: {question.length}</h2>
          <h2 className='text-2xl text-center'>score{""}
          <p className='text-[6rem] leading-[6rem] -mb-3'>
            {result.score}/
            <span className='text-[3rem]'>{questions.length * 5}</span>
          </p> 

          </h2>

          <div className='flex gap-4 justify-center items-center'>
            <h2 className='text-lg'>
             correct answers: {result.correctAnswers} 
            </h2>
          <h2 className='text-lg'>wrong answers: {result.wrongAnswers}</h2>
          </div>

        </div>
        <Button onClickEvent={handlePlayAgain} classes={'text-center'}>play again</Button>
      </>
      )}

    </div>
  );

};

export default QuizApp;