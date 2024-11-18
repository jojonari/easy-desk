"use client";

import convertToKoreanCurrency from '@/utils/UtilConvertToKoreanCurrency';
import formatNumber from '@/utils/UtilFormatNumber';
import React, { useState, useEffect, useCallback } from 'react';

// 쿠키 설정 함수
const setCookie = (name: string, value: string, days: number) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
};

// 쿠키에서 값 가져오는 함수
const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return null;
};

// 연이율(배당률) 계산기 컴포넌트
const RateCalculator: React.FC = () => {
  const [capital, setCapital] = useState<string>('100000000');
  const [annualExpense, setAnnualExpense] = useState<string>('10000000');
  const [result, setResult] = useState<string | null>('0');
  const [isMonthly, setIsMonthly] = useState<boolean>(false);

  // 쿠키에서 초기 상태 설정
  useEffect(() => {
    const savedIsMonthly = getCookie('isMonthly') === 'true';
    setIsMonthly(savedIsMonthly);
  }, []);

  // 수익률 계산 함수
  const calculateRate = useCallback(() => {
    const cap = parseFloat(capital.replace(/,/g, ''));
    let exp = parseFloat(annualExpense.replace(/,/g, ''));

    if (isMonthly) {
      exp *= 12; // 월간 생활비일 경우 연간으로 변환
    }

    const rate = ((exp / cap) * 100).toFixed(2);
    setResult(`
      <div style="text-align: center;">
        결과 : <span class="text-red-500 font-bold">${formatNumber(rate)}%</span>
      </div>
      은퇴자금 ${convertToKoreanCurrency(cap)}원으로 ${isMonthly ? '월간' : '연간'} 생활비 ${convertToKoreanCurrency(
      annualExpense
    )}원을 사용하기 위해서는 필요 수익률은 <span class="text-red-500 font-bold">${formatNumber(rate)}%</span> 입니다.
    `);
  }, [capital, annualExpense, isMonthly]);

  // 값이 변경될 때마다 자동으로 수익률 계산
  useEffect(() => {
    calculateRate();
  }, [calculateRate]);

  const handleCapitalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatNumber(e.target.value.replace(/,/g, ''));
    setCapital(value);
  };

  const handleExpenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatNumber(e.target.value.replace(/,/g, ''));
    setAnnualExpense(value);
  };

  const handleSwitchChange = () => {
    const newState = !isMonthly;
    setIsMonthly(newState);
    setCookie('isMonthly', newState.toString(), 14); // 쿠키에 저장
  };

  return (
    <div className="w-full space-y-8">
      <div className="p-6 bg-gray-100 rounded-lg shadow-md">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">수익률 계산기</h2>
          <p className="text-gray-600 text-sm mt-2">은퇴자금과 은퇴생활비를 기반으로 수익률을 계산합니다.</p>
          <hr className="my-4" />
        </div>
        <label className="block text-lg font-semibold text-gray-700 mb-2">은퇴자금</label>
        <div className="flex justify-end">
          <input
            type="text"
            value={capital}
            maxLength={19}
            onChange={handleCapitalChange}
            placeholder="은퇴자금"
            className="w-2/3 p-3 border border-gray-300 rounded-l-md text-center text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="px-2 text-gray-900">원</span>
        </div>
        <div className="mt-2 text-sm text-gray-700 font-semibold text-right">
          {convertToKoreanCurrency(capital)} 원
        </div>
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
      <br/>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isMonthly}
            onChange={handleSwitchChange}
            className="sr-only"
          />
          <div className="w-12 h-6 bg-gray-300 rounded-full dark:bg-gray-700 transition-all duration-300"></div>
          <div
            className={`dot absolute left-0.5 w-5 h-5 bg-white rounded-full transition-all duration-300 ${
              isMonthly ? 'transform translate-x-6' : ''
            }`}
          ></div>
          <span className="ml-3 text-lg font-semibold text-gray-700">
            {isMonthly ? '월간 생활비' : '연간 생활비'}
          </span>
        </label>
        <div className="flex justify-end mt-4">
          <input
            type="text"
            value={annualExpense}
            onChange={handleExpenseChange}
            placeholder={isMonthly ? '월간 생활비' : '연간 생활비'}
            className="w-2/3 p-3 border border-gray-300 rounded-r-md text-center text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="px-2 text-gray-900">원</span>
        </div>
        <div className="mt-2 text-sm text-gray-700 font-semibold text-right">
          {convertToKoreanCurrency(annualExpense)} 원
        </div>
        <div className="flex flex-col justify-end mt-2 space-y-2">
          <div className="flex space-x-2 w-full">
            <button onClick={() => setAnnualExpense(prev => (parseInt(prev.replace(/,/g, '')) + 100000000).toLocaleString())} className="border border-blue-400 text-blue-400 py-2 px-4 rounded-md flex-grow">+1억</button>
            <button onClick={() => setAnnualExpense(prev => (parseInt(prev.replace(/,/g, '')) + 10000000).toLocaleString())} className="border border-blue-400 text-blue-400 py-2 px-4 rounded-md flex-grow">+1천</button>
            <button onClick={() => setAnnualExpense(prev => (parseInt(prev.replace(/,/g, '')) + 1000000).toLocaleString())} className="border border-blue-400 text-blue-400 py-2 px-4 rounded-md flex-grow">+1백</button>
          </div>
          <div className="flex space-x-2 w-full">
            <button onClick={() => setAnnualExpense(prev => (parseInt(prev.replace(/,/g, '')) - 100000000).toLocaleString())} className="border border-red-400 text-red-400 py-2 px-4 rounded-md flex-grow">-1억</button>
            <button onClick={() => setAnnualExpense(prev => (parseInt(prev.replace(/,/g, '')) - 10000000).toLocaleString())} className="border border-red-400 text-red-400 py-2 px-4 rounded-md flex-grow">-1천</button>
            <button onClick={() => setAnnualExpense(prev => (parseInt(prev.replace(/,/g, '')) - 1000000).toLocaleString())} className="border border-red-400 text-red-400 py-2 px-4 rounded-md flex-grow">-1백</button>
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

export default RateCalculator;
