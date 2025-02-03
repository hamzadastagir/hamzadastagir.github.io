import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';

const GDPChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const trace1 = {
        x: ['2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'],
        y: [0.4, 2.6, 3.6, 3.8, 3.7, 4.1, 4.1, 4.6, 5.2, 5.5, 1.9, -0.4],
        name: 'Real GDP growth (%)',
        type: 'scatter',
        mode: 'lines',
        line: { color: '#FF3366', width: 3 },
        fill: 'tozeroy',
        fillcolor: 'rgba(255, 51, 102, 0.1)'
      };

      const trace2 = {
        x: ['2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'],
        y: [-0.6, 0.4, 1.5, 1.6, 1.5, 2.0, 2.0, 2.5, 3.1, 3.7, -1.0, -2.8],
        name: 'GDP per capita growth (%)',
        type: 'scatter',
        mode: 'lines',
        line: { color: '#36A2FF', width: 3 },
        fill: 'tozeroy',
        fillcolor: 'rgba(54, 162, 255, 0.1)'
      };

      const layout = {
        title: {
          text: 'GDP Growth Trends',
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

      Plotly.newPlot(chartRef.current, [trace1, trace2], layout, {
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

export default GDPChart;