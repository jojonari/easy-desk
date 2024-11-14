import React from 'react';
import RetirementCalculator from '@/components/RateCalculator';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-between bg-gray-50">
      {/* Calculator */}
      <div className="flex flex-grow justify-center w-full p-2">
        <RetirementCalculator />
      </div>

    </div>
  );
};

export default Home;
