// Mock API response for dashboard
export const dashboardData = {
  metrics: {
    totalUsers: 12847,
    activeUsers: 8562,
    conversionRate: "12.5%",
    revenue: "$456,789",
    dailyActiveUsers: 3256,
    monthlyActiveUsers: 9876,
    averageTransactionValue: "$2,345",
    totalTransactions: 45678
  },
  recentTransactions: [
    { id: 1, user: "John Doe", amount: 12500, status: "completed", date: "2024-03-15", riskScore: 85 },
    { id: 2, user: "Jane Smith", amount: 8500, status: "pending", date: "2024-03-14", riskScore: 35 },
    { id: 3, user: "Bob Wilson", amount: 21000, status: "completed", date: "2024-03-13", riskScore: 92 },
    { id: 4, user: "Alice Johnson", amount: 15000, status: "completed", date: "2024-03-12", riskScore: 28 },
    { id: 5, user: "Charlie Brown", amount: 9500, status: "pending", date: "2024-03-11", riskScore: 65 },
    { id: 6, user: "Diana Prince", amount: 18000, status: "completed", date: "2024-03-10", riskScore: 45 }
  ],
  riskMetrics: {
    highRiskTransactions: 245,
    mediumRiskTransactions: 892,
    lowRiskTransactions: 3567,
    flaggedAccounts: 127,
    totalMonitored: 12847,
    riskDistribution: {
      byCountry: [
        { country: "United States", high: 89, medium: 234, low: 1203 },
        { country: "United Kingdom", high: 45, medium: 156, low: 867 },
        { country: "Germany", high: 34, medium: 123, low: 654 },
        { country: "Japan", high: 28, medium: 98, low: 432 },
        { country: "Singapore", high: 23, medium: 87, low: 345 }
      ],
      byEntityType: [
        { type: "Individual", high: 156, medium: 432, low: 2345 },
        { type: "Corporation", high: 67, medium: 345, low: 987 },
        { type: "Trust", high: 22, medium: 115, low: 235 }
      ]
    },
    historicalRiskTrends: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (30 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      high: Math.floor(Math.random() * 50 + 200),
      medium: Math.floor(Math.random() * 100 + 800),
      low: Math.floor(Math.random() * 200 + 3000)
    }))
  },
  sanctionsData: {
    totalScreened: 45678,
    matches: 892,
    falsePositives: 823,
    pendingReview: 69,
    byRegion: [
      { region: "North America", count: 234, sanctions: ["OFAC", "CAATSA"] },
      { region: "Europe", count: 312, sanctions: ["EU", "UK"] },
      { region: "Asia", count: 189, sanctions: ["JFSA", "MAS"] },
      { region: "Middle East", count: 98, sanctions: ["UAE", "SAMA"] },
      { region: "Africa", count: 45, sanctions: ["SACU", "CBN"] },
      { region: "South America", count: 14, sanctions: ["BCB", "BCRA"] }
    ],
    sanctionsBreakdown: {
      OFAC: 456,
      EU: 324,
      UN: 234,
      UK: 187,
      CAATSA: 145,
      Others: 98
    },
    historicalMatches: Array.from({ length: 12 }, (_, i) => ({
      month: new Date(2024, i, 1).toLocaleString('default', { month: 'short' }),
      matches: Math.floor(Math.random() * 100 + 50),
      falsePositives: Math.floor(Math.random() * 40 + 30)
    }))
  }
};

// Mock pricing data with historical values
export const pricingData = {
  items: [
    { id: 1, name: "BTC/USD", price: 65432.50, change: 2.15, lastUpdate: "2024-03-15T10:00:00", volume: "5.2B", marketCap: "1.2T" },
    { id: 2, name: "ETH/USD", price: 3521.80, change: -0.85, lastUpdate: "2024-03-15T10:00:00", volume: "2.1B", marketCap: "420B" },
    { id: 3, name: "SOL/USD", price: 125.20, change: 5.30, lastUpdate: "2024-03-15T10:00:00", volume: "890M", marketCap: "52B" },
    { id: 4, name: "AVAX/USD", price: 42.75, change: 1.25, lastUpdate: "2024-03-15T10:00:00", volume: "456M", marketCap: "15B" },
    { id: 5, name: "DOT/USD", price: 18.90, change: -2.10, lastUpdate: "2024-03-15T10:00:00", volume: "234M", marketCap: "22B" },
    { id: 6, name: "LINK/USD", price: 16.45, change: 3.75, lastUpdate: "2024-03-15T10:00:00", volume: "345M", marketCap: "8.5B" }
  ],
  historicalData: {
    "BTC/USD": Array.from({ length: 365 }, (_, i) => {
      const date = new Date(Date.now() - (365 - i) * 24 * 60 * 60 * 1000);
      const basePrice = 65000;
      const volatility = 2000;
      const trend = Math.sin(i * 0.05) * 10000;
      
      const open = basePrice + trend + (Math.random() - 0.5) * volatility;
      const high = open + Math.random() * volatility * 0.2;
      const low = open - Math.random() * volatility * 0.2;
      const close = (open + high + low) / 3 + (Math.random() - 0.5) * volatility * 0.1;
      const volume = Math.floor(Math.random() * 100000 + 50000);
      
      return {
        time: date.toISOString().split('T')[0],
        open,
        high,
        low,
        close,
        volume
      };
    }),
    "ETH/USD": Array.from({ length: 365 }, (_, i) => {
      const date = new Date(Date.now() - (365 - i) * 24 * 60 * 60 * 1000);
      const basePrice = 3500;
      const volatility = 200;
      const trend = Math.sin(i * 0.05) * 500;
      
      const open = basePrice + trend + (Math.random() - 0.5) * volatility;
      const high = open + Math.random() * volatility * 0.2;
      const low = open - Math.random() * volatility * 0.2;
      const close = (open + high + low) / 3 + (Math.random() - 0.5) * volatility * 0.1;
      const volume = Math.floor(Math.random() * 50000 + 25000);
      
      return {
        time: date.toISOString().split('T')[0],
        open,
        high,
        low,
        close,
        volume
      };
    })
  }
};

