"use client"

import { useState, useRef, type DragEvent } from "react"
import { UploadCloud } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageUploaderProps {
  onUpload: (file: File) => void
}

export default function ImageUploader({ onUpload }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      onUpload(files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      onUpload(files[0])
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-full p-8 sm:p-12 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300",
        isDragging ? "border-primary bg-primary/10" : "border-border hover:border-primary/50 hover:bg-secondary/50"
      )}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
      role="button"
      aria-label="Image Uploader"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleClick()}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg"
        className="hidden"
        onChange={handleFileSelect}
      />
      <div className="flex flex-col items-center justify-center text-center gap-4">
        <UploadCloud className="w-16 h-16 text-muted-foreground transition-colors" />
        <h3 className="text-xl font-semibold tracking-tight">
          Drag & drop an image here
        </h3>
        <p className="text-muted-foreground">
          or click to browse from your device
        </p>
        <p className="text-xs text-muted-foreground/70">
          Supports: PNG, JPG, JPEG
        </p>
      </div>
    </div>
  )
}
