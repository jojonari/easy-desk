"use client";

import React, { useState } from 'react';

// Define conversion rates relative to square meters (m^2)
const conversionRates = {
  m2: 1,        // Square meter
  a: 100,       // Are (1 a = 100 m^2)
  ha: 10000,    // Hectare (1 ha = 10,000 m^2)
  km2: 1e6,     // Square kilometer (1 km^2 = 1,000,000 m^2)
  ft2: 0.092903, // Square foot (1 ft^2 = 0.092903 m^2)
  yd2: 0.836127, // Square yard (1 yd^2 = 0.836127 m^2)
  ac: 4046.86,  // Acre (1 acre = 4046.86 m^2)
  py: 3.306,    // 평 (평 = 3.306 m^2)
  danbo: 35.58, // 단보 (1 단보 = 35.58 m^2)
  jeongbo: 356, // 정보 (1 정보 = 356 m^2)
};

const AreaConverter: React.FC = () => {
  const [value, setValue] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<string>('m2');
  const [toUnit, setToUnit] = useState<string>('m2');
  const [result, setResult] = useState<string>('');

  // Convert the value from one unit to another
  const convert = (inputValue: string, from: string, to: string) => {
    const input = parseFloat(inputValue);
    if (isNaN(input)) {
      setResult("Invalid input");
      return;
    }
    const re = getUnitName(to);
    const inputInSquareMeters = input * conversionRates[from];
    const outputValue = inputInSquareMeters / conversionRates[to];
    setResult(`${input} ${from} = ${outputValue.toFixed(4)} ${re}`);
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

  // Helper function to display unit name
  const getUnitName = (unit: string) => {
    switch (unit) {
      case 'm2': return '제곱미터 (m²)';
      case 'a': return '아르 (a)';
      case 'ha': return '헥타르 (ha)';
      case 'km2': return '제곱킬로미터 (km²)';
      case 'ft2': return '제곱피트 (ft²)';
      case 'yd2': return '제곱야드 (yd²)';
      case 'ac': return '에이커 (ac)';
      case 'py': return '평';
      case 'danbo': return '단보';
      case 'jeongbo': return '정보';
      default: return unit;
    }
  };

  return (
    <div className="w-full space-y-8">
      <div className="p-6 bg-gray-100 rounded-lg shadow-md">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">넓이 변환기</h2>
          <p className="text-gray-600 text-sm mt-2">모든 넓이 단위를 변환합니다.</p>
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
                {getUnitName(unit)}
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
                {getUnitName(unit)}
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

export default AreaConverter;