// Mock graph data for network analysis
export const graphData = {
  nodes: [
    { id: "1", label: "Wallet A", type: "wallet", risk: "high", balance: "1.2M USD", country: "US", age: "2y 3m", transactions: 1245 },
    { id: "2", label: "Exchange B", type: "exchange", risk: "low", volume: "5M USD/day", country: "SG", age: "5y 1m", transactions: 50432 },
    { id: "3", label: "Wallet C", type: "wallet", risk: "medium", balance: "450K USD", country: "UK", age: "1y 7m", transactions: 523 },
    { id: "4", label: "Smart Contract D", type: "contract", risk: "high", tvl: "2.1M USD", protocol: "DeFi", age: "8m", transactions: 8234 },
    { id: "5", label: "Wallet E", type: "wallet", risk: "low", balance: "50K USD", country: "DE", age: "3y 2m", transactions: 234 },
    { id: "6", label: "Exchange F", type: "exchange", risk: "medium", volume: "1.2M USD/day", country: "JP", age: "4y 5m", transactions: 23456 },
    { id: "7", label: "Wallet G", type: "wallet", risk: "high", balance: "890K USD", country: "CN", age: "6m", transactions: 167 },
    { id: "8", label: "Smart Contract H", type: "contract", risk: "low", tvl: "5.5M USD", protocol: "NFT", age: "1y 2m", transactions: 4521 },
    { id: "9", label: "Wallet I", type: "wallet", risk: "medium", balance: "220K USD", country: "FR", age: "2y 8m", transactions: 892 },
    { id: "10", label: "Exchange J", type: "exchange", risk: "high", volume: "8.1M USD/day", country: "KR", age: "3y 9m", transactions: 34521 }
  ],
  edges: [
    { from: "1", to: "2", type: "transaction", value: "500K USD", timestamp: "2024-03-15T09:23:00", hash: "0x1234...", fee: "0.05 ETH" },
    { from: "2", to: "3", type: "transaction", value: "120K USD", timestamp: "2024-03-15T09:45:00", hash: "0x2345...", fee: "0.03 ETH" },
    { from: "1", to: "4", type: "interaction", value: "250K USD", timestamp: "2024-03-15T10:12:00", hash: "0x3456...", fee: "0.08 ETH" },
    { from: "3", to: "5", type: "transaction", value: "75K USD", timestamp: "2024-03-15T10:30:00", hash: "0x4567...", fee: "0.02 ETH" },
    { from: "4", to: "6", type: "interaction", value: "180K USD", timestamp: "2024-03-15T11:05:00", hash: "0x5678...", fee: "0.04 ETH" },
    { from: "6", to: "7", type: "transaction", value: "95K USD", timestamp: "2024-03-15T11:22:00", hash: "0x6789...", fee: "0.03 ETH" },
    { from: "7", to: "8", type: "interaction", value: "320K USD", timestamp: "2024-03-15T11:45:00", hash: "0x7890...", fee: "0.06 ETH" },
    { from: "8", to: "9", type: "transaction", value: "150K USD", timestamp: "2024-03-15T12:10:00", hash: "0x8901...", fee: "0.04 ETH" },
    { from: "9", to: "10", type: "transaction", value: "280K USD", timestamp: "2024-03-15T12:35:00", hash: "0x9012...", fee: "0.05 ETH" },
    { from: "10", to: "1", type: "transaction", value: "420K USD", timestamp: "2024-03-15T13:00:00", hash: "0x0123...", fee: "0.07 ETH" }
  ],
  clusters: [
    { id: "cluster1", label: "High-Risk Group", nodes: ["1", "4", "7", "10"], riskScore: 85 },
    { id: "cluster2", label: "Exchange Network", nodes: ["2", "6"], riskScore: 45 },
    { id: "cluster3", label: "DeFi Ecosystem", nodes: ["4", "8"], riskScore: 62 }
  ],
  patterns: [
    { id: "pattern1", type: "Circular Flow", nodes: ["1", "2", "3", "1"], confidence: 0.85 },
    { id: "pattern2", type: "Layering", nodes: ["4", "5", "6", "7"], confidence: 0.92 },
    { id: "pattern3", type: "Structuring", nodes: ["8", "9", "10"], confidence: 0.78 }
  ]
};