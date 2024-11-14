"use client";

import convertToKoreanCurrency from '@/utils/UtilConvertToKoreanCurrency';
import React, { useState, useEffect } from 'react';

const Calculator: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<number | string>(0);
  const [history, setHistory] = useState<{ expression: string, result: number | string }[]>([]);

  const handleClick = (value: string) => {
    const operators = ['+', '-', '*', '/'];
    if (operators.includes(value)) {
      if (operators.includes(input.slice(-1))) {
        setInput((prevInput) => prevInput.slice(0, -1) + value);
        return;
      }
    }
    if (value === '.') {
      const lastSegment = input.split(/[\+\-\*\/]/).pop() || '';
      if (lastSegment.includes('.')) return;
    }
    setInput((prevInput) => prevInput + value);
  };

  const calculateResult = () => {
    try {
      const calculated = eval(input);
      setResult(calculated.toLocaleString());
      const newEntry = { expression: input, result: calculated.toLocaleString() };
      const newHistory = history.filter((entry) => entry.expression !== input);
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
    if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '.', 'Enter', 'Backspace', 'Escape'].includes(key)) {
      if (key === 'Enter') calculateResult();
      else if (key === 'Backspace') deleteLast();
      else if (key === 'Escape') clearInput();
      else handleClick(key);
    }
  };

  useEffect(() => {
    const savedHistory = localStorage.getItem('calcHistory');
    if (savedHistory) setHistory(JSON.parse(savedHistory));
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const formattedInput = input ? input.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0';

  return (
    <div className="flex justify-center w-full bg-gray-200 p-2">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        
        {/* Input Field */}
        <div className="text-right text-3xl sm:text-4xl font-mono text-gray-800 mb-2 p-4 bg-gray-100 rounded-md shadow-inner overflow-x-auto">
          {formattedInput}
        </div>

        {/* Result Field */}
        <div className="text-right text-4xl sm:text-5xl font-semibold text-blue-800 mb-4 p-4 bg-gray-200 rounded-md shadow-inner overflow-x-auto">
          {result}
        {/* 한글로 변환된 금액 표시 */}
        <div className="mt-2 text-sm text-gray-700 font-semibold text-right items-center justify-items-center">
          {convertToKoreanCurrency(result)}
        </div>
        </div>
        

        {/* Calculator Buttons */}
        <div className="grid grid-cols-4 gap-2">
          <button className="btn bg-gray-300 py-3 text-black rounded-md text-xl font-semibold hover:bg-gray-400" onClick={clearInput}>C</button>
          <button className="btn bg-gray-300 py-3 text-black rounded-md text-xl font-semibold hover:bg-gray-400" onClick={deleteLast}>⌫</button>
          <button className="btn bg-blue-500 py-3 text-white rounded-md text-xl font-semibold hover:bg-blue-600" onClick={() => handleClick('/')}>÷</button>
          <button className="btn bg-blue-500 py-3 text-white rounded-md text-xl font-semibold hover:bg-blue-600" onClick={() => handleClick('*')}>×</button>

          {/* Number Buttons */}
          <button className="btn bg-gray-100 py-3 text-black rounded-md text-xl font-semibold hover:bg-gray-200" onClick={() => handleClick('7')}>7</button>
          <button className="btn bg-gray-100 py-3 text-black rounded-md text-xl font-semibold hover:bg-gray-200" onClick={() => handleClick('8')}>8</button>
          <button className="btn bg-gray-100 py-3 text-black rounded-md text-xl font-semibold hover:bg-gray-200" onClick={() => handleClick('9')}>9</button>
          <button className="btn bg-blue-500 py-3 text-white rounded-md text-xl font-semibold hover:bg-blue-600" onClick={() => handleClick('-')}>−</button>
          <button className="btn bg-gray-100 py-3 text-black rounded-md text-xl font-semibold hover:bg-gray-200" onClick={() => handleClick('4')}>4</button>
          <button className="btn bg-gray-100 py-3 text-black rounded-md text-xl font-semibold hover:bg-gray-200" onClick={() => handleClick('5')}>5</button>
          <button className="btn bg-gray-100 py-3 text-black rounded-md text-xl font-semibold hover:bg-gray-200" onClick={() => handleClick('6')}>6</button>
          <button className="btn bg-blue-500 py-3 text-white rounded-md text-xl font-semibold hover:bg-blue-600" onClick={() => handleClick('+')}>+</button>
          <button className="btn bg-gray-100 py-3 text-black rounded-md text-xl font-semibold hover:bg-gray-200" onClick={() => handleClick('1')}>1</button>
          <button className="btn bg-gray-100 py-3 text-black rounded-md text-xl font-semibold hover:bg-gray-200" onClick={() => handleClick('2')}>2</button>
          <button className="btn bg-gray-100 py-3 text-black rounded-md text-xl font-semibold hover:bg-gray-200" onClick={() => handleClick('3')}>3</button>
          <button className="btn bg-green-500 py-3 text-white rounded-md text-xl font-semibold row-span-2 hover:bg-green-600" onClick={calculateResult}>=</button>
          <button className="btn bg-gray-100 py-3 text-black rounded-md text-xl font-semibold col-span-2 hover:bg-gray-200" onClick={() => handleClick('0')}>0</button>
          <button className="btn bg-gray-100 py-3 text-black rounded-md text-xl font-semibold hover:bg-gray-200" onClick={() => handleClick('.')}>.</button>
        </div>

        {/* History Section */}
        <div className="mt-6 bg-gray-100 rounded-md shadow-inner p-4">
          <div className="h-40 overflow-y-auto">
            {history.length === 0 ? (
              <p className="text-gray-500">No history</p>
            ) : (
              history.map((entry, index) => (
                <div key={index} className="text-gray-600 mb-1">
                  <p><span className="font-mono">{entry.expression}</span> = <span className="font-semibold">{entry.result}</span></p>
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
