import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { pricingData } from '../data/mockData';

const PricingApp = () => {
  const [selectedPair, setSelectedPair] = useState("BTC/USD");

  // Generate candlestick data
  const chartData = pricingData.historicalData[selectedPair]?.map(item => ({
    date: item.time,
    price: (item.high + item.low) / 2,
    volume: item.volume
  })) || [];

  return (
    <div className="bg-[#161923] rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Market Prices</h2>
        <select 
          className="bg-[#1F2333] text-white border border-[#2A2F42] rounded-lg px-4 py-2"
          value={selectedPair}
          onChange={(e) => setSelectedPair(e.target.value)}
        >
          <option value="BTC/USD">BTC/USD</option>
          <option value="ETH/USD">ETH/USD</option>
        </select>
      </div>
      
      <div className="mb-8">
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2F42" />
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#d1d4dc' }}
                stroke="#2A2F42"
              />
              <YAxis 
                tick={{ fill: '#d1d4dc' }}
                stroke="#2A2F42"
                domain={['auto', 'auto']}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2333',
                  border: '1px solid #2A2F42'
                }}
                labelStyle={{ color: '#d1d4dc' }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#81C200" 
                dot={false}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-[#1F2333]">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Pair</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">24h Change</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Volume</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Last Update</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2A2F42]">
            {pricingData.items.map((item) => (
              <tr key={item.id} className="hover:bg-[#1F2333]/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">${item.price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    item.change >= 0 
                      ? 'bg-[#81C200]/20 text-[#81C200]' 
                      : 'bg-red-900/50 text-red-300'
                  }`}>
                    {item.change >= 0 ? '+' : ''}{item.change}%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                  ${(Math.random() * 100000000).toLocaleString(undefined, {
                    maximumFractionDigits: 0
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                  {new Date(item.lastUpdate).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PricingApp;