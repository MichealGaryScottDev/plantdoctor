import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Camera } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b bg-gradient-to-b from-background to-muted/20 py-20 sm:py-28 lg:py-32">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-sm font-medium shadow-sm">
              <Camera className="h-4 w-4 text-primary" />
              <span>AI-Powered Plant Diagnosis</span>
            </div>
          </div>
          
          <h1 className="mb-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Diagnose your plant's ailments with a photo
          </h1>
          
          <p className="mb-10 text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Snap a photo of your struggling houseplant and get an instant diagnosis with personalized care instructions to bring it back to life.
          </p>
          
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/diagnose">
              <Button size="lg" className="gap-2">
                Start Diagnosis
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>

        {/* Decorative preview panel */}
        <div className="mx-auto mt-16 max-w-4xl">
          <div className="overflow-hidden rounded-lg border bg-card shadow-lg">
            <div className="border-b bg-muted/30 px-6 py-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-destructive/60"></div>
                <div className="h-3 w-3 rounded-full bg-accent/60"></div>
                <div className="h-3 w-3 rounded-full bg-primary/60"></div>
              </div>
            </div>
            <div className="grid gap-0 md:grid-cols-2">
              <div className="flex items-center justify-center bg-muted/20 p-12">
                <div className="text-center">
                  <Camera className="mx-auto mb-4 h-16 w-16 text-muted-foreground/40" />
                  <p className="text-sm text-muted-foreground">Upload plant photo</p>
                </div>
              </div>
              <div className="space-y-4 p-8">
                <div className="space-y-2">
                  <div className="h-4 w-3/4 rounded bg-muted"></div>
                  <div className="h-4 w-full rounded bg-muted"></div>
                  <div className="h-4 w-5/6 rounded bg-muted"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-2/3 rounded bg-muted/60"></div>
                  <div className="h-3 w-full rounded bg-muted/60"></div>
                  <div className="h-3 w-4/5 rounded bg-muted/60"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}