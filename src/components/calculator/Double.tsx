"use client";

import React, { useState, useEffect } from 'react';

// 원금 두 배 계산기 컴포넌트
const DoubleCapitalCalculator: React.FC = () => {
  const [interestRate, setInterestRate] = useState<string>('10');
  const [result, setResult] = useState<string>(''); // 수익률로 원금이 두 배가 되는 기간 계산 결과
  const [yearsInput, setYearsInput] = useState<string>('7'); // 기간 - 년
  const [monthsInput, setMonthsInput] = useState<string>('2'); // 기간 - 월
  const [rateResult, setRateResult] = useState<string>(''); // 년/월 입력에 따른 필요한 수익률 계산 결과

  // 수익률에 따른 원금 두 배 기간 계산
  useEffect(() => {
    const calculateDoublingTime = () => {
      const rate = parseFloat(interestRate);

      if (rate <= 0) {
        setResult('수익률은 0보다 커야 합니다.');
        return;
      }

      const years = 72 / rate;

      const yearsPart = Math.floor(years);
      const monthsPart = Math.round((years - yearsPart) * 12);

      setResult(
        `원금이 두 배 되는 기간은 ` +
        `<span class="font-bold text-blue-600">${yearsPart}년</span> ` + 
        `<span class="font-bold text-blue-600">${monthsPart}개월</span>`
      );
    };

    calculateDoublingTime();
  }, [interestRate]);

  // 기간에 따른 필요 수익률 계산
  useEffect(() => {
    const calculateRequiredRate = () => {
      const years = parseInt(yearsInput) || 0;
      const months = parseInt(monthsInput) || 0;

      if (years <= 0 && months <= 0) {
        setRateResult('기간을 입력해주세요.');
        return;
      }

      const totalYears = years + months / 12;
      const requiredRate = 72 / totalYears;

      setRateResult(
        `원금이 두 배가 되기 위한 수익률은 ` +
        `<span class="font-bold text-green-600">${requiredRate.toFixed(2)}%</span> 입니다.`
      );
    };

    calculateRequiredRate();
  }, [yearsInput, monthsInput]);

  const handleInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInterestRate(e.target.value);
  };

  const handleInterestRateChangeByAmount = (amount: number) => {
    const newRate = Math.max(0, parseFloat(interestRate) + amount);
    setInterestRate(newRate.toString());
  };

  const handleYearsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYearsInput(e.target.value);
  };

  const handleMonthsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMonthsInput(e.target.value);
  };

  const handleYearsChangeByAmount = (amount: number) => {
    const newYears = Math.max(0, parseInt(yearsInput || '0') + amount);
    setYearsInput(newYears.toString());
  };

  const handleMonthsChangeByAmount = (amount: number) => {
    const newMonths = Math.max(0, parseInt(monthsInput || '0') + amount);
    setMonthsInput(newMonths.toString());
  };

  return (
    <div className="w-full space-y-8">
      {/* 원금 두 배 기간 계산 영역 */}
      <div className="p-6 bg-gray-100 rounded-lg shadow-md">

      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800">기간/수익률 계산기</h2>
        <p className="text-gray-600 text-sm mt-2">투자 기간과 수익률을 계산합니다.</p>
        <hr/>
      </div>

        <h2 className="text-xl font-bold text-gray-700 mb-4">1. 원금 두 배 기간 계산</h2>
        <label className="block text-lg font-semibold text-gray-700 mb-2">연 수익률 (%)</label>
        <div className="flex justify-end mb-4">
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

        {/* 결과 */}
        {result && (
          <div className="mt-6 text-lg font-semibold text-gray-700">
            <p dangerouslySetInnerHTML={{ __html: result }} />
          </div>
        )}
      </div>

      {/* 기간에 따른 필요 수익률 계산 영역 */}
      <div className="p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-700 mb-4">2. 기간에 따른 필요 수익률 계산</h2>
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            value={yearsInput}
            onChange={handleYearsChange}
            placeholder="년"
            className="w-1/3 p-3 border border-gray-300 rounded-md text-center text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <span className="px-2">년</span>
          <input
            type="text"
            value={monthsInput}
            onChange={handleMonthsChange}
            placeholder="개월"
            className="w-1/3 p-3 border border-gray-300 rounded-md text-center text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <span className="px-2">개월</span>
        </div>
        {/* 간단입력 버튼 */}
        <div className="flex flex-col justify-end mt-2 space-y-2">
          <div className="flex space-x-2 w-full">
            <button onClick={() => handleYearsChangeByAmount(1)} className="border border-blue-400 text-blue-400 py-2 px-4 rounded-md flex-grow">+1년</button>
            <button onClick={() => handleMonthsChangeByAmount(1)} className="border border-blue-400 text-blue-400 py-2 px-4 rounded-md flex-grow">+1달</button>
          </div>
          <div className="flex space-x-2 w-full mt-2">
            <button onClick={() => handleYearsChangeByAmount(-1)} className="border border-red-400 text-red-400 py-2 px-4 rounded-md flex-grow">-1년</button>
            <button onClick={() => handleMonthsChangeByAmount(-1)} className="border border-red-400 text-red-400 py-2 px-4 rounded-md flex-grow">-1달</button>
          </div>
        </div>

        {/* 결과 */}
        {rateResult && (
          <div className="mt-4 text-lg font-semibold text-gray-700">
            <p dangerouslySetInnerHTML={{ __html: rateResult }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DoubleCapitalCalculator;
