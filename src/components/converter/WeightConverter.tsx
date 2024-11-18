"use client";

import React, { useState } from 'react';

// Define conversion rates relative to grams (g)
const conversionRates = {
  mg: 0.001,     // Milligram
  g: 1,          // Gram
  kg: 1000,      // Kilogram
  t: 1e6,        // Ton (Metric)
  kt: 1e9,       // Kiloton
  gr: 0.0647989, // Grain
  oz: 28.3495,   // Ounce
  lb: 453.592,   // Pound
  don: 3.75,     // Don (Korean traditional weight)
  nyang: 37.5,   // Nyang (Korean traditional weight)
  geun: 600,     // Geun (Korean traditional weight)
  gwan: 3750     // Gwan (Korean traditional weight)
} as const;

// Use keyof to define valid unit types
type Unit = keyof typeof conversionRates;

const WeightConverter: React.FC = () => {
  const [value, setValue] = useState<string>('0');
  const [fromUnit, setFromUnit] = useState<Unit>('mg');
  const [toUnit, setToUnit] = useState<Unit>('g');
  const [result, setResult] = useState<string>('');

  // Convert the value from one unit to another
  const convert = (inputValue: string, from: Unit, to: Unit) => {
    const input = parseFloat(inputValue);
    if (isNaN(input)) {
      setResult("Invalid input");
      return;
    }

    const inputInGrams = input * conversionRates[from];
    const outputValue = inputInGrams / conversionRates[to];
    setResult(`${input} ${getUnitName(from)} = ${outputValue.toFixed(4)} ${getUnitName(to)}`);
  };

  // Handle value input change
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setValue(input);
    convert(input, fromUnit, toUnit);
  };

  // Handle "From" unit selection change
  const handleFromUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const unit = e.target.value as Unit;
    setFromUnit(unit);
    convert(value, unit, toUnit);
  };

  // Handle "To" unit selection change
  const handleToUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const unit = e.target.value as Unit;
    setToUnit(unit);
    convert(value, fromUnit, unit);
  };

  // Helper function to display unit name
  const getUnitName = (unit: Unit) => {
    switch (unit) {
      case 'mg': return '밀리그램 (mg)';
      case 'g': return '그램 (g)';
      case 'kg': return '킬로그램 (kg)';
      case 't': return '톤 (t)';
      case 'kt': return '킬로톤 (kt)';
      case 'gr': return '그레인 (gr)';
      case 'oz': return '온스 (oz)';
      case 'lb': return '파운드 (lb)';
      case 'don': return '돈';
      case 'nyang': return '냥';
      case 'geun': return '근';
      case 'gwan': return '관';
      default: return unit;
    }
  };

  return (
    <div className="w-full space-y-8">
      <div className="p-6 bg-gray-100 rounded-lg shadow-md">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">무게 변환기</h2>
          <p className="text-gray-600 text-sm mt-2">모든 무게 단위를 변환합니다.</p>
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
                {getUnitName(unit as Unit)}
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
                {getUnitName(unit as Unit)}
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

export default WeightConverter;
