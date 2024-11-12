"use client";

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
  const [rate, setRate] = useState<string>('');
  const [annualExpense, setAnnualExpense] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);
  const [isMonthly, setIsMonthly] = useState<boolean>(false);

  useEffect(() => {
    // 쿠키에서 초기 값 가져오기
    const savedRate = getCookie('rate');
    const savedExpense = getCookie('annualExpense');
    const savedIsMonthly = getCookie('isMonthly') === 'true';

    if (savedRate) setRate(savedRate);
    if (savedExpense) setAnnualExpense(savedExpense);
    setIsMonthly(savedIsMonthly);
  }, []);

  const calculateCapital = () => {
    const r = parseFloat(rate.replace(/,/g, '')) / 100;
    let exp = parseFloat(annualExpense.replace(/,/g, ''));

    if (isMonthly) {
      exp *= 12; // 월간 생활비일 경우 연간으로 변환
    }

    if (rate && annualExpense) {
      setResult(`필요한 은퇴자금: ${formatNumber((exp / r).toFixed(0))} 원`);
    } else {
      setResult('연이율(배당률)과 생활비를 입력하세요.');
    }
  };

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatNumber(e.target.value.replace(/,/g, ''));
    setRate(value);
    setCookie('rate', value, 14); // 쿠키에 저장
  };

  const handleExpenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatNumber(e.target.value.replace(/,/g, ''));
    setAnnualExpense(value);
    setCookie('annualExpense', value, 14); // 쿠키에 저장
  };

  const handleSwitchChange = () => {
    const newState = !isMonthly;
    setIsMonthly(newState);
    setCookie('isMonthly', newState.toString(), 14); // 쿠키에 저장
  };

  return (
    <div className="w-full">
      <div className="flex items-center mb-4 justify-center">
        <span className="mr-2 text-sm font-medium text-gray-700">생활비: </span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isMonthly}
            onChange={handleSwitchChange}
            className="sr-only"
          />
          <div className="w-12 h-6 bg-gray-300 rounded-full dark:bg-gray-700 transition-all duration-300"></div>
          <div className={`dot absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-all duration-300 ${isMonthly ? 'transform translate-x-6' : ''}`}></div>
          <span className="ml-2 text-sm text-gray-700">{isMonthly ? '월간' : '연간'}</span>
        </label>
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-700 mb-2">연이율(배당률) (%)</label>
        <div className="flex justify-end">
          <input
            type="text"
            value={rate}
            onChange={handleRateChange}
            placeholder="연이율(배당률) (%)"
            className="w-2/3 p-3 border border-gray-300 rounded-l-md text-center text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="px-2 text-gray-900">%</span>
        </div>
        <div className="flex justify-end mt-2 space-x-2">
          <button onClick={() => setRate('3')} className="btn bg-gray-500 py-2 px-4 rounded-md">3%</button>
          <button onClick={() => setRate('4')} className="btn bg-gray-600 py-2 px-4 rounded-md">4%</button>
          <button onClick={() => setRate('5')} className="btn bg-gray-700 py-2 px-4 rounded-md">5%</button>
          <button onClick={() => setRate('6')} className="btn bg-gray-800 py-2 px-4 rounded-md">6%</button>
          <button onClick={() => setRate('7')} className="btn bg-gray-900 py-2 px-4 rounded-md">7%</button>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-700 mb-2">{isMonthly ? '월간 생활비' : '연간 생활비'}</label>
        <div className="flex justify-end">
          <input
            type="text"
            value={annualExpense}
            onChange={handleExpenseChange}
            placeholder={isMonthly ? '월간 생활비' : '연간 생활비'}
            className="w-2/3 p-3 border border-gray-300 rounded-r-md text-center text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="px-2 text-gray-900">원</span>
        </div>
        <div className="flex justify-end mt-2 space-x-2">
          {isMonthly ? (
            <>
              <button onClick={() => setAnnualExpense('2,000,000')} className="btn bg-gray-500 py-2 px-4 rounded-md">2백만원</button>
              <button onClick={() => setAnnualExpense('3,000,000')} className="btn bg-gray-600 py-2 px-4 rounded-md">3백만원</button>
              <button onClick={() => setAnnualExpense('4,000,000')} className="btn bg-gray-700 py-2 px-4 rounded-md">4백만원</button>
              <button onClick={() => setAnnualExpense('5,000,000')} className="btn bg-gray-800 py-2 px-4 rounded-md">5백만원</button>
              <button onClick={() => setAnnualExpense('6,000,000')} className="btn bg-gray-900 py-2 px-4 rounded-md">6백만원</button>
            </>
          ) : (
            <>
              <button onClick={() => setAnnualExpense('30,000,000')} className="btn bg-gray-500 py-2 px-4 rounded-md">3천만원</button>
              <button onClick={() => setAnnualExpense('40,000,000')} className="btn bg-gray-600 py-2 px-4 rounded-md">4천만원</button>
              <button onClick={() => setAnnualExpense('50,000,000')} className="btn bg-gray-700 py-2 px-4 rounded-md">5천만원</button>
              <button onClick={() => setAnnualExpense('60,000,000')} className="btn bg-gray-800 py-2 px-4 rounded-md">6천만원</button>
              <button onClick={() => setAnnualExpense('70,000,000')} className="btn bg-gray-900 py-2 px-4 rounded-md">7천만원</button>
            </>
          )}
        </div>
      </div>

      <button onClick={calculateCapital} className="btn bg-green-500 py-3 text-white rounded-md font-semibold w-full hover:bg-green-600">
        계산하기
      </button>
      {result && <div className="text-right text-lg font-semibold text-blue-800 mt-4">{result}</div>}
    </div>
  );
};

