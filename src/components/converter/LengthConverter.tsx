"use client";

import React, { useState } from 'react';

// Define conversion factors relative to meters
const conversionRates = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
  in: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
  mile: 1609.34,
  '자': 0.303,  // Assuming '尺' is some traditional Chinese measurement
  '간': 1.818,  // Assuming '間' is some traditional Korean measurement
  '정': 3.96,   // Assuming '町' is a traditional Japanese unit
  '리': 500,    // Assuming '里' is a traditional Chinese unit
  '해리': 1852  // Nautical mile
};

const LengthConverter: React.FC = () => {
  const [value, setValue] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<string>('cm');
  const [toUnit, setToUnit] = useState<string>('m');
  const [result, setResult] = useState<string>('');

  // Convert the value from one unit to another
  const convert = (inputValue: string, from: string, to: string) => {
    const input = parseFloat(inputValue);
    if (isNaN(input)) {
      setResult("Invalid input");
      return;
    }
    
    const inputInMeters = input * conversionRates[from];
    const outputValue = inputInMeters / conversionRates[to];
    setResult(`${input} ${from} = ${outputValue.toFixed(4)} ${to}`);
  };

  // Handle value input change
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setValue(input);
    convert(input, fromUnit, toUnit);
  };

  // Handle "From" unit selection change
  const handleFromUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const unit = e.target.value;
    setFromUnit(unit);
    convert(value, unit, toUnit);
  };

  // Handle "To" unit selection change
  const handleToUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const unit = e.target.value;
    setToUnit(unit);
    convert(value, fromUnit, unit);
  };

  return (
    <div className="w-full space-y-8">
      <div className="p-6 bg-gray-100 rounded-lg shadow-md">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">길이 변환기</h2>
          <p className="text-gray-600 text-sm mt-2">모든 길이 단위를 변환합니다.</p>
          <hr className="my-4" />
        </div>

        {/* 입력 값 */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">값 입력</label>
          <input
            type="text"
            value={value}
            onChange={handleValueChange}
            placeholder="값을 입력하세요"
            className="w-full p-3 border border-gray-300 rounded-md text-center text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* From Unit Selection */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">변환할 단위 선택</label>
          <select
            value={fromUnit}
            onChange={handleFromUnitChange}
            className="w-full p-3 border border-gray-300 rounded-md text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Object.keys(conversionRates).map((unit) => (
              <option key={unit} value={unit}>
                {unit} ({unit === '海里' ? 'nautical mile' : unit})
              </option>
            ))}
          </select>
        </div>

        {/* To Unit Selection */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">변환될 단위 선택</label>
          <select
            value={toUnit}
            onChange={handleToUnitChange}
            className="w-full p-3 border border-gray-300 rounded-md text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Object.keys(conversionRates).map((unit) => (
              <option key={unit} value={unit}>
                {unit} ({unit === '海里' ? 'nautical mile' : unit})
              </option>
            ))}
          </select>
        </div>

        {/* 결과 표시 */}
        <div className="mt-4">
          {result && (
            <div className="text-center text-lg font-semibold text-blue-800">
              <p>{result}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LengthConverter;
