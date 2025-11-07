import Link from "next/link";
import Logo from "@/components/logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-secondary/20">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <Logo className="h-10 w-10 text-primary" />
          <span className="font-bold text-2xl">TrueSight AI</span>
        </Link>
        {children}
      </div>
    </main>
  );
}
