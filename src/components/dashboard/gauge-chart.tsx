"use client"

import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts"

interface GaugeChartProps {
  value: number
}

export default function GaugeChart({ value }: GaugeChartProps) {
  const data = [{ name: "Confidence", value: value }]
  
  // Determine color based on value
  const hue = (1 - value / 100) * 120; // 0=red, 100=green
  const color = `hsl(${hue}, 70%, 50%)`;
  const primaryColor = 'hsl(var(--primary))';

  return (
    <div className="w-48 h-48 sm:w-56 sm:h-56">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="70%"
          outerRadius="85%"
          barSize={20}
          data={data}
          startAngle={180}
          endAngle={-180}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            background
            dataKey="value"
            cornerRadius={10}
            angleAxisId={0}
            fill={primaryColor}
          />
          <circle cx="50%" cy="50%" r="65%" fill="hsl(var(--secondary))" />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  )
}
