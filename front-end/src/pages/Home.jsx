import React from 'react';
import Accordion from '../components/StepsAccordion';

function Home() {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">How It Works:</h1>
      <Accordion />
    </div>
  );
}

export default Home;