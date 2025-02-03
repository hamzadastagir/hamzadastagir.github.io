import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

interface ChartProps {
  type: 'line' | 'bar' | 'pie' | 'scatter';
  data: any[];
  config: {
    xKey?: string;
    yKey?: string;
    yKeys?: string[];
    labelKey?: string;
    valueKey?: string;
    sizeKey?: string;
    title?: string;
    xLabel?: string;
    yLabel?: string;
    stacked?: boolean;
    donut?: boolean;
    colors?: string[];
  };
}

const defaultColors = ['#64CCC5', '#176B87', '#053B50', '#EEEEEE'];

const ChartRenderer: React.FC<ChartProps> = ({ type, data, config }) => {
  if (!data || data.length === 0) {
    return (
      <div className="p-4 bg-red-900/20 border border-red-500/20 rounded-lg">
        <p className="text-red-400 text-sm">No data available for chart</p>
      </div>
    );
  }

  const colors = config.colors || defaultColors;

  const renderTitle = () => {
    if (!config.title) return null;
    return (
      <div className="text-center mb-4">
        <h3 className="text-lg font-medium text-white">{config.title}</h3>
      </div>
    );
  };

  const commonProps = {
    width: 500,
    height: 300,
    margin: { top: 20, right: 30, left: 20, bottom: 25 }
  };

  const axisStyle = {
    tick: { fill: '#d1d4dc' },
    axisLine: { stroke: '#2A2F42' },
    label: { fill: '#d1d4dc', fontSize: 12 }
  };

  const tooltipStyle = {
    contentStyle: { 
      backgroundColor: '#1F2937', 
      border: '1px solid #2A2F42',
      borderRadius: '4px',
      padding: '8px'
    },
    labelStyle: { color: '#d1d4dc' },
    itemStyle: { color: '#d1d4dc' }
  };

  const ChartComponent = () => {
    switch (type) {
      case 'line':
        return (
          <LineChart data={data} {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2A2F42" />
            <XAxis
              dataKey={config.xKey}
              {...axisStyle}
              label={{ value: config.xLabel, position: 'bottom', offset: 15 }}
            />
            <YAxis
              {...axisStyle}
              label={{ value: config.yLabel, angle: -90, position: 'insideLeft', offset: 10 }}
            />
            <Tooltip {...tooltipStyle} />
            <Legend />
            {config.yKeys?.map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
                dot={{ fill: colors[index % colors.length] }}
              />
            ))}
          </LineChart>
        );

      case 'bar':
        return (
          <BarChart data={data} {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2A2F42" />
            <XAxis
              dataKey={config.xKey}
              {...axisStyle}
              label={{ value: config.xLabel, position: 'bottom', offset: 15 }}
            />
            <YAxis
              {...axisStyle}
              label={{ value: config.yLabel, angle: -90, position: 'insideLeft', offset: 10 }}
            />
            <Tooltip {...tooltipStyle} />
            <Legend />
            {config.yKeys?.map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                fill={colors[index % colors.length]}
                stackId={config.stacked ? 'stack' : undefined}
              />
            ))}
          </BarChart>
        );

      case 'pie':
        return (
          <PieChart {...commonProps}>
            <Pie
              data={data}
              dataKey={config.valueKey}
              nameKey={config.labelKey}
              cx="50%"
              cy="50%"
              innerRadius={config.donut ? '60%' : 0}
              outerRadius={config.donut ? '80%' : '80%'}
              label
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip {...tooltipStyle} />
            <Legend />
          </PieChart>
        );

      case 'scatter':
        return (
          <ScatterChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2A2F42" />
            <XAxis
              dataKey={config.xKey}
              {...axisStyle}
              label={{ value: config.xLabel, position: 'bottom', offset: 15 }}
            />
            <YAxis
              dataKey={config.yKey}
              {...axisStyle}
              label={{ value: config.yLabel, angle: -90, position: 'insideLeft', offset: 10 }}
            />
            <Tooltip {...tooltipStyle} />
            <Legend />
            <Scatter
              name={config.title}
              data={data}
              fill={colors[0]}
            />
          </ScatterChart>
        );

      default:
        return (
          <div className="p-4 bg-yellow-900/20 border border-yellow-500/20 rounded-lg">
            <p className="text-yellow-400 text-sm">Unsupported chart type: {type}</p>
          </div>
        );
    }
  };

  return (
    <div className="w-full">
      {renderTitle()}
      <div className="w-full h-[400px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <ChartComponent />
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartRenderer;