import Link from "next/link"
import Logo from "./logo"
import UserNav from "./user-nav"
import { ThemeToggle } from "./theme-toggle"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Logo className="h-6 w-6 text-primary" />
          <span className="hidden font-bold sm:inline-block">
            TrueSight AI
          </span>
        </Link>
        <div className="flex flex-1 items-center justify-end gap-2">
            <ThemeToggle />
            <UserNav />
        </div>
      </div>
    </header>
  )
}
