'use client';

import { useDimensions } from '@/lib/hooks/use-dimensions';
import * as d3 from 'd3';
import React, { useRef } from 'react';

type RadarProps = {
  width: number;
  height: number;
  data: {
    [key: string]: number | string;
  }; // Expecting an array with a single item
  variables: string[];
  color?: string; // Optional color prop
};

// Utility function to split camelCase or PascalCase into separate words
const splitCamelCase = (text: string) =>
  text.replace(/([a-z])([A-Z])/g, '$1 $2');

const polarToCartesian = (angle: number, radius: number) => {
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);
  return { x, y };
};

const adjustOpacity = (color: string, opacity: number) => {
  const rgb = d3.color(color);
  if (rgb) {
    rgb.opacity = opacity;
    return rgb.toString();
  }
  return color;
};

const RadarChart: React.FC<RadarProps> = ({
  width,
  height,
  data,
  variables,
  color = 'rgb(14, 165, 233)', // Default to blue
}) => {
  const margin = 50;
  const outerRadius = Math.min(width, height) / 2 - margin;
  const center = { x: width / 2, y: height / 2 };

  const angleScale = d3
    .scaleBand()
    .domain(variables)
    .range([0, 2 * Math.PI]);

  const radiusScale = d3.scaleLinear().domain([0, 10]).range([0, outerRadius]);

  // Generate lines for axes
  const lines = variables.map((variable) => {
    const angle = angleScale(variable) ?? 0;
    const { x, y } = polarToCartesian(angle, outerRadius);
    return (
      <line
        key={variable}
        x1={center.x}
        y1={center.y}
        x2={center.x + x}
        y2={center.y - y}
        stroke="#ccc"
        strokeWidth={1}
      />
    );
  });

  // Generate concentric grid circles
  const gridCircles = [2, 4, 6, 8, 10].map((value) => (
    <circle
      key={value}
      cx={center.x}
      cy={center.y}
      r={radiusScale(value)}
      fill="none"
      stroke="#ccc"
      strokeWidth={1}
    />
  ));

  // Generate the path for the single layer of data
  const pathData = variables.map((variable) => {
    const angle = angleScale(variable) ?? 0;
    const radius = radiusScale(data[variable] as number);
    const { x, y } = polarToCartesian(angle, radius);
    return `${center.x + x},${center.y - y}`;
  });

  const path = (
    <path
      d={`M${pathData.join('L')}Z`}
      fill={adjustOpacity(color, 0.4)} // Fill with lower opacity
      stroke={color} // Line with full opacity
      strokeWidth={2}
    />
  );

  // Generate labels for each variable
  const labels = variables.map((variable) => {
    const angle = angleScale(variable) ?? 0;
    const { x, y } = polarToCartesian(angle, outerRadius + 20);
    return (
      <text
        key={variable}
        x={center.x + x}
        y={center.y - y}
        textAnchor="middle"
        fill="white"
        alignmentBaseline="middle"
        fontWeight="bold"
        className="text-xs">
        {splitCamelCase(variable)}
      </text>
    );
  });

  return (
    <svg width={width} height={height} className="overflow-visible">
      {gridCircles}
      {lines}
      {path}
      {labels}
    </svg>
  );
};

type ResponsiveRadarChartProps = {
  data: {
    [key: string]: number | string;
  };
  variables: string[];
  color?: string;
};

const ResponsiveRadarChart: React.FC<ResponsiveRadarChartProps> = ({
  data,
  variables,
  color,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width, height } = useDimensions(containerRef);

  // Ensure we don't render the chart until we have valid dimensions
  const chartSize = Math.min(width, height);

  console.log(chartSize);

  return (
    <div
      ref={containerRef}
      className="relative flex aspect-square h-full w-full max-w-[610px] items-center justify-center md:aspect-auto">
      <div className="absolute">
        <RadarChart
          width={chartSize}
          height={chartSize}
          data={data}
          variables={variables}
          color={color}
        />
      </div>
    </div>
  );
};

export default ResponsiveRadarChart;
