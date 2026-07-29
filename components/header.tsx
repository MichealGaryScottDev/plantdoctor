import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Leaf className="h-7 w-7 text-primary" />
          <span className="text-lg font-semibold tracking-tight">PlantDoctor</span>
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link 
            href="/" 
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>
          <Link href="/diagnose">
            <Button size="sm">Diagnose Now</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}