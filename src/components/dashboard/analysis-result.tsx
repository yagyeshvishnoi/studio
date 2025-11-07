"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { AnalysisResultData } from "@/app/dashboard/page"
import GaugeChart from "./gauge-chart"
import { ArrowLeft } from "lucide-react"

interface AnalysisResultProps {
  result: AnalysisResultData
  onReset: () => void
}

export default function AnalysisResult({ result, onReset }: AnalysisResultProps) {
  const percentage = Math.round(result.confidence * 100)

  return (
    <div className="w-full animate-in fade-in-0 zoom-in-95 duration-500">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Analysis Complete</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-square w-full max-w-sm mx-auto rounded-lg overflow-hidden border">
             <Image
              src={result.imagePreviewUrl}
              alt="Analyzed image"
              fill
              className="object-contain"
              data-ai-hint="analyzed image"
            />
          </div>
          <div className="flex flex-col items-center text-center">
            <GaugeChart value={percentage} />
            <p className="text-4xl font-bold tracking-tighter mt-4">
              {percentage}%
            </p>
            <p className="text-lg text-muted-foreground">
              Likely AI-Generated
            </p>
            <blockquote className="mt-6 border-l-2 pl-6 italic">
              "{result.feedback}"
            </blockquote>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={onReset} className="w-full sm:w-auto mx-auto" variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Analyze Another Image
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
