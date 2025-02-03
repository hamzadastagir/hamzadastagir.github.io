import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';

interface LineChartProps {
  data: any[];
  xKey: string;
  yKeys: string[];
  title?: string;
  xLabel?: string;
  yLabel?: string;
}

const LineChart: React.FC<LineChartProps> = ({ data, xKey, yKeys, title, xLabel, yLabel }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const traces = yKeys.map(key => ({
      x: data.map(d => d[xKey]),
      y: data.map(d => d[key]),
      name: key.replace(/_/g, ' ').toUpperCase(),
      type: 'scatter',
      mode: 'lines+markers',
      line: {
        width: 3,
        shape: 'spline'
      },
      marker: {
        size: 8
      }
    }));

    const layout = {
      title: {
        text: title,
        font: { color: '#d1d4dc', size: 20 }
      },
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      font: { color: '#d1d4dc' },
      xaxis: {
        title: xLabel,
        gridcolor: 'rgba(255, 255, 255, 0.1)',
        tickfont: { color: '#d1d4dc' },
        zerolinecolor: 'rgba(255, 255, 255, 0.1)'
      },
      yaxis: {
        title: yLabel,
        gridcolor: 'rgba(255, 255, 255, 0.1)',
        tickfont: { color: '#d1d4dc' },
        zerolinecolor: 'rgba(255, 255, 255, 0.1)'
      },
      margin: { t: 50, r: 20, b: 40, l: 60 },
      showlegend: true,
      legend: {
        font: { color: '#d1d4dc' },
        bgcolor: 'rgba(0,0,0,0)'
      }
    };

    Plotly.newPlot(chartRef.current, traces, layout, {
      responsive: true,
      displayModeBar: false
    });

    return () => {
      if (chartRef.current) {
        Plotly.purge(chartRef.current);
      }
    };
  }, [data, xKey, yKeys, title, xLabel, yLabel]);

  return (
    <div className="glass-card p-6 my-8">
      <div ref={chartRef} className="w-full h-[400px]" />
    </div>
  );
};

export default LineChart;