// 연이율(배당률) 계산기 컴포넌트
const RateCalculator: React.FC = () => {
  const [capital, setCapital] = useState<string>('');
  const [annualExpense, setAnnualExpense] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);
  const [isMonthly, setIsMonthly] = useState<boolean>(false);

  useEffect(() => {
    const savedCapital = getCookie('capital');
    const savedExpense = getCookie('annualExpense');
    const savedIsMonthly = getCookie('isMonthly') === 'true';

    if (savedCapital) setCapital(savedCapital);
    if (savedExpense) setAnnualExpense(savedExpense);
    setIsMonthly(savedIsMonthly);
  }, []);

  const calculateRate = () => {
    const cap = parseFloat(capital.replace(/,/g, ''));
    let exp = parseFloat(annualExpense.replace(/,/g, ''));

    if (isMonthly) {
      exp *= 12; // 월간 생활비일 경우 연간으로 변환
    }

    if (capital && annualExpense) {
      setResult(`필요 연이율(배당률): ${formatNumber(((exp / cap) * 100).toFixed(2))}%`);
    } else {
      setResult('은퇴자금과 생활비를 입력하세요.');
    }
  };

  const handleCapitalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatNumber(e.target.value.replace(/,/g, ''));
    setCapital(value);
    setCookie('capital', value, 14); // 쿠키에 저장
  };

  const handleExpenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatNumber(e.target.value.replace(/,/g, ''));
    setAnnualExpense(value);
    setCookie('annualExpense', value, 14); // 쿠키에 저장
  };

  const handleSwitchChange = () => {
    const newState = !isMonthly;
    setIsMonthly(newState);
    setCookie('isMonthly', newState.toString(), 14); // 쿠키에 저장
  };

  return (
    <div className="w-full">
      <div className="flex items-center mb-4 justify-center">
        <span className="mr-2 text-sm font-medium text-gray-700">생활비: </span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isMonthly}
            onChange={handleSwitchChange}
            className="sr-only"
          />
          <div className="w-12 h-6 bg-gray-300 rounded-full dark:bg-gray-700 transition-all duration-300"></div>
          <div className={`dot absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-all duration-300 ${isMonthly ? 'transform translate-x-6' : ''}`}></div>
          <span className="ml-2 text-sm text-gray-700">{isMonthly ? '월간' : '연간'}</span>
        </label>
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-700 mb-2">은퇴자금</label>
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
        <div className="flex justify-end mt-2 space-x-2">
          <button onClick={() => setCapital('300,000,000')} className="btn bg-gray-500 py-2 px-4 rounded-md">3억</button>
          <button onClick={() => setCapital('500,000,000')} className="btn bg-gray-600 py-2 px-4 rounded-md">5억</button>
          <button onClick={() => setCapital('1,000,000,000')} className="btn bg-gray-700 py-2 px-4 rounded-md">10억</button>
          <button onClick={() => setCapital('1,500,000,000')} className="btn bg-gray-800 py-2 px-4 rounded-md">15억</button>
          <button onClick={() => setCapital('2,000,000,000')} className="btn bg-gray-900 py-2 px-4 rounded-md">20억</button>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-700 mb-2">{isMonthly ? '월간 생활비' : '연간 생활비'}</label>
        <div className="flex justify-end">
          <input
            type="text"
            value={annualExpense}
            onChange={handleExpenseChange}
            placeholder={isMonthly ? '월간 생활비' : '연간 생활비'}
            className="w-2/3 p-3 border border-gray-300 rounded-r-md text-center text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="px-2 text-gray-900">원</span>
        </div>
        <div className="flex justify-end mt-2 space-x-2">
          {isMonthly ? (
            <>
              <button onClick={() => setAnnualExpense('2,000,000')} className="btn bg-gray-500 py-2 px-4 rounded-md">2백만원</button>
              <button onClick={() => setAnnualExpense('3,000,000')} className="btn bg-gray-600 py-2 px-4 rounded-md">3백만원</button>
              <button onClick={() => setAnnualExpense('4,000,000')} className="btn bg-gray-700 py-2 px-4 rounded-md">4백만원</button>
              <button onClick={() => setAnnualExpense('5,000,000')} className="btn bg-gray-800 py-2 px-4 rounded-md">5백만원</button>
              <button onClick={() => setAnnualExpense('6,000,000')} className="btn bg-gray-900 py-2 px-4 rounded-md">6백만원</button>
            </>
          ) : (
            <>
              <button onClick={() => setAnnualExpense('30,000,000')} className="btn bg-gray-500 py-2 px-4 rounded-md">3천만원</button>
              <button onClick={() => setAnnualExpense('40,000,000')} className="btn bg-gray-600 py-2 px-4 rounded-md">4천만원</button>
              <button onClick={() => setAnnualExpense('50,000,000')} className="btn bg-gray-700 py-2 px-4 rounded-md">5천만원</button>
              <button onClick={() => setAnnualExpense('60,000,000')} className="btn bg-gray-800 py-2 px-4 rounded-md">6천만원</button>
              <button onClick={() => setAnnualExpense('70,000,000')} className="btn bg-gray-900 py-2 px-4 rounded-md">7천만원</button>
            </>
          )}
        </div>

      </div>

      <button onClick={calculateRate} className="btn bg-green-500 py-3 text-white rounded-md font-semibold w-full hover:bg-green-600">
        계산하기
      </button>
      {result && <div className="text-right text-lg font-semibold text-blue-800 mt-4">{result}</div>}
    </div>
  );
};

// 생활비 계산기 컴포넌트
const ExpenseCalculator: React.FC = () => {
  const [capital, setCapital] = useState<string>('');
  const [rate, setRate] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    const savedCapital = getCookie('capital');
    const savedRate = getCookie('rate');

    if (savedCapital) setCapital(savedCapital);
    if (savedRate) setRate(savedRate);
  }, []);

  const calculateExpense = () => {
    const cap = parseFloat(capital.replace(/,/g, ''));
    const r = parseFloat(rate.replace(/,/g, '')) / 100;

    if (capital && rate) {
      setResult(`
        연간 생활비: ${formatNumber((cap * r).toFixed(0))} 원<br>
        월간 생활비: ${formatNumber((cap * r / 12).toFixed(0))} 원
      `);
      
    } else {
      setResult('은퇴자금과 연이율을 입력하세요.');
    }
  };

  const handleCapitalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatNumber(e.target.value.replace(/,/g, ''));
    setCapital(value);
    setCookie('capital', value, 14); // 쿠키에 저장
  };

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatNumber(e.target.value.replace(/,/g, ''));
    setRate(value);
    setCookie('rate', value, 14); // 쿠키에 저장
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <label className="block text-sm text-gray-700 mb-2">은퇴자금</label>
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
        <div className="flex justify-end mt-2 space-x-2">
          <button onClick={() => setCapital('300,000,000')} className="btn bg-gray-500 py-2 px-4 rounded-md">3억</button>
          <button onClick={() => setCapital('500,000,000')} className="btn bg-gray-600 py-2 px-4 rounded-md">5억</button>
          <button onClick={() => setCapital('1,000,000,000')} className="btn bg-gray-700 py-2 px-4 rounded-md">10억</button>
          <button onClick={() => setCapital('1,500,000,000')} className="btn bg-gray-800 py-2 px-4 rounded-md">15억</button>
          <button onClick={() => setCapital('2,000,000,000')} className="btn bg-gray-900 py-2 px-4 rounded-md">20억</button>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-700 mb-2">연이율(배당률) (%)</label>
        <div className="flex justify-end">
          <input
            type="text"
            value={rate}
            onChange={handleRateChange}
            placeholder="연이율(배당률) (%)"
            className="w-2/3 p-3 border border-gray-300 rounded-l-md text-center text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="px-2 text-gray-900">%</span>
        </div>
        <div className="flex justify-end mt-2 space-x-2">
          <button onClick={() => setRate('3')} className="btn bg-gray-500 py-2 px-4 rounded-md">3%</button>
          <button onClick={() => setRate('4')} className="btn bg-gray-600 py-2 px-4 rounded-md">4%</button>
          <button onClick={() => setRate('5')} className="btn bg-gray-700 py-2 px-4 rounded-md">5%</button>
          <button onClick={() => setRate('6')} className="btn bg-gray-800 py-2 px-4 rounded-md">6%</button>
          <button onClick={() => setRate('7')} className="btn bg-gray-900 py-2 px-4 rounded-md">7%</button>
        </div>
      </div>

      <button onClick={calculateExpense} className="btn bg-green-500 py-3 text-white rounded-md font-semibold w-full hover:bg-green-600">
        계산하기
      </button>
      {result && (
        <div
          className="text-right text-lg font-semibold text-blue-800 mt-4"
          dangerouslySetInnerHTML={{ __html: result }}
        />
      )}

    </div>
  );
};

