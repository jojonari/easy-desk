"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const LifeCycleTable: React.FC = () => {
  const [children, setChildren] = useState<
    { birthYear: number; gender: string }[]
  >([]);
  const [dadBirthYear, setDadBirthYear] = useState<string>("");
  const [momBirthYear, setMomBirthYear] = useState<string>("");
  const [tableData, setTableData] = useState<any[]>([]);

  // Load data from cookies on component mount
  useEffect(() => {
    const savedDadBirthYear = Cookies.get("dadBirthYear");
    const savedMomBirthYear = Cookies.get("momBirthYear");
    const savedChildren = Cookies.get("children");

    if (savedDadBirthYear) setDadBirthYear(savedDadBirthYear);
    if (savedMomBirthYear) setMomBirthYear(savedMomBirthYear);
    if (savedChildren) setChildren(JSON.parse(savedChildren));
  }, []);

  // Save data to cookies whenever relevant state changes
  useEffect(() => {
    Cookies.set("dadBirthYear", dadBirthYear);
    Cookies.set("momBirthYear", momBirthYear);
    Cookies.set("children", JSON.stringify(children));
  }, [dadBirthYear, momBirthYear, children]);

  const addChild = () => {
    setChildren([...children, { birthYear: 0, gender: "남자" }]);
  };

  const updateChild = (index: number, key: string, value: string | number) => {
    const updatedChildren = [...children];
    if (key === "birthYear") {
      updatedChildren[index].birthYear = parseInt(value as string, 10) || 0;
    } else if (key === "gender") {
      updatedChildren[index].gender = value as string;
    }
    setChildren(updatedChildren);
  };

  const toggleGender = (index: number) => {
    const updatedChildren = [...children];
    updatedChildren[index].gender = updatedChildren[index].gender === "남자" ? "여자" : "남자";
    setChildren(updatedChildren);
  };

  const calculateLifeCycle = () => {
    const dadYear = parseInt(dadBirthYear, 10);
    const momYear = parseInt(momBirthYear, 10);

    if (isNaN(dadYear) || isNaN(momYear) || children.some((c) => c.birthYear === 0)) {
      alert("모든 입력란에 숫자를 입력해주세요.");
      return;
    }

    const currentYear = new Date().getFullYear();

    const minChildBirthYear = Math.min(...children.map((child) => child.birthYear));
    const startYear = minChildBirthYear;

    const maxAge = Math.max(
      ...children.map((child) =>
        currentYear - child.birthYear + (child.gender === "남자" ? 85 : 90)
      )
    );

    const data: any[] = [];

    for (let year = startYear; year <= startYear + maxAge; year++) {
      const row: any = {
        dadAge: year - dadYear,
        momAge: year - momYear,
        dadEvent: "",
        momEvent: "",
      };

      if (row.dadAge === 40) row.dadEvent = "민방위 종료";
      if (row.dadAge === 55) row.dadEvent = "퇴직연금 수급";
      if (row.momAge === 55) row.momEvent = "퇴직연금 수급";
      if (row.dadAge === 51) row.dadEvent = "평균 은퇴";
      if (row.momAge === 51) row.momEvent = "평균 은퇴";
      if (row.dadAge === 65) row.dadEvent = "국민연금 수급";
      if (row.momAge === 65) row.momEvent = "국민연금 수급";
      if (row.dadAge === 85) row.dadEvent = "평균 수명";
      if (row.momAge === 90) row.momEvent = "평균 수명";

      children.forEach((child, index) => {
        const childAge = year - child.birthYear;

        if (childAge >= 0) {
          let events: string[] = [];

          if (childAge >= 7 && childAge <= 12) {
            events.push(`초 ${childAge - 6}학년`);
          } else if (childAge >= 13 && childAge <= 15) {
            events.push(`중 ${childAge - 12}학년`);
          } else if (childAge >= 16 && childAge <= 18) {
            events.push(`고 ${childAge - 15}학년`);
          } else if (childAge >= 19 && childAge <= 22) {
            events.push(`대학 ${childAge - 18}학년`);
          }

          if (childAge === 0 || childAge === 10) events.push("2천만원 증여");
          if (childAge < 8) events.push("육아휴직 가능");
          if (childAge >= 20 && childAge % 10 === 0) events.push("5천만원 증여");
          if (child.gender === "남자" && childAge === 23) events.push("군복무");
          if (child.gender === "남자" && childAge === 24) events.push("군복무");
          if (child.gender === "남자" && childAge === 36) events.push("평균 초혼");
          if (child.gender === "여자" && childAge === 33) events.push("평균 초혼");
          if (child.gender === "남자" && childAge === 40) events.push("민방위 종료");

          if (childAge === 0) events.push("부모급여 월100만원");
          if (childAge === 1) events.push("부모급여 월50만원");
          if (childAge >= 0 && childAge <= 8) events.push("아동수당 월10만원");

          row[`child${index + 1}Age`] = childAge;
          row[`child${index + 1}Event`] = events.filter(Boolean).join("\n");
        } else {
          row[`child${index + 1}Age`] = "-";
          row[`child${index + 1}Event`] = "-";
        }
      });

      data.push(row);
    }

    setTableData(data);
  };

  return (
    <div className="max-w-screen-xl mx-auto space-y-6 p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800">자녀 생애 주기</h1>
        <p className="text-sm text-gray-600">자녀가 85세(남) 또는 90세(여)까지 주요 생애 단계를 계산합니다.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-lg font-semibold text-gray-700">아빠 생년</label>
          <input
            type="number"
            value={dadBirthYear}
            onChange={(e) => setDadBirthYear(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="아빠 생년 입력"
          />
        </div>
        <div>
          <label className="block text-lg font-semibold text-gray-700">엄마 생년</label>
          <input
            type="number"
            value={momBirthYear}
            onChange={(e) => setMomBirthYear(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="엄마 생년 입력"
          />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-700">자녀 정보</h2>
        {children.map((child, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                자녀 {index + 1} 생년
              </label>
              <input
                type="number"
                value={child.birthYear || ""}
                onChange={(e) =>
                  updateChild(index, "birthYear", e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="생년 입력"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                자녀 {index + 1} 성별
              </label>
              <div
                className="relative inline-flex items-center cursor-pointer"
                onClick={() => toggleGender(index)}
              >
                <span
                  className={`absolute left-12 w-10 h-6 rounded-full transition-colors ${
                    child.gender === "남자" ? "bg-blue-500" : "bg-pink-500"
                  }`}
                ></span>
                <span
                  className={`absolute left-12 m-1 w-4 h-4 rounded-full bg-white transition-transform transform ${
                    child.gender === "여자" ? "translate-x-5" : "translate-x-0"
                  }`}
                ></span>
              </div>
              <span className="ml-3 text-gray-700">
                {child.gender === "남자" ? "남자" : "여자"}
              </span>
            </div>
          </div>
        ))}
        <button
          onClick={addChild}
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
        >
          자녀 추가
        </button>
      </div>

      <div className="text-center mt-6">
        <button
          onClick={calculateLifeCycle}
          className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600"
        >
          생애 주기 계산
        </button>
      </div>

      {tableData.length > 0 && (
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full bg-white border border-gray-200 rounded-md">
            <thead className="bg-gray-200">
              <tr>
                {children.map((_, index) => (
                  <th
                    key={`child${index + 1}Age`}
                    className="py-2 px-4 text-left text-gray-700"
                  >
                    자녀{index + 1} 나이
                  </th>
                ))}
                <th className="py-2 px-4 text-left text-gray-700">아빠 나이</th>
                <th className="py-2 px-4 text-left text-gray-700">엄마 나이</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr
                key={index}
                className={`border-b ${
                  row.dadAge === new Date().getFullYear() - Number(dadBirthYear) ? 'bg-blue-100' : ''
                }`}
              >
                  {children.map((_, childIndex) => (
                    <td
                      key={`child${childIndex + 1}Age-${index}`}
                      className="py-2 px-4"
                    >
                      <div>{row[`child${childIndex + 1}Age`]}세</div>
                      <div className="text-sm text-gray-500 whitespace-pre-line">
                        {row[`child${childIndex + 1}Event`]}
                      </div>
                    </td>
                  ))}
                  <td className="py-2 px-4">
                    <div>{row.dadAge}세</div>
                    <div className="text-sm text-gray-500">{row.dadEvent}</div>
                  </td>
                  <td className="py-2 px-4">
                    <div>{row.momAge}세</div>
                    <div className="text-sm text-gray-500">{row.momEvent}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LifeCycleTable;
