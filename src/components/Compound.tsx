"use client";

import React, { useState } from 'react';

// 숫자에 천 단위 쉼표를 추가하는 함수
const formatNumber = (num: number | string) => {
  if (!num) return '';
  let formatted = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return formatted;
};

// 복리 계산기 컴포넌트
const CompoundInterestCalculator: React.FC = () => {
  const [capital, setCapital] = useState<string>('0');
  const [interestRate, setInterestRate] = useState<string>('0');
  const [compoundingPeriods, setCompoundingPeriods] = useState<string>('0');
  const [compoundResults, setCompoundResults] = useState<Array<{ period: number; amount: string; interest: string; rate: string }>>([]);

  const resetCalculator = () => {
    setCapital('0');
    setInterestRate('0');
    setCompoundingPeriods('0');
    setCompoundResults([]);
  };

  const calculateCompoundInterest = () => {
    const principal = parseFloat(capital.replace(/,/g, ''));
    const rate = parseFloat(interestRate) / 100;
    const periods = parseInt(compoundingPeriods);

    // 복리 계산 결과 배열을 저장할 변수
    const results = [];

    for (let i = 1; i <= periods; i++) {
      const amount = principal * Math.pow(1 + rate, i);
      const interest = amount - principal;
      
      // 원금 대비 수익률 계산
      const rateFormatted = ((interest / principal) * 100).toFixed(2);

      results.push({
        period: i,
        amount: formatNumber(amount.toFixed(0)), // 소수점 제거
        interest: formatNumber(interest.toFixed(0)), // 소수점 제거
        rate: `${rateFormatted}%`, // 원금 대비 수익률
      });
    }

    setCompoundResults(results);
  };

  const handleCapitalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setCapital(formatNumber(value));
  };

  const handleInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInterestRate(value);
  };

  const handleCompoundingPeriodsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCompoundingPeriods(value);
  };

  // 간단입력 버튼 함수
  const handleSimpleInput = (value: string, type: string) => {
    if (type === 'capital') {
      setCapital(value);
    } else if (type === 'interestRate') {
      setInterestRate(value);
    } else if (type === 'compoundingPeriods') {
      setCompoundingPeriods(value);
    }
  };

  // 수익률과 횟수 변경 함수
  const handleInterestRateChangeByAmount = (amount: number) => {
    const newRate = Math.max(0, parseFloat(interestRate) + amount); // 0 미만으로 가지 않게 함
    setInterestRate(newRate.toString());
  };

  const handleCompoundingPeriodsChangeByAmount = (amount: number) => {
    const newPeriods = Math.max(0, parseInt(compoundingPeriods) + amount); // 0 미만으로 가지 않게 함
    setCompoundingPeriods(newPeriods.toString());
  };

  return (
    <div className="w-full">
      {/* 원금 입력 */}
      <div className="mb-4">
        <label className="block text-lg font-semibold text-gray-700 mb-2">원금</label>
        <div className="flex justify-end">
          <input
            type="text"
            value={capital}
            onChange={handleCapitalChange}
            placeholder="원금"
            className="w-2/3 p-3 border border-gray-300 rounded-l-md text-center text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="px-2 text-gray-900">원</span>
        </div>
        {/* 간단입력 버튼 */}
        <div className="flex flex-col justify-end mt-2 space-y-2">
          <div className="flex space-x-2 w-full">
            <button onClick={() => setCapital(prev => (parseInt(prev.replace(/,/g, '')) + 100000000).toLocaleString())} className="border border-blue-400 text-blue-400 py-2 px-4 rounded-md flex-grow">+1억</button>
            <button onClick={() => setCapital(prev => (parseInt(prev.replace(/,/g, '')) + 10000000).toLocaleString())} className="border border-blue-400 text-blue-400 py-2 px-4 rounded-md flex-grow">+1천</button>
            <button onClick={() => setCapital(prev => (parseInt(prev.replace(/,/g, '')) + 1000000).toLocaleString())} className="border border-blue-400 text-blue-400 py-2 px-4 rounded-md flex-grow">+1백</button>
          </div>
          <div className="flex space-x-2 w-full">
            <button onClick={() => setCapital(prev => (parseInt(prev.replace(/,/g, '')) - 100000000).toLocaleString())} className="border border-red-400 text-red-400 py-2 px-4 rounded-md flex-grow">-1억</button>
            <button onClick={() => setCapital(prev => (parseInt(prev.replace(/,/g, '')) - 10000000).toLocaleString())} className="border border-red-400 text-red-400 py-2 px-4 rounded-md flex-grow">-1천</button>
            <button onClick={() => setCapital(prev => (parseInt(prev.replace(/,/g, '')) - 1000000).toLocaleString())} className="border border-red-400 text-red-400 py-2 px-4 rounded-md flex-grow">-1백</button>
          </div>
        </div>
      </div>

      {/* 수익률 입력 */}
      <div className="mb-4">
        <label className="block text-lg font-semibold text-gray-700 mb-2">수익률 (%)</label>
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

      {/* 횟수 입력 */}
      <div className="mb-4">
        <label className="block text-lg font-semibold text-gray-700 mb-2">횟수</label>
        <div className="flex justify-end">
          <input
            type="text"
            value={compoundingPeriods}
            onChange={handleCompoundingPeriodsChange}
            placeholder="횟수"
            className="w-2/3 p-3 border border-gray-300 rounded-l-md text-center text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="px-2 text-gray-900">회</span>
        </div>
        {/* 간단입력 버튼 */}
        <div className="flex flex-col justify-end mt-2 space-y-2">
          <div className="flex space-x-2 w-full">
            <button onClick={() => handleCompoundingPeriodsChangeByAmount(10)} className="border border-blue-400 text-blue-400 py-2 px-4 rounded-md flex-grow">+10회</button>
            <button onClick={() => handleCompoundingPeriodsChangeByAmount(5)} className="border border-blue-400 text-blue-400 py-2 px-4 rounded-md flex-grow">+5회</button>
            <button onClick={() => handleCompoundingPeriodsChangeByAmount(1)} className="border border-blue-400 text-blue-400 py-2 px-4 rounded-md flex-grow">+1회</button>
          </div>
          <div className="flex space-x-2 w-full">
            <button onClick={() => handleCompoundingPeriodsChangeByAmount(-10)} className="border border-red-400 text-red-400 py-2 px-4 rounded-md flex-grow">-10회</button>
            <button onClick={() => handleCompoundingPeriodsChangeByAmount(-5)} className="border border-red-400 text-red-400 py-2 px-4 rounded-md flex-grow">-5회</button>
            <button onClick={() => handleCompoundingPeriodsChangeByAmount(-1)} className="border border-red-400 text-red-400 py-2 px-4 rounded-md flex-grow">-1회</button>
          </div>
        </div>
      </div>

      <button
        onClick={calculateCompoundInterest}
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md"
      >
        계산하기
      </button>

      {/* 결과 테이블 */}
      {compoundResults.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">No.</th>
                <th className="px-4 py-2 text-left">수익 (원)</th>
                <th className="px-4 py-2 text-left">원금+수익 (원)</th>
                <th className="px-4 py-2 text-left">수익률 (%)</th>
              </tr>
            </thead>
            <tbody>
              {compoundResults.map(result => (
                <tr key={result.period}>
                  <td className="px-4 py-2 text-left">{result.period}</td>
                  <td className="px-4 py-2 text-left">{result.interest}</td>
                  <td className="px-4 py-2 text-left">{result.amount}</td>
                  <td className="px-4 py-2 text-left">{result.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CompoundInterestCalculator;
