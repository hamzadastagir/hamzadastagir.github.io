import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';

interface ScatterChartProps {
  data: any[];
  xKey: string;
  yKey: string;
  sizeKey?: string;
  labelKey?: string;
  title?: string;
  xLabel?: string;
  yLabel?: string;
  colors?: string[];
}

const ScatterChart: React.FC<ScatterChartProps> = ({
  data,
  xKey,
  yKey,
  sizeKey,
  labelKey,
  title,
  xLabel,
  yLabel,
  colors = ['#64CCC5']
}) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const trace = {
      x: data.map(d => d[xKey]),
      y: data.map(d => d[yKey]),
      mode: 'markers+text',
      type: 'scatter',
      text: labelKey ? data.map(d => d[labelKey]) : undefined,
      textposition: 'top center',
      marker: {
        size: sizeKey ? data.map(d => d[sizeKey] * 50) : 12,
        color: colors[0],
        line: {
          color: '#2A2F42',
          width: 1
        },
        opacity: 0.8
      },
      textfont: {
        color: '#d1d4dc'
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
      xaxis: {
        title: xLabel,
        gridcolor: 'rgba(255, 255, 255, 0.1)',
        tickfont: { color: '#d1d4dc' },
        zerolinecolor: 'rgba(255, 255, 255, 0.1)',
        tickformat: ',.0f'
      },
      yaxis: {
        title: yLabel,
        gridcolor: 'rgba(255, 255, 255, 0.1)',
        tickfont: { color: '#d1d4dc' },
        zerolinecolor: 'rgba(255, 255, 255, 0.1)',
        tickformat: '.0%'
      },
      margin: { t: 50, r: 20, b: 40, l: 60 },
      showlegend: false
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
  }, [data, xKey, yKey, sizeKey, labelKey, title, xLabel, yLabel, colors]);

  return (
    <div className="glass-card p-6 my-8">
      <div ref={chartRef} className="w-full h-[400px]" />
    </div>
  );
};

export default ScatterChart;