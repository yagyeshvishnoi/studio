import Link from "next/link"
import { Bot, ShieldCheck, Sparkles, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Logo from "@/components/logo"

const features = [
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: "Advanced AI Detection",
    description: "Our sophisticated algorithm analyzes images to detect subtle artifacts and patterns left by AI image generators.",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: "Instant Authenticity Score",
    description: "Receive a clear, percentage-based confidence score indicating the likelihood of an image being AI-generated.",
  },
  {
    icon: <Sparkles className="h-8 w-8 text-primary" />,
    title: "Intuitive & Fast",
    description: "A seamless, responsive user experience allows for quick uploads and near-instant analysis on any device.",
  },
]

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-8 w-8 text-primary" />
          <span className="font-bold text-xl">TrueSight AI</span>
        </Link>
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 sm:py-32">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter">
              Unmasking Reality, One Pixel at a Time
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground">
              TrueSight AI is a powerful tool to distinguish between genuine photographs and AI-generated images. Upload an image and gain clarity in seconds.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/dashboard">Get Started Free <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-secondary/30 py-20 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold">Why TrueSight AI?</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                In an age of digital deception, our tool provides the confidence you need to verify visual content.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="bg-background/50 border-border/50">
                  <CardHeader className="flex flex-col items-center text-center">
                    {feature.icon}
                    <CardTitle className="mt-4">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center text-muted-foreground">
                    <p>{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} TrueSight AI. All rights reserved.</p>
      </footer>
    </div>
  )
}
