import React, { useState, useRef, useEffect } from 'react';
import { FaTerminal } from 'react-icons/fa';
import { levels } from '../../data/questionsData';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { FaHeart } from 'react-icons/fa';
import { FaHeartBroken } from 'react-icons/fa';
import { Modal } from '../ui';

const CodeQuest = () => {
  // useState per salvare la cronologia di Code Quest
  const [history, setHistory] = useState([
    { type: 'system', content: 'Welcome to Code Quest! 🚀' },
    { type: 'info', content: 'Your mission is to find the error and correctly rewrite the following code' },
    { type: 'task', content: levels[0].task }
  ]);

  // useState per salvare l'input di textarea
  const [input, setInput] = useState(levels[0].task);

  // useState per salvare la progressione dei livelli
  const [currentLevel, setCurrentLevel] = useState(0);

  // useState per segnalare che il gioco è finito (ultimo livello)
  const [lastLevel, setLastLevel] = useState(false);

  // usestate per gestire il numero di errori di ogni domanda
  const [errors, setErrors] = useState(0);

  // useState per calcolare i punti totali
  const [score, setScore] = useState(0);

  //useState per aprire il modal che mostra le informazioni sul quiz
  const [quizInfo, setQuizInfo] = useState(false);

  // useState per gestire la scritta alla fine del quiz
  const [text, setText] = useState("");

  // useRef utile per la visualizzazione dell'ultima domanda
  const historyRef = useRef(null);

  // Gestisce l'invio del comando
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const currentCommand = input.trim();
    
    // Aggiunge la risposta alla cronologia
    setHistory(prev => [...prev, { type: 'command', content: currentCommand }]);

    // Verifica se la risposta è corretta o meno e aggiorna la cronologia
    if (currentCommand === levels[currentLevel].command || levels[currentLevel].command.includes(currentCommand)) {
      setHistory(prev => [...prev, { type: 'success', content: levels[currentLevel].success }]);
      
      if (errors === 0) {
        setScore(prev => prev + 1);
      } else if (errors === 1) {
        setScore(prev => prev + 0.75);
      } else if (errors === 2) {
        setScore(prev => prev + 0.5)
      }
      
      if (currentLevel >= levels.length - 1) {
        setLastLevel(true);

        if (score < 18 ) {
          setText("You can do better");
        } else if (score >= 18 && score < 22) {
          setText("Not bad");
        } else if (score >= 22 && score < 26) {
          setText("Nice work");
        } else if (score >= 26 && score < 30) {
          setText("Congratulations");
        } else {
          setText("You're a master");
        }

        return
      } else {
        setHistory(prev => [
          ...prev,
          { type: 'info', content: levels[currentLevel + 1].info },
          { type: 'task', content: levels[currentLevel + 1].task }
        ]);

        setCurrentLevel(prev => {
          const nextLevel = prev + 1;
          setInput(levels[nextLevel].task);
          return nextLevel;
        });
        
        setErrors(0);
      }
    } else {
      setHistory(prev => [
        ...prev,
        { type: 'error', content: 'Wrong answer, try again or type "help" to get a hint.' }
      ]);
      setInput(levels[currentLevel].task);
      setErrors(prev => prev + 1);
    }
  };

  // Auto-scroll alla fine della cronologia
  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-black rounded-lg overflow-hidden shadow-xl">
        {/* Header */}
        <div className="bg-gray-800 px-4 py-2 flex justify-between">
          <div className='flex gap-2'>
            <FaTerminal className="h-6 pt-2 text-gray-300" />
            <h2 className="text-gray-200 text-lg font-lobster select-none">Code Quest</h2>
          </div>
          <QuestionMarkCircleIcon 
            className='w-8 text-white hover:text-gray-400 cursor-pointer'
            onClick={() => setQuizInfo(true)}
          />
        </div>

        {/* Body */}
        <div 
          ref={historyRef}
          className="p-4 h-96 overflow-y-auto font-mono text-sm space-y-2"
        >
          {history.map((entry, index) => (
            entry.type === 'task' ? (
              <pre
                key={index}
                className="text-blue-400 bg-gray-900 rounded p-2 whitespace-pre overflow-x-auto font-mono"
              >
                <code>{entry.content}</code>
              </pre>
            ) : (
              <div 
                key={index}
                className={`select-none whitespace-normal break-words
                ${
                  entry.type === 'error' ? 'text-red-400' :
                  entry.type === 'success' ? 'text-green-400' :
                  entry.type === 'hint' ? 'text-yellow-400' :
                  entry.type === 'command' ? 'text-gray-200' :
                  entry.type === 'info' ? 'text-white text-md' :
                  'text-gray-400 text-lg'
                }`}
              >
                {entry.type === 'command' && levels[currentLevel].multipleChoice === false ? (
                  <pre className='whitespace-pre overflow-x-auto'>
                    <code>{entry.content}</code>
                  </pre>
                ) : (
                  entry.content
                )
                }
              </div>
            )
          ))}
          {/* Help Text */}
          <div className='flex justify-between'>
            <div className="text-gray-400 mt-4 select-none">
              <p>LEVEL {currentLevel + 1}: {levels[currentLevel].difficulty}</p>
              <p className='text-sm'>click "help" for hints</p>
              <p>Current Progress: {currentLevel + 1}/{levels.length}</p>
            </div>
            <button
              type="button"
              disabled={lastLevel}
              className={
                `bg-blue-600 text-white text-sm px-4 py-2 rounded
                ${lastLevel ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700 active:bg-blue-800"}`
              }
              onClick={() => {
                setHistory(prev => [...prev, { type: 'hint', content: levels[currentLevel].hint }]);
              }}
              >
              Help
            </button>
          </div>
          <div className='relative select-none'>
            {lastLevel ? (
              <div className='mt-2 p-1 bg-gray-300 text-black font-bold'>
                <p>THE QUIZ IS FINISCED</p>
                <p>SCORE: {score} / {levels.length}</p>
                <p 
                  className={`
                    absolute top-1/2 left-2/3 font-lobster -translate-y-1/2 text-md md:text-lg
                    ${score < 18 ? "text-red-800" : score < 26 ? "text-yellow-800" : "text-green-800"}
                  `}
                >
                  {text}
                </p>
              </div>
            ) : (
              <p className='text-white'>SCORE: {score}</p>
            )}
          </div>
        </div>
        {/* Input Area */}
        <form onSubmit={handleSubmit}>
          <div className='flex justify-between items-center pe-4'>
            {errors === 0 ? (
              <div className='flex items-center p-2'>
                <FaHeart className='w-8 h-8 px-1 text-red-600' />
                <FaHeart className='w-8 h-8 px-1 text-red-600' />
                <FaHeart className='w-8 h-8 px-1 text-red-600' />
              </div>
            ) : errors === 1 ? (
              <div className='flex items-center p-2'>
                <FaHeart className='w-8 h-8 px-1 text-red-600' />
                <FaHeart className='w-8 h-8 px-1 text-red-600' />
                <FaHeartBroken className='w-8 h-8 px-1 text-red-600' />
              </div>
            ) : errors === 2 ? (
              <div className='flex items-center p-2'>
                <FaHeart className='w-8 h-8 px-1 text-red-600' />
                <FaHeartBroken className='w-8 h-8 px-1 text-red-600' />
                <FaHeartBroken className='w-8 h-8 px-1 text-red-600' />
              </div>
            ) : (
              <div className='flex items-center p-2'>
                <FaHeartBroken className='w-8 h-8 px-1 text-red-600' />
                <FaHeartBroken className='w-8 h-8 px-1 text-red-600' />
                <FaHeartBroken className='w-8 h-8 px-1 text-red-600' />
              </div>
            )}
            {levels[currentLevel].multipleChoice === false && (
              <button
                type="submit"
                disabled={lastLevel}
                className={
                  `bg-blue-600 text-white px-4 py-2 rounded text-sm
                  ${lastLevel ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700 active:bg-blue-800"}`
                }
              >
                Send
              </button>
            )}
          </div>
          {levels[currentLevel].multipleChoice? (
            <div className='grid grid-cols-2 gap-2 p-2 text-black'>
              <button 
                type="submit"
                disabled={lastLevel}
                onClick={() => setInput(levels[currentLevel].a)}
                className={`bg-gray-200 ${lastLevel ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300 active:bg-gray-400"}`}
              >
                {levels[currentLevel].a}
              </button>
              <button 
                type="submit"
                disabled={lastLevel}
                onClick={() => setInput(levels[currentLevel].b)}
                className={`bg-gray-200 ${lastLevel ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300 active:bg-gray-400"}`}
              >
                {levels[currentLevel].b}
              </button>
              <button 
                type="submit"
                disabled={lastLevel}
                onClick={() => setInput(levels[currentLevel].c)}
                className={`bg-gray-200 ${lastLevel ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300 active:bg-gray-400"}`}
              >
                {levels[currentLevel].c}
              </button>
              <button 
                type="submit"
                disabled={lastLevel}
                onClick={() => setInput(levels[currentLevel].d)}
                className={`bg-gray-200 ${lastLevel ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300 active:bg-gray-400"}`}
              >
                {levels[currentLevel].d}
              </button>
            </div>
          ) : (
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="
                w-full h-24 resize-none p-4
                text-gray-200 whitespace-pre overflow-x-auto text-sm font-mono 
                bg-gray-800 focus:outline-none rounded
              "
              placeholder="Rewrite the code correctly..."
              rows={5}
            />
          )}
        </form>
      </div>
      {quizInfo && 
        <Modal 
          isOpen={quizInfo}
          onClose={() => setQuizInfo(false)}
          title="Points assignment"
        >
          <div>
            <h1 className='p-2 text-lg font-bold select-none'>Points awarded for each question:</h1>
            <div>
              <div className='flex items-center justify-center pt-4'>
                <p className='select-none'>0 errors === 1 point === </p>
                <FaHeart className='w-8 h-8 px-1 text-red-600' />
                <FaHeart className='w-8 h-8 px-1 text-red-600' />
                <FaHeart className='w-8 h-8 px-1 text-red-600' />
              </div>
              <div className='flex items-center justify-center pt-2'>
                <p className='select-none'>1 error === 0.75 points === </p>
                <FaHeart className='w-8 h-8 px-1 text-red-600' />
                <FaHeart className='w-8 h-8 px-1 text-red-600' />
                <FaHeartBroken className='w-8 h-8 px-1 text-red-600' />
              </div>
              <div className='flex items-center justify-center pt-2'>
                <p className='select-none'>2 errors === 0.5 points === </p>
                <FaHeart className='w-8 h-8 px-1 text-red-600' />
                <FaHeartBroken className='w-8 h-8 px-1 text-red-600' />
                <FaHeartBroken className='w-8 h-8 px-1 text-red-600' />
              </div>
              <div className='flex items-center justify-center py-2'>
                <p className='select-none'>3 errors or more === 0 points === </p>
                <FaHeartBroken className='w-8 h-8 px-1 text-red-600' />
                <FaHeartBroken className='w-8 h-8 px-1 text-red-600' />
                <FaHeartBroken className='w-8 h-8 px-1 text-red-600' />
              </div>
            </div>
          </div>
        </Modal>
      }
    </div>
  );
};

export default CodeQuest;