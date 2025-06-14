import React, { useState, useRef, useEffect } from 'react';
import { FaTerminal } from 'react-icons/fa';
import { levels } from '../../data/questionsData';

const TerminalQuest = () => {
  const [history, setHistory] = useState([
    { type: 'system', content: 'Welcome to Terminal Quest! 🚀' },
    { type: 'system', content: 'Your mission is to help deploy the latest version of our app.' },
    { type: 'task', content: 'First, initialize a new git repository.' }
  ]);
  const [input, setInput] = useState('');
  const [currentLevel, setCurrentLevel] = useState(0);
  const historyRef = useRef(null);

  // Gestisce l'invio del comando
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const currentCommand = input.trim();
    const level = levels[currentLevel];
    
    // Aggiunge il comando alla cronologia
    setHistory(prev => [...prev, { type: 'command', content: `$ ${input}` }]);

    // Verifica il comando
    if (currentCommand === level.command) {
      setHistory(prev => [
        ...prev,
        { type: 'success', content: level.success }
      ]);

      if (currentLevel < levels.length - 1) {
        setHistory(prev => [
          ...prev,
          { type: 'task', content: levels[currentLevel + 1].task }
        ]);
        setCurrentLevel(prev => prev + 1);
      }
    } else if (currentCommand === 'help') {
      setHistory(prev => [...prev, { type: 'hint', content: level.hint }]);
    } else {
      setHistory(prev => [
        ...prev,
        { type: 'error', content: 'Command not recognized. Type "help" for a hint.' }
      ]);
    }

    setInput('');
  };

  // Auto-scroll alla fine della cronologia
  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-black rounded-lg overflow-hidden shadow-xl">
        {/* Terminal Header */}
        <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
          <FaTerminal className="w-4 h-4 text-gray-300" />
          <h2 className="text-gray-200 text-sm font-mono">Terminal Quest</h2>
        </div>

        {/* Terminal Body */}
        <div 
          ref={historyRef}
          className="p-4 h-96 overflow-y-auto font-mono text-sm space-y-2"
        >
          {history.map((entry, index) => (
            <div 
            key={index}
            className={`${
                entry.type === 'error' ? 'text-red-400' :
                entry.type === 'success' ? 'text-green-400' :
                entry.type === 'hint' ? 'text-yellow-400' :
                entry.type === 'task' ? 'text-blue-400' :
                entry.type === 'command' ? 'text-gray-300' :
                'text-gray-400'
              }`}
              >
              {entry.content}
            </div>
          ))}
          {/* Help Text */}
          <div className="text-gray-400 mt-4">
            <p className='text-sm'>type "help" for hints</p>
            <p>Current Progress: {currentLevel + 1}/{levels.length}</p>
          </div>
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit}>
          <div className="bg-gray-800 p-4 flex items-center gap-2">
            <span className="text-green-400 font-mono">$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent text-gray-200 font-mono focus:outline-none"
              placeholder="Type your command..."
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TerminalQuest;