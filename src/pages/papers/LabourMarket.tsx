import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import MarkdownRenderer from '../../components/MarkdownRenderer';
import GDPChart from '../../components/charts/GDPChart';
import DebtChart from '../../components/charts/DebtChart';
import PopulationChart from '../../components/charts/PopulationChart';

const content = `
# Pakistan: A Labor Market Analysis
## Best Practice Trends in Facilitating Remittance Flows during COVID-19

Presented to:  
International Fund for Agriculture Development (IFAD),  
Financing Facility for Remittances

### Executive Summary

Pakistan's growth trajectory has been marked by periods of economic volatility. Between 2000 and 2017, 
the country experienced distinct cycles: a boom (2000-2005), followed by a bust (2006-2011), and 
subsequent recovery (2012-2017).

The country is undergoing significant demographic transition, characterized by population growth, 
a youth bulge, and gradual urbanization. While women constitute half of the population, notable 
gender disparities persist in economic participation.

Despite historical challenges with poverty, Pakistan has demonstrated remarkable progress in poverty 
reduction over the past two decades. Analysis of national poverty metrics indicates a significant 
decrease from 36.8% to 24.3% between 2010-15.

### Pakistan at a Glance

Pakistan, classified as a low-middle income country by the World Bank, is strategically located 
in South Asia, sharing borders with China, India, Afghanistan, Iran, and the Arabian Sea. As the 
world's sixth most populous nation, it hosts a population of 220.6 million, with a 2.3% growth 
rate and a male-to-female ratio of 1.06 (2020).

### Population Growth Projection

The following graph shows Pakistan's projected population growth based on the current population 
of 220.6 million and an annual growth rate of 2.3%:

### Key Economic Indicators

| Indicator | Value | Year |
|-----------|-------|------|
| GDP per capita | $1,410 | 2019 |
| GDP Growth | -0.4% | 2020 |
| Inflation Rate | 10.7% | 2020 |
| Unemployment | 4.5% | 2020 |

> **Note:** The economic indicators show the impact of COVID-19 on Pakistan's economy, 
> with negative GDP growth in 2020 for the first time in decades.

### Labor Market Analysis

1. **Employment Structure**
   - Agriculture: 39%
   - Industry: 24%
   - Services: 37%

2. **Key Challenges**
   - High informal sector employment
   - Low female labor force participation
   - Skills mismatch in the labor market

![Labor Market Distribution](https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2000)

### Policy Recommendations

1. Increase investment in human capital development
2. Promote formal sector employment
3. Enhance labor market information systems
4. Strengthen social protection mechanisms
`;

const LabourMarket = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20 min-h-screen bg-[#0A0B0F]"
    >
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8 flex justify-between items-center">
          <motion.a
            href="/papers/labour-market-pakistan-2020.pdf"
            download
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glass-button flex items-center gap-2"
          >
            <Download className="h-5 w-5" />
            Download PDF
          </motion.a>
        </div>

        <div className="space-y-8">
          <MarkdownRenderer content={content} />
          
          <div className="space-y-8 my-12">
            <PopulationChart />
            <GDPChart />
            <DebtChart />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LabourMarket;