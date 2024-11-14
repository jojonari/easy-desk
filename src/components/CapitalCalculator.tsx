"use client";

import convertToKoreanCurrency from '@/utils/UtilConvertToKoreanCurrency';
import React, { useState, useEffect } from 'react';

// 숫자에 천 단위 쉼표를 추가하는 함수
const formatNumber = (num: number | string) => {
  if (!num) return '';
  let formatted = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // 소수점이 0인 경우 제거
  if (formatted.includes('.')) {
    formatted = formatted.replace(/\.0$/, '');
  }

  return formatted;
};

// 쿠키 설정 함수
const setCookie = (name: string, value: string, days: number) => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
};

// 쿠키에서 값 가져오는 함수
const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return null;
};

// 은퇴자금 계산기 컴포넌트
const CapitalCalculator: React.FC = () => {
  const [rate, setRate] = useState<string>('0');
  const [annualExpense, setAnnualExpense] = useState<string>('0');
  const [result, setResult] = useState<string | null>(null);
  const [isMonthly, setIsMonthly] = useState<boolean>(false);

  useEffect(() => {
    const savedIsMonthly = getCookie('isMonthly') === 'true';
    setIsMonthly(savedIsMonthly);
  }, []);

  useEffect(() => {
    const r = parseFloat(rate.replace(/,/g, '')) / 100;
    let exp = parseFloat(annualExpense.replace(/,/g, ''));

    if (isMonthly) {
      exp *= 12;
    }

    setResult(`
      <div style="text-align: center;">
        결과 : <span class="text-red-500 font-bold">${formatNumber((exp / r).toFixed(0))} 원 ( ${convertToKoreanCurrency((exp / r).toFixed(0))} 원)</span>
      </div>
      ${isMonthly ? "월간" : "연간"} 생활비 ${convertToKoreanCurrency(annualExpense)}원을 사용하기 위해 필요한 은퇴자금은 
      <span class="text-red-500 font-bold">${convertToKoreanCurrency((exp / r).toFixed(0))} </span>원이며, 
      이때 계산된 은퇴자금은 수익률 <span class="font-semibold">${formatNumber(rate)}%</span>를 기준으로 한 수익률에 의한 결과입니다.
    `);
    
  }, [rate, annualExpense, isMonthly]);

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatNumber(e.target.value.replace(/,/g, ''));
    setRate(value);
  };

  const handleExpenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatNumber(e.target.value.replace(/,/g, ''));
    setAnnualExpense(value);
  };

  const handleSwitchChange = () => {
    const newState = !isMonthly;
    setIsMonthly(newState);
    setCookie('isMonthly', newState.toString(), 14);
  };

  return (
    <div className="w-full">

      <div className="mb-4">
        <label className="block text-lg font-semibold text-gray-700 mb-2">수익률(%)</label>
        <div className="flex justify-end">
          <input
            type="text"
            value={rate}
            maxLength={5}
            min={0}
            onChange={handleRateChange}
            placeholder="수익률(%)"
            className="w-2/3 p-3 border border-gray-300 rounded-l-md text-center text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="px-2 text-gray-900">%</span>
        </div>

        <div className="flex flex-col justify-end mt-2 space-y-2">
          <div className="flex space-x-2 w-full">
            <button onClick={() => setRate(prev => (parseFloat(prev) + 1).toFixed(1))} className="border border-blue-400 text-blue-400 py-2 px-4 rounded-md flex-grow">+1%</button>
            <button onClick={() => setRate(prev => (parseFloat(prev) + 0.5).toFixed(1))} className="border border-blue-400 text-blue-400 py-2 px-4 rounded-md flex-grow">+0.5%</button>
          </div>
          <div className="flex space-x-2 w-full">
            <button onClick={() => setRate(prev => (parseFloat(prev) - 1).toFixed(1))} className="border border-red-400 text-red-400 py-2 px-4 rounded-md flex-grow">-1%</button>
            <button onClick={() => setRate(prev => (parseFloat(prev) - 0.5).toFixed(1))} className="border border-red-400 text-red-400 py-2 px-4 rounded-md flex-grow">-0.5%</button>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isMonthly}
            onChange={handleSwitchChange}
            className="sr-only"
          />
          <div className="w-12 h-6 bg-gray-300 rounded-full dark:bg-gray-700 transition-all duration-300"></div>
          <div className={`dot absolute left-0.5 w-5 h-5 bg-white rounded-full transition-all duration-300 ${isMonthly ? 'transform translate-x-6' : ''}`}></div>
          <span className="text-lg font-semibold text-gray-700 mb-2">{isMonthly ? '월간 생활비' : '연간 생활비'}</span>
        </label>
        <div className="flex justify-end">
          <input
            type="text"
            value={annualExpense}
            maxLength={19}
            onChange={handleExpenseChange}
            placeholder={isMonthly ? '월간 생활비' : '연간 생활비'}
            className="w-2/3 p-3 border border-gray-300 rounded-r-md text-center text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="px-2 text-gray-900">원</span>
        </div>
        {/* 한글로 변환된 금액 표시 */}
        <div className="mt-2 text-sm text-gray-700 font-semibold text-right">
          {convertToKoreanCurrency(annualExpense)} 원
        </div>
        <div className="flex flex-col justify-end mt-2 space-y-2">
          <div className="flex space-x-2 w-full">
            <button onClick={() => setAnnualExpense(prev => (parseInt(prev.replace(/,/g, '')) + 100000000).toLocaleString())} className="border border-blue-400 text-red-400 py-2 px-4 rounded-md flex-grow">+1억</button>
            <button onClick={() => setAnnualExpense(prev => (parseInt(prev.replace(/,/g, '')) + 10000000).toLocaleString())} className="border border-blue-400 text-red-400 py-2 px-4 rounded-md flex-grow">+1천</button>
            <button onClick={() => setAnnualExpense(prev => (parseInt(prev.replace(/,/g, '')) + 1000000).toLocaleString())} className="border border-blue-400 text-red-400 py-2 px-4 rounded-md flex-grow">+1백</button>
          </div>
          <div className="flex space-x-2 w-full">
            <button onClick={() => setAnnualExpense(prev => (parseInt(prev.replace(/,/g, '')) - 100000000).toLocaleString())} className="border border-red-400 text-blue-400 py-2 px-4 rounded-md flex-grow">-1억</button>
            <button onClick={() => setAnnualExpense(prev => (parseInt(prev.replace(/,/g, '')) - 10000000).toLocaleString())} className="border border-red-400 text-blue-400 py-2 px-4 rounded-md flex-grow">-1천</button>
            <button onClick={() => setAnnualExpense(prev => (parseInt(prev.replace(/,/g, '')) - 1000000).toLocaleString())} className="border border-red-400 text-blue-400 py-2 px-4 rounded-md flex-grow">-1백</button>
          </div>
        </div>
      </div>

      {result && (
        <div
          className="text-left text-lg font-semibold text-blue-800 mt-4"
          dangerouslySetInnerHTML={{ __html: result }}
        />
      )}
    </div>
  );
};

export default CapitalCalculator;
