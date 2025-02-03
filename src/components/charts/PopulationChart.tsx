import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';

const PopulationChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      // Generate 10 years of population data
      const years = Array.from({ length: 10 }, (_, i) => 2020 + i);
      const population = years.map((_, i) => {
        const basePopulation = 220.6; // 2020 population in millions
        return basePopulation * Math.pow(1.023, i); // 2.3% annual growth
      });

      const trace = {
        x: years,
        y: population,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Population Growth',
        line: {
          color: '#64CCC5',
          width: 3
        },
        marker: {
          color: '#64CCC5',
          size: 8
        },
        fill: 'tozeroy',
        fillcolor: 'rgba(100, 204, 197, 0.1)'
      };

      const layout = {
        title: {
          text: 'Pakistan Population Growth Projection',
          font: { color: '#d1d4dc' }
        },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        showlegend: false,
        xaxis: {
          title: 'Year',
          gridcolor: 'rgba(255, 255, 255, 0.1)',
          tickfont: { color: '#d1d4dc' },
          tickmode: 'linear'
        },
        yaxis: {
          title: 'Population (Millions)',
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
    <div className="my-8">
      <div ref={chartRef} className="w-full h-[400px]" />
    </div>
  );
};

export default PopulationChart;