// 메인 컴포넌트
const RetirementCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState('capital');

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-100 p-6">
      <div className="flex justify-center mb-6 space-x-4">
        <button
          onClick={() => setActiveTab('capital')}
          className={`p-3 w-1/3 text-lg font-semibold rounded-lg transition-all duration-300 ease-in-out ${
            activeTab === 'capital'
              ? 'bg-blue-600 text-white shadow-xl transform scale-105'
              : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white'
          }`}
        >
          은퇴자금 계산기
        </button>
        <button
          onClick={() => setActiveTab('rate')}
          className={`p-3 w-1/3 text-lg font-semibold rounded-lg transition-all duration-300 ease-in-out ${
            activeTab === 'rate'
              ? 'bg-blue-600 text-white shadow-xl transform scale-105'
              : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white'
          }`}
        >
          이율(배당률) 계산기
        </button>
        <button
          onClick={() => setActiveTab('expense')}
          className={`p-3 w-1/3 text-lg font-semibold rounded-lg transition-all duration-300 ease-in-out ${
            activeTab === 'expense'
              ? 'bg-blue-600 text-white shadow-xl transform scale-105'
              : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white'
          }`}
        >
          생활비 계산기
        </button>
      </div>

      <div className="flex-1 w-full max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
        {activeTab === 'capital' && <CapitalCalculator />}
        {activeTab === 'rate' && <RateCalculator />}
        {activeTab === 'expense' && <ExpenseCalculator />}
      </div>
    </div>
  );
};


export default RetirementCalculator;
