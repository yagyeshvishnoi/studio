"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ConfidenceChartProps {
  confidence: number
}

export default function ConfidenceChart({ confidence }: ConfidenceChartProps) {
  const fakePercentage = Math.round(confidence * 100)
  const realPercentage = 100 - fakePercentage

  const data = [
    {
      name: "Analysis",
      "AI-Generated": fakePercentage,
      Real: realPercentage,
    },
  ]

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-center text-base font-medium">
          Composition
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={data}
              stackOffset="expand"
              margin={{ top: 0, right: 10, left: 10, bottom: 0 }}
            >
              <XAxis hide type="number" />
              <YAxis hide type="category" dataKey="name" />
              <Tooltip
                cursor={{ fill: "transparent" }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col space-y-1">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              AI
                            </span>
                            <span className="font-bold text-primary">
                              {payload[0].value}%
                            </span>
                          </div>
                          <div className="flex flex-col space-y-1">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Real
                            </span>
                            <span className="font-bold" style={{ color: "hsl(var(--chart-2))" }}>
                              {payload[1].value}%
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar dataKey="AI-Generated" fill="hsl(var(--primary))" stackId="a" radius={[4, 4, 4, 4]} />
              <Bar dataKey="Real" fill="hsl(var(--chart-2))" stackId="a" radius={[4, 4, 4, 4]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}