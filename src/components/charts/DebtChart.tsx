import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';

const DebtChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const trace = {
        x: ['2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'],
        y: [58.7, 60.1, 58.9, 63.3, 64.0, 63.5, 63.3, 67.6, 71.7, 75.9, 87.2, 87.6],
        name: 'Government Debt (% of GDP)',
        type: 'scatter',
        mode: 'lines',
        line: { color: '#FF3366', width: 3 },
        fill: 'tozeroy',
        fillcolor: 'rgba(255, 51, 102, 0.1)'
      };

      const layout = {
        title: {
          text: 'Government Debt Trends',
          font: { color: '#d1d4dc' }
        },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        showlegend: true,
        legend: {
          font: { color: '#d1d4dc' }
        },
        xaxis: {
          gridcolor: 'rgba(255, 255, 255, 0.1)',
          tickfont: { color: '#d1d4dc' }
        },
        yaxis: {
          gridcolor: 'rgba(255, 255, 255, 0.1)',
          tickfont: { color: '#d1d4dc' },
          zerolinecolor: 'rgba(255, 255, 255, 0.1)'
        },
        margin: { t: 50, r: 20, b: 40, l: 60 }
      };

      Plotly.newPlot(chartRef.current, [trace], layout, {
        responsive: true,
        displayModeBar: false
      });
    }

    return () => {
      if (chartRef.current) {
        Plotly.purge(chartRef.current);
      }
    };
  }, []);

  return (
    <div className="glass-card p-6">
      <div ref={chartRef} className="w-full h-[400px]" />
    </div>
  );
};

export default DebtChart;