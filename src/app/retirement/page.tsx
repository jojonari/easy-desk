import React from 'react';
import RetirementCalculator from '../../components/RetirementCalculator';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-between w-screen bg-gray-50">
      {/* Description Section */}
      <div className="w-full p-4 text-center text-xl font-semibold text-gray-700 bg-blue-200">
        <p>이 계산기는 은퇴자금을 계산하거나 필요한 연이율을 구하는 도구입니다. 사용자는 생활비와 연이율을 입력하여 결과를 확인할 수 있습니다. 입력한 값은 자동으로 저장되어 재사용 가능합니다.</p>
      </div>


      {/* Calculator */}
      <div className="flex flex-grow justify-center w-full p-2">
        <RetirementCalculator />
      </div>

      {/* Advertisement Section */}
      <div className="w-full p-4 bg-gray-200 text-center">
        <p className="text-sm text-gray-600">Sponsored by Your Company</p>
      </div>
    </div>
  );
};

export default Home;
