import React from 'react';
import Calculator from '../../components/Calculator';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-between w-screen bg-gray-50">
      {/* Description Section */}
      <div className="w-full p-4 text-center text-xl font-semibold text-gray-700 bg-blue-200">
        <p>쉽고 빠르게 계산을 할 수 있는 인터랙티브 계산기입니다. 사칙연산을 비롯한 다양한 계산을 지원합니다. 직관적인 인터페이스로 누구나 쉽게 사용할 수 있습니다.</p>
      </div>


      {/* Calculator */}
      <div className="flex flex-grow justify-center w-full p-2">
        <Calculator />
      </div>

      {/* Advertisement Section */}
      <div className="w-full p-4 bg-gray-200 text-center">
        <p className="text-sm text-gray-600">Sponsored by Your Company</p>
      </div>
    </div>
  );
};

export default Home;
