"use client"

import { useState } from "react"
import Header from "@/components/header"
import ImageUploader from "@/components/dashboard/image-uploader"
import AnalysisResult from "@/components/dashboard/analysis-result"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

type View = "upload" | "loading" | "result"
export type AnalysisResultData = { confidence: number; imagePreviewUrl: string }

export default function DashboardPage() {
  const [view, setView] = useState<View>("upload")
  const [resultData, setResultData] = useState<AnalysisResultData | null>(null)
  const { toast } = useToast()

  const handleUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({
        variant: "destructive",
        title: "Invalid File Type",
        description: "Please upload an image file (e.g., JPEG, PNG).",
      })
      return
    }

    setView("loading")

    const formData = new FormData()
    formData.append("image", file)

    const imagePreviewUrl = URL.createObjectURL(file)

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Analysis failed. Please try again.")
      }

      const { confidence } = await response.json()

      setResultData({ confidence, imagePreviewUrl })
      setView("result")
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred."
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      })
      setView("upload")
      URL.revokeObjectURL(imagePreviewUrl)
    }
  }

  const handleReset = () => {
    if (resultData?.imagePreviewUrl) {
      URL.revokeObjectURL(resultData.imagePreviewUrl)
    }
    setView("upload")
    setResultData(null)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-2xl">
          {view === "upload" && <ImageUploader onUpload={handleUpload} />}
          {view === "loading" && (
            <div className="flex flex-col items-center justify-center text-center gap-4 py-20">
                <Loader2 className="h-12 w-12 text-primary animate-spin" />
                <h2 className="text-2xl font-semibold tracking-tight">Analyzing Image...</h2>
                <p className="text-muted-foreground">Our AI is looking for clues. This won't take long.</p>
            </div>
          )}
          {view === "result" && resultData && (
            <AnalysisResult result={resultData} onReset={handleReset} />
          )}
        </div>
      </main>
    </div>
  )
}
