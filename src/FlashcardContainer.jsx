import React, { useState } from 'react';
import Flashcard from './Flashcard';
import { flashcards } from './data';
import "./FlashcardContainer.css"

function FlashcardContainer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userGuess, setUserGuess] = useState('');   // New state
  const [isCorrect, setIsCorrect] = useState(null); // New state

  const toggleShowAnswer = () => {
    setShowAnswer(prevShowAnswer => !prevShowAnswer);
  };

  const handleSubmitGuess = () => {
    setShowAnswer(true);
    if (userGuess.toLowerCase() === flashcards[currentIndex].answer.toLowerCase()) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const handleNextCard = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % flashcards.length);
    setShowAnswer(false);
    setIsCorrect(null);
    setUserGuess('');
  };

  const handlePreviousCard = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + flashcards.length) % flashcards.length);
    setShowAnswer(false);
    setIsCorrect(null);
    setUserGuess('');
  };

  return (
    <div className="flashcard-container">
      <Flashcard 
        card={flashcards[currentIndex]} 
        showAnswer={showAnswer} 
      />
      {!showAnswer && (
        <div className="input-container">
          <input 
            value={userGuess} 
            onChange={e => setUserGuess(e.target.value)} 
            placeholder="Enter your guess" 
          />
          <button className="submit-button" onClick={handleSubmitGuess}>Submit</button>
        </div>
      )}
      {isCorrect !== null && (isCorrect ? <p>Correct!</p> : <p>Wrong, try again.</p>)}
      <div className="buttons-container">
        <button onClick={handlePreviousCard}><strong>Back</strong></button>
        <button onClick={handleNextCard}><strong>Next</strong></button>
      </div>
    </div>
  );
}

export default FlashcardContainer;
