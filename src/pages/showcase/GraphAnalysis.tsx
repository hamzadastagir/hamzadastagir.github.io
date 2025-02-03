import React from 'react';
import { motion } from 'framer-motion';
import PricingApp from '../../components/PricingApp';

const GraphAnalysis = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20 min-h-screen bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Market Analysis</h1>
        <PricingApp />
      </div>
    </motion.div>
  );
};

export default GraphAnalysis;