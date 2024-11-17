"use client";

import convertToKoreanCurrency from '@/utils/UtilConvertToKoreanCurrency';
import formatNumber from '@/utils/UtilFormatNumber';
import React, { useState, useEffect } from 'react';

// 생활비 계산기 컴포넌트
const ExpenseCalculator: React.FC = () => {
  const [capital, setCapital] = useState<string>('10000000');
  const [rate, setRate] = useState<string>('3.5');
  const [result, setResult] = useState<string | null>(null);


  // 연이율 및 생활비 계산 로직을 useEffect에서 관리하여 실시간 업데이트
  useEffect(() => {
    const cap = parseFloat(capital.replace(/,/g, ''));
    const r = parseFloat(rate.replace(/,/g, '')) / 100;

    setResult(`
      <div style="text-align: center;">
        결과(연) : <span class="text-red-500 font-bold">${formatNumber((cap * r).toFixed(0))} 원 ( ${convertToKoreanCurrency((cap * r).toFixed(0))} 원)</span><br>
        결과(월) : <span class="text-red-500 font-bold">${formatNumber((cap * r / 12).toFixed(0))} 원 ( ${convertToKoreanCurrency((cap * r / 12).toFixed(0))} 원)</span>
      </div>
      은퇴자금 ${convertToKoreanCurrency(cap)}원으로 연 ${rate}%의 수익률을 기대할 때,
       <span class="text-red-500 font-bold">연 생활비 ${convertToKoreanCurrency((cap * r).toFixed(0))}원
      (월 생활비 ${convertToKoreanCurrency((cap * r / 12).toFixed(0))}원)</span>을 사용할 수 있습니다.
    `);
  }, [capital, rate]);

  const handleCapitalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatNumber(e.target.value.replace(/,/g, ''));
    setCapital(value);
  };

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatNumber(e.target.value.replace(/,/g, ''));
    setRate(value);
  };

  return (
    <div className="w-full space-y-8">
        <div className="p-6 bg-gray-100 rounded-lg shadow-md">

        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">은퇴생활비 계산기</h2>
          <p className="text-gray-600 text-sm mt-2">은퇴자금과 수익률을 바탕으로 은퇴생활비를 계산합니다.</p>
          <hr className="my-4" />
        </div>
        <label className="block text-lg font-semibold text-gray-700 mb-2">은퇴자금</label>
        <div className="flex justify-end">
          <input
            type="text"
            value={capital}
            onChange={handleCapitalChange}
            placeholder="은퇴자금"
            className="w-2/3 p-3 border border-gray-300 rounded-l-md text-center text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="px-2 text-gray-900">원</span>
        </div>
        {/* 한글로 변환된 금액 표시 */}
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
        <label className="block text-lg font-semibold text-gray-700 mb-2">수익률(%)</label>
        <div className="flex justify-end">
          <input
            type="text"
            value={rate}
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

      <div className="flex space-x-2">
        {result && (
          <div
            className="text-left text-lg font-semibold text-blue-800 mt-4"
            dangerouslySetInnerHTML={{ __html: result }}
          />
        )}
      </div>
      
    </div>
  );
};

export default ExpenseCalculator;
