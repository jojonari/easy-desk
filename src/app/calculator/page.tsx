import React from 'react';
import Calculator from '@/components/calculator/Calculator';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-between bg-gray-50">
      {/* Calculator */}
      <div className="flex flex-grow justify-center w-full p-2">
        <Calculator />
      </div>

    </div>
  );
};

export default Home;
