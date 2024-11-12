"use client";

import React, { useState, useEffect } from 'react';

const Calculator: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<number | string>(0);
  const [history, setHistory] = useState<{ expression: string, result: number | string }[]>([]);

  const handleClick = (value: string) => {
    const operators = ['+', '-', '*', '/'];

    // Prevent consecutive operators by replacing the last character if it's an operator
    if (operators.includes(value)) {
      if (operators.includes(input.slice(-1))) {
        setInput((prevInput) => prevInput.slice(0, -1) + value);
        return;
      }
    }

    // Handle decimal point to prevent multiple decimals in one number
    if (value === '.') {
      // Find the last number after the most recent operator
      const lastSegment = input.split(/[\+\-\*\/]/).pop() || '';
      if (lastSegment.includes('.')) {
        return;
      }
    }

    setInput((prevInput) => prevInput + value);
  };

  const calculateResult = () => {
    try {
      // eslint-disable-next-line no-eval
      const calculated = eval(input);
      setResult(calculated.toLocaleString());

      // Prepare the new entry
      const newEntry = { expression: input, result: calculated.toLocaleString() };

      // Check for duplicates and remove the previous entry if exists
      const newHistory = history.filter((entry) => entry.expression !== input);

      // Add the new entry to the history, ensuring the history does not exceed 10 items
      const updatedHistory = [newEntry, ...newHistory].slice(0, 10);

      setHistory(updatedHistory);
      localStorage.setItem('calcHistory', JSON.stringify(updatedHistory));
    } catch {
      setResult('Error');
    }
  };

  const clearInput = () => {
    setInput('');
    setResult(0);
  };

  const deleteLast = () => {
    setInput((prevInput) => prevInput.slice(0, -1));
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    const key = e.key;

    // Handle number and operator keys
    if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '.', 'Enter', 'Backspace', 'Escape'].includes(key)) {
      if (key === 'Enter') {
        calculateResult();
      } else if (key === 'Backspace') {
        deleteLast();
      } else if (key === 'Escape') {
        clearInput();
      } else {
        handleClick(key);
      }
    }
  };

  useEffect(() => {
    // Load history from localStorage on component mount
    const savedHistory = localStorage.getItem('calcHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }

    // Add event listener for keydown
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Format the input value with a thousand separator
  const formattedInput = input ? input.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0';

  return (
    <div className="flex justify-center w-screen bg-gray-100 py-2">
      <div className="w-full p-6 bg-gradient-to-br from-blue-300 to-purple-400 rounded-2xl shadow-lg">
        
        {/* Input Field with thousand separator */}
        <div className="text-right text-5xl sm:text-6xl font-mono text-gray-700 mb-2 p-3 bg-white rounded shadow-inner overflow-hidden whitespace-nowrap overflow-x-auto">
          {formattedInput}
        </div>
        
        {/* Result Field */}
        <div className="text-right text-6xl sm:text-7xl font-semibold text-gray-800 mb-4 p-3 bg-white rounded shadow-inner overflow-hidden whitespace-nowrap overflow-x-auto">
          {result}
        </div>
        
        {/* Calculator Buttons */}
        <div className="grid grid-cols-4 gap-4">
          <button className="btn bg-red-500 py-6 text-white font-semibold rounded text-2xl" onClick={clearInput}>C</button>
          <button className="btn bg-yellow-500 py-6 text-white font-semibold rounded text-2xl" onClick={deleteLast}>⌫</button>
          <button className="btn bg-blue-500 py-6 text-white font-semibold rounded text-2xl" onClick={() => handleClick('/')}>÷</button>
          <button className="btn bg-blue-500 py-6 text-white font-semibold rounded text-2xl" onClick={() => handleClick('*')}>×</button>

          {/* Number and Decimal Buttons */}
          <button className="btn bg-gray-300 py-6 text-black font-bold rounded text-2xl" onClick={() => handleClick('7')}>7</button>
          <button className="btn bg-gray-300 py-6 text-black font-bold rounded text-2xl" onClick={() => handleClick('8')}>8</button>
          <button className="btn bg-gray-300 py-6 text-black font-bold rounded text-2xl" onClick={() => handleClick('9')}>9</button>
          <button className="btn bg-blue-500 py-6 text-white font-semibold rounded text-2xl" onClick={() => handleClick('-')}>−</button>
          <button className="btn bg-gray-300 py-6 text-black font-bold rounded text-2xl" onClick={() => handleClick('4')}>4</button>
          <button className="btn bg-gray-300 py-6 text-black font-bold rounded text-2xl" onClick={() => handleClick('5')}>5</button>
          <button className="btn bg-gray-300 py-6 text-black font-bold rounded text-2xl" onClick={() => handleClick('6')}>6</button>
          <button className="btn bg-blue-500 py-6 text-white font-semibold rounded text-2xl" onClick={() => handleClick('+')}>+</button>
          <button className="btn bg-gray-300 py-6 text-black font-bold rounded text-2xl" onClick={() => handleClick('1')}>1</button>
          <button className="btn bg-gray-300 py-6 text-black font-bold rounded text-2xl" onClick={() => handleClick('2')}>2</button>
          <button className="btn bg-gray-300 py-6 text-black font-bold rounded text-2xl" onClick={() => handleClick('3')}>3</button>
          <button className="btn bg-green-500 py-6 text-white font-semibold rounded text-2xl row-span-2" onClick={calculateResult}>=</button>
          <button className="btn bg-gray-300 py-6 text-black font-bold rounded text-2xl col-span-2" onClick={() => handleClick('0')}>0</button>
          <button className="btn bg-gray-300 py-6 text-black font-bold rounded text-2xl" onClick={() => handleClick('.')}>.</button>
        </div>

        {/* History Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">계산 이력</h2>
          <div className="h-40 overflow-y-auto bg-white rounded-lg shadow-inner p-4">
            {history.length === 0 ? (
              <p className="text-gray-500">No history</p>
            ) : (
              history.map((entry, index) => (
                <div key={index} className="mb-2">
                  <p className="text-gray-700">
                    <span className="font-mono">{entry.expression}</span> = <span className="font-semibold">{entry.result}</span>
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
