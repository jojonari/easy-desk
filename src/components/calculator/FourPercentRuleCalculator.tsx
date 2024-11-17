"use client";

import convertToKoreanCurrency from '@/utils/UtilConvertToKoreanCurrency';
import formatNumber from '@/utils/UtilFormatNumber';
import React, { useState, useEffect } from 'react';

// 4% 룰 계산기 컴포넌트
const FourPercentRuleCalculator: React.FC = () => {
  const [initialAmount, setInitialAmount] = useState<string>('10000000');
  const [inflationRate, setInflationRate] = useState<string>('2.0');
  const [annualReturnRate, setAnnualReturnRate] = useState<string>('3.5');
  const [results, setResults] = useState<{ year: number; annualWithdrawal: string; monthlyWithdrawal: string; remaining: string; realAnnualWithdrawal: string; realMonthlyWithdrawal: string; isNegative: boolean }[]>([]);

  // 숫자에 천 단위 쉼표를 추가하는 함수
  const handleAmountChange = (amount: string, setAmount: React.Dispatch<React.SetStateAction<string>>) => {
    const formatted = amount.replace(/[^0-9]/g, '');
    const num = parseInt(formatted, 10);
    setAmount(formatNumber(isNaN(num) ? '0' : num.toString()));
  };

  // 소숫점 입력 값이 음수가 되지 않도록 제어하는 함수
  const handleRateChange = (rate: string, setRate: React.Dispatch<React.SetStateAction<string>>) => {
    const formatted = rate.replace(/[^0-9.]/g, '');
    setRate(formatted);
  };

  // 인풋 값에 일정 비율을 더하거나 빼는 함수
  const handleChangeByAmount = (amount: number, setter: React.Dispatch<React.SetStateAction<string>>) => {
    setter((prev) => {
      let currentValue = parseFloat(prev) || 0;
      currentValue = Math.max(0, currentValue + amount); // prevents going below 0
      return currentValue.toFixed(1).toString();
    });
  };

  // 실시간 계산 (useEffect 사용)
  useEffect(() => {
    let yearResults: { year: number; annualWithdrawal: string; monthlyWithdrawal: string; remaining: string; realAnnualWithdrawal: string; realMonthlyWithdrawal: string; isNegative: boolean }[] = [];
    let currentAmount = parseFloat(initialAmount.replace(/,/g, '')) || 0;
    const inflation = parseFloat(inflationRate) / 100;
    const returnRate = parseFloat(annualReturnRate) / 100;

    // 첫 번째 연도의 인출 금액을 4%로 계산
    let annualWithdrawal = currentAmount * 0.04;
    let monthlyWithdrawal = annualWithdrawal / 12;

    for (let i = 1; i <= 100; i++) {
      const isNegative = currentAmount <= 0;

      if (isNegative) {
        yearResults.push({
          year: i,
          annualWithdrawal: "0 원",
          monthlyWithdrawal: "0 원",
          remaining: "0 원",
          realAnnualWithdrawal: "0 원",
          realMonthlyWithdrawal: "0 원",
          isNegative: true,
        });
        break;
      }

      // 연간 인출 금액과 월간 인출 금액 계산
      const realAnnualWithdrawal = annualWithdrawal * Math.pow(1 - inflation, i - 1); // 인플레이션 반영
      const realMonthlyWithdrawal = realAnnualWithdrawal / 12;

      yearResults.push({
        year: i,
        annualWithdrawal: convertToKoreanCurrency(annualWithdrawal.toFixed(0)), // 연간 인출 금액
        monthlyWithdrawal: convertToKoreanCurrency(monthlyWithdrawal.toFixed(0)), // 월간 인출 금액
        remaining: convertToKoreanCurrency(currentAmount),
        realAnnualWithdrawal: convertToKoreanCurrency(realAnnualWithdrawal.toFixed(0)), // 실질 연간 인출 금액
        realMonthlyWithdrawal: convertToKoreanCurrency(realMonthlyWithdrawal.toFixed(0)), // 실질 월간 인출 금액
        isNegative,
      });

      // 인출 후 남은 자금에 대해 수익률만 적용
      currentAmount = (currentAmount - annualWithdrawal) * (1 + returnRate);

      // 다음 해에 인출 금액을 갱신 (잔액의 4%)
      annualWithdrawal = currentAmount * 0.04;
      monthlyWithdrawal = annualWithdrawal / 12;
    }

    setResults(yearResults);
  }, [initialAmount, inflationRate, annualReturnRate]);

  return (
    <div className="w-full p-6 bg-gray-100 rounded-lg shadow-md">
      <div className="mb-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800">4%룰 인출 계산기</h2>
        <p className="text-gray-600 text-sm mt-2">은퇴 후 4% 룰을 적용하여 예측된 인출 금액을 계산합니다.</p>
        <hr/>
      </div>
      {/* 은퇴 자금 입력 */}
      <label className="block text-lg font-semibold text-gray-700 mb-2">은퇴 자금 (원)</label>
      <div className="flex justify-end">
        <input
          type="text"
          value={initialAmount}
          maxLength={19}
          onChange={(e) => handleAmountChange(e.target.value, setInitialAmount)}
          placeholder="은퇴 자금 입력"
          className="w-2/3 p-3 border border-gray-300 rounded-l-md text-center text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="px-2 text-gray-900">원</span>
      </div>

      {/* 은퇴 자금 표기 */}
      <div className="text-sm text-gray-700 font-semibold text-right mt-1 mb-1">
        {convertToKoreanCurrency(initialAmount)} 원
      </div>

      {/* 간단입력 버튼 */}
      <div className="flex flex-col justify-end mt-2 space-y-2">
        <div className="flex space-x-2 w-full">
          <button onClick={() => handleChangeByAmount(100000000, setInitialAmount)} className="border border-blue-400 text-blue-400 py-2 px-4 rounded-md flex-grow">+1억</button>
          <button onClick={() => handleChangeByAmount(10000000, setInitialAmount)} className="border border-blue-400 text-blue-400 py-2 px-4 rounded-md flex-grow">+1천</button>
          <button onClick={() => handleChangeByAmount(1000000, setInitialAmount)} className="border border-blue-400 text-blue-400 py-2 px-4 rounded-md flex-grow">+1백</button>
        </div>
        <div className="flex space-x-2 w-full">
          <button onClick={() => handleChangeByAmount(-100000000, setInitialAmount)} className="border border-red-400 text-red-400 py-2 px-4 rounded-md flex-grow">-1억</button>
          <button onClick={() => handleChangeByAmount(-10000000, setInitialAmount)} className="border border-red-400 text-red-400 py-2 px-4 rounded-md flex-grow">-1천</button>
          <button onClick={() => handleChangeByAmount(-1000000, setInitialAmount)} className="border border-red-400 text-red-400 py-2 px-4 rounded-md flex-grow">-1백</button>
        </div>
      </div>

      {/* 예상 인플레이션율 입력 */}
      <label className="block text-lg font-semibold text-gray-700 mb-2 mt-4">예상 인플레이션율 (%)</label>
      <input
        type="text"
        value={inflationRate}
        maxLength={3}
        onChange={(e) => handleRateChange(e.target.value, setInflationRate)}
        placeholder="예상 인플레이션율"
        className="w-full p-3 border border-gray-300 rounded-md text-center text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex flex-col justify-end mt-2 space-y-2">
        <div className="flex space-x-2 w-full">
          <button onClick={() => handleChangeByAmount(0.5, setInflationRate)} className="border border-blue-400 text-blue-400 py-2 px-4 rounded-md flex-grow">+0.5%</button>
          <button onClick={() => handleChangeByAmount(0.1, setInflationRate)} className="border border-blue-400 text-blue-400 py-2 px-4 rounded-md flex-grow">+0.1%</button>
        </div>
        <div className="flex space-x-2 w-full">
          <button onClick={() => handleChangeByAmount(-0.5, setInflationRate)} className="border border-red-400 text-red-400 py-2 px-4 rounded-md flex-grow">-0.5%</button>
          <button onClick={() => handleChangeByAmount(-0.1, setInflationRate)} className="border border-red-400 text-red-400 py-2 px-4 rounded-md flex-grow">-0.1%</button>
        </div>
      </div>

      {/* 연간 예상 수익률 입력 */}
      <label className="block text-lg font-semibold text-gray-700 mb-2 mt-4">예상 연간 수익률 (%)</label>
      <input
        type="text"
        value={annualReturnRate}
        maxLength={3}
        onChange={(e) => handleRateChange(e.target.value, setAnnualReturnRate)}
        placeholder="예상 연간 수익률"
        className="w-full p-3 border border-gray-300 rounded-md text-center text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex flex-col justify-end mt-2 space-y-2">
        <div className="flex space-x-2 w-full">
          <button onClick={() => handleChangeByAmount(0.5, setAnnualReturnRate)} className="border border-blue-400 text-blue-400 py-2 px-4 rounded-md flex-grow">+0.5%</button>
          <button onClick={() => handleChangeByAmount(0.1, setAnnualReturnRate)} className="border border-blue-400 text-blue-400 py-2 px-4 rounded-md flex-grow">+0.1%</button>
        </div>
        <div className="flex space-x-2 w-full">
          <button onClick={() => handleChangeByAmount(-0.5, setAnnualReturnRate)} className="border border-red-400 text-red-400 py-2 px-4 rounded-md flex-grow">-0.5%</button>
          <button onClick={() => handleChangeByAmount(-0.1, setAnnualReturnRate)} className="border border-red-400 text-red-400 py-2 px-4 rounded-md flex-grow">-0.1%</button>
        </div>
      </div>

      {/* 테이블 데이터 */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">연도별 인출 계획</h3>
        <table className="w-full table-fixed">
          <thead>
            <tr>
              <th rowSpan={2} className="px-2 py-2 border bg-gray-300">연도</th>
              <th colSpan={2} className="px-2 py-2 border bg-gray-300">잔여금액</th>
            </tr>
            <tr>
              <th className="px-2 py-2 border bg-gray-300">인출 금액</th>
              <th className="px-2 py-2 border bg-gray-300">실질 인출 금액</th>
            </tr>
            
          </thead>
          <tbody>
            {results.map((result) => (
              <React.Fragment key={result.year}>
                <tr className={result.isNegative ? "text-red-500" : ""}>
                  <td rowSpan={2} className="px-2 py-2 border text-center">{result.year}년</td>
                  <td colSpan={2} className="px-2 py-2 border text-right">
                    <span className="text-red-500 font-bold">{result.remaining}원</span>
                  </td>
                </tr>
                <tr className={result.isNegative ? "text-red-500" : ""}>
                  <td className="px-2 py-2 border text-right">
                    <span className="text-green-500 font-bold">연: {result.annualWithdrawal}원</span>
                    <br />
                    <span className="text-blue-500 font-medium">월: {result.monthlyWithdrawal}원</span>
                  </td>
                  <td className="px-2 py-2 border text-right">
                    <span className="text-green-500 font-bold">연: {result.realAnnualWithdrawal}원</span>
                    <br />
                    <span className="text-blue-500 font-medium">월: {result.realMonthlyWithdrawal}원</span>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default FourPercentRuleCalculator;
