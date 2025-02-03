import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';

interface PieChartProps {
  data: any[];
  labelKey: string;
  valueKey: string;
  title?: string;
  donut?: boolean;
}

const PieChart: React.FC<PieChartProps> = ({ 
  data, 
  labelKey, 
  valueKey, 
  title,
  donut = false 
}) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const trace = {
      labels: data.map(d => d[labelKey]),
      values: data.map(d => d[valueKey]),
      type: 'pie',
      hole: donut ? 0.6 : 0,
      textinfo: 'label+percent',
      textposition: 'outside',
      marker: {
        line: {
          color: '#2A2F42',
          width: 2
        }
      }
    };

    const layout = {
      title: {
        text: title,
        font: { color: '#d1d4dc', size: 20 }
      },
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      font: { color: '#d1d4dc' },
      margin: { t: 50, r: 20, b: 20, l: 20 },
      showlegend: true,
      legend: {
        font: { color: '#d1d4dc' },
        bgcolor: 'rgba(0,0,0,0)'
      }
    };

    Plotly.newPlot(chartRef.current, [trace], layout, {
      responsive: true,
      displayModeBar: false
    });

    return () => {
      if (chartRef.current) {
        Plotly.purge(chartRef.current);
      }
    };
  }, [data, labelKey, valueKey, title, donut]);

  return (
    <div className="glass-card p-6 my-8">
      <div ref={chartRef} className="w-full h-[400px]" />
    </div>
  );
};

export default PieChart;