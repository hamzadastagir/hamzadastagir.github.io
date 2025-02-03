import React, { useEffect, useRef } from 'react';

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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !data || data.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size based on container
    const container = containerRef.current;
    if (container) {
      const { width, height } = container.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set default styles
    ctx.font = '12px sans-serif';
    ctx.textBaseline = 'middle';
    ctx.lineWidth = 2;

    // Calculate padding and chart area
    const padding = {
      top: 40,
      right: 30,
      bottom: 40,
      left: 60
    };

    const chartArea = {
      x: padding.left,
      y: padding.top,
      width: canvas.width - padding.left - padding.right,
      height: canvas.height - padding.top - padding.bottom
    };

    // Draw title
    if (config.title) {
      ctx.font = 'bold 16px sans-serif';
      ctx.fillStyle = '#d1d4dc';
      ctx.textAlign = 'center';
      ctx.fillText(config.title, canvas.width / 2, padding.top / 2);
    }

    const colors = config.colors || defaultColors;

    switch (type) {
      case 'scatter':
        drawScatterPlot(ctx, data, config, chartArea, colors);
        break;
      case 'line':
        drawLineChart(ctx, data, config, chartArea, colors);
        break;
      case 'bar':
        drawBarChart(ctx, data, config, chartArea, colors);
        break;
      case 'pie':
        drawPieChart(ctx, data, config, chartArea, colors);
        break;
    }

    // Add event listeners for interactivity
    let hoveredPoint: any = null;

    canvas.addEventListener('mousemove', (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Find nearest data point
      hoveredPoint = findNearestPoint(x, y, data, config, chartArea);
      
      // Redraw chart with hover effects
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      switch (type) {
        case 'scatter':
          drawScatterPlot(ctx, data, config, chartArea, colors, hoveredPoint);
          break;
        case 'line':
          drawLineChart(ctx, data, config, chartArea, colors, hoveredPoint);
          break;
        case 'bar':
          drawBarChart(ctx, data, config, chartArea, colors, hoveredPoint);
          break;
        case 'pie':
          drawPieChart(ctx, data, config, chartArea, colors, hoveredPoint);
          break;
      }
    });

  }, [type, data, config]);

  if (!data || data.length === 0) {
    return (
      <div className="p-4 bg-red-900/20 border border-red-500/20 rounded-lg">
        <p className="text-red-400 text-sm">No data available for chart</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-[400px] relative">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: 'transparent' }}
      />
    </div>
  );
};

// Helper functions for drawing different chart types
function drawScatterPlot(ctx: CanvasRenderingContext2D, data: any[], config: any, chartArea: any, colors: string[], hoveredPoint?: any) {
  const xValues = data.map(d => d[config.xKey]);
  const yValues = data.map(d => d[config.yKey]);
  
  const xScale = createLinearScale(Math.min(...xValues), Math.max(...xValues), chartArea.x, chartArea.x + chartArea.width);
  const yScale = createLinearScale(Math.min(...yValues), Math.max(...yValues), chartArea.y + chartArea.height, chartArea.y);

  // Draw axes
  drawAxes(ctx, chartArea, config.xLabel, config.yLabel);

  // Draw points
  data.forEach((point, i) => {
    const x = xScale(point[config.xKey]);
    const y = yScale(point[config.yKey]);
    const size = config.sizeKey ? point[config.sizeKey] * 20 : 8;

    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = hoveredPoint === point ? '#ffffff' : colors[0];
    ctx.fill();
    ctx.strokeStyle = '#2A2F42';
    ctx.stroke();

    if (hoveredPoint === point) {
      drawTooltip(ctx, x, y, [
        `${config.xLabel}: ${point[config.xKey]}`,
        `${config.yLabel}: ${point[config.yKey]}`,
        config.sizeKey && `${config.sizeKey}: ${point[config.sizeKey]}`
      ].filter(Boolean));
    }
  });
}

function drawLineChart(ctx: CanvasRenderingContext2D, data: any[], config: any, chartArea: any, colors: string[], hoveredPoint?: any) {
  const xValues = data.map(d => d[config.xKey]);
  const yKeys = config.yKeys || [config.yKey];
  
  const yValues = data.flatMap(d => yKeys.map(key => d[key]));
  const yScale = createLinearScale(Math.min(...yValues), Math.max(...yValues), chartArea.y + chartArea.height, chartArea.y);

  // Draw axes
  drawAxes(ctx, chartArea, config.xLabel, config.yLabel);

  // Draw lines
  yKeys.forEach((key, i) => {
    ctx.beginPath();
    ctx.strokeStyle = colors[i % colors.length];
    
    data.forEach((point, j) => {
      const x = chartArea.x + (j * chartArea.width) / (data.length - 1);
      const y = yScale(point[key]);
      
      if (j === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.stroke();
  });
}

function drawBarChart(ctx: CanvasRenderingContext2D, data: any[], config: any, chartArea: any, colors: string[], hoveredPoint?: any) {
  const xValues = data.map(d => d[config.xKey]);
  const yKeys = config.yKeys || [config.yKey];
  
  const yValues = data.flatMap(d => yKeys.map(key => d[key]));
  const yScale = createLinearScale(0, Math.max(...yValues), chartArea.y + chartArea.height, chartArea.y);

  // Draw axes
  drawAxes(ctx, chartArea, config.xLabel, config.yLabel);

  const barWidth = (chartArea.width / data.length) / (config.stacked ? 1 : yKeys.length) * 0.8;
  
  data.forEach((point, i) => {
    let y0 = chartArea.y + chartArea.height;
    
    yKeys.forEach((key, j) => {
      const value = point[key];
      const x = config.stacked
        ? chartArea.x + (i * chartArea.width) / data.length
        : chartArea.x + (i * chartArea.width) / data.length + (j * barWidth);
      const y = yScale(value);
      const height = y0 - y;

      ctx.fillStyle = colors[j % colors.length];
      ctx.fillRect(x, y, barWidth, height);

      if (config.stacked) {
        y0 = y;
      }
    });
  });
}

function drawPieChart(ctx: CanvasRenderingContext2D, data: any[], config: any, chartArea: any, colors: string[], hoveredPoint?: any) {
  const total = data.reduce((sum, d) => sum + d[config.valueKey], 0);
  const centerX = chartArea.x + chartArea.width / 2;
  const centerY = chartArea.y + chartArea.height / 2;
  const radius = Math.min(chartArea.width, chartArea.height) / 2;

  let startAngle = 0;
  
  data.forEach((slice, i) => {
    const value = slice[config.valueKey];
    const angle = (value / total) * Math.PI * 2;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, startAngle + angle);
    ctx.closePath();

    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();
    ctx.strokeStyle = '#2A2F42';
    ctx.stroke();

    // Draw label
    const labelAngle = startAngle + angle / 2;
    const labelRadius = radius * (config.donut ? 0.7 : 0.6);
    const labelX = centerX + Math.cos(labelAngle) * labelRadius;
    const labelY = centerY + Math.sin(labelAngle) * labelRadius;

    ctx.fillStyle = '#d1d4dc';
    ctx.textAlign = 'center';
    ctx.fillText(slice[config.labelKey], labelX, labelY);

    startAngle += angle;
  });

  if (config.donut) {
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.5, 0, Math.PI * 2);
    ctx.fillStyle = '#0A0B0F';
    ctx.fill();
    ctx.strokeStyle = '#2A2F42';
    ctx.stroke();
  }
}

// Helper functions
function createLinearScale(domainMin: number, domainMax: number, rangeMin: number, rangeMax: number) {
  return (value: number) => {
    return rangeMin + (value - domainMin) * (rangeMax - rangeMin) / (domainMax - domainMin);
  };
}

function drawAxes(ctx: CanvasRenderingContext2D, chartArea: any, xLabel?: string, yLabel?: string) {
  ctx.strokeStyle = '#2A2F42';
  ctx.beginPath();
  
  // X-axis
  ctx.moveTo(chartArea.x, chartArea.y + chartArea.height);
  ctx.lineTo(chartArea.x + chartArea.width, chartArea.y + chartArea.height);
  
  // Y-axis
  ctx.moveTo(chartArea.x, chartArea.y);
  ctx.lineTo(chartArea.x, chartArea.y + chartArea.height);
  
  ctx.stroke();

  // Labels
  if (xLabel) {
    ctx.fillStyle = '#d1d4dc';
    ctx.textAlign = 'center';
    ctx.fillText(xLabel, chartArea.x + chartArea.width / 2, chartArea.y + chartArea.height + 25);
  }

  if (yLabel) {
    ctx.save();
    ctx.translate(chartArea.x - 40, chartArea.y + chartArea.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = '#d1d4dc';
    ctx.textAlign = 'center';
    ctx.fillText(yLabel, 0, 0);
    ctx.restore();
  }
}

function drawTooltip(ctx: CanvasRenderingContext2D, x: number, y: number, lines: string[]) {
  const padding = 8;
  const lineHeight = 20;
  const width = Math.max(...lines.map(line => ctx.measureText(line).width)) + padding * 2;
  const height = lines.length * lineHeight + padding * 2;

  ctx.fillStyle = '#1F2937';
  ctx.strokeStyle = '#2A2F42';
  ctx.beginPath();
  ctx.roundRect(x + 10, y - height / 2, width, height, 4);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#d1d4dc';
  ctx.textAlign = 'left';
  lines.forEach((line, i) => {
    ctx.fillText(line, x + 10 + padding, y - height / 2 + padding + i * lineHeight + lineHeight / 2);
  });
}

function findNearestPoint(mouseX: number, mouseY: number, data: any[], config: any, chartArea: any) {
  // Implement point detection based on chart type and data
  // Return the nearest data point or null
  return null;
}

export default ChartRenderer;