"use client";

import React, { useState } from 'react';

// 원금 두 배 계산기 컴포넌트
const DoubleCapitalCalculator: React.FC = () => {
  const [interestRate, setInterestRate] = useState<string>('0');
  const [result, setResult] = useState<string>(''); // 계산 결과를 저장할 상태

  const calculateDoublingTime = () => {
    const rate = parseFloat(interestRate); // 이 부분을 수정

    if (rate <= 0) {
      setResult('수익률은 0보다 커야 합니다.');
      return;
    }

    // 72 법칙을 이용해 복리로 원금이 두 배가 되는 시간(년)을 계산
    const years = 72 / rate;

    // 소수점 이하 계산을 통해 정확한 년과 월을 구합니다.
    const yearsPart = Math.floor(years);
    const monthsPart = Math.round((years - yearsPart) * 12);

    setResult(
      `원금이 두 배 되는 기간은  ` +
      `<span class="font-bold text-blue-600">${yearsPart}년</span> ` + 
      `<span class="font-bold text-blue-600">${monthsPart}개월</span>`
    );
  };

  const handleInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInterestRate(value);
  };

  const handleInterestRateChangeByAmount = (amount: number) => {
    const newRate = Math.max(0, parseFloat(interestRate) + amount); // 0 미만으로 가지 않게 함
    setInterestRate(newRate.toString());
  };

  return (
    <div className="w-full">
      {/* 수익률 입력 */}
      <div className="mb-4">
        <label className="block text-lg font-semibold text-gray-700 mb-2">연 수익률 (%)</label>
        <div className="flex justify-end">
          <input
            type="text"
            value={interestRate}
            onChange={handleInterestRateChange}
            placeholder="수익률(%)"
            className="w-2/3 p-3 border border-gray-300 rounded-l-md text-center text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="px-2 text-gray-900">%</span>
        </div>
        {/* 간단입력 버튼 */}
        <div className="flex flex-col justify-end mt-2 space-y-2">
          <div className="flex space-x-2 w-full">
            <button onClick={() => handleInterestRateChangeByAmount(5)} className="border border-blue-400 text-blue-400 py-2 px-4 rounded-md flex-grow">+5%</button>
            <button onClick={() => handleInterestRateChangeByAmount(1)} className="border border-blue-400 text-blue-400 py-2 px-4 rounded-md flex-grow">+1%</button>
            <button onClick={() => handleInterestRateChangeByAmount(0.5)} className="border border-blue-400 text-blue-400 py-2 px-4 rounded-md flex-grow">+0.5%</button>
          </div>
          <div className="flex space-x-2 w-full">
            <button onClick={() => handleInterestRateChangeByAmount(-5)} className="border border-red-400 text-red-400 py-2 px-4 rounded-md flex-grow">-5%</button>
            <button onClick={() => handleInterestRateChangeByAmount(-1)} className="border border-red-400 text-red-400 py-2 px-4 rounded-md flex-grow">-1%</button>
            <button onClick={() => handleInterestRateChangeByAmount(-0.5)} className="border border-red-400 text-red-400 py-2 px-4 rounded-md flex-grow">-0.5%</button>
          </div>
        </div>
      </div>

      <button
        onClick={calculateDoublingTime}
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md"
      >
        계산하기
      </button>

      {/* 결과 */}
      {result && (
        <div className="mt-6 text-lg font-semibold text-gray-700">
          <p dangerouslySetInnerHTML={{ __html: result }} />
        </div>
      )}
    </div>
  );
};

export default DoubleCapitalCalculator;
