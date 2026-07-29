import { Leaf } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t py-10">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold">PlantDoctor</span>
          </div>
          
          <p className="text-center text-sm text-muted-foreground">
            Diagnose your plant's ailments with a photo. Built by Autodev.
          </p>
        </div>
        
        <Separator className="my-6" />
        
        <div className="text-center text-xs text-muted-foreground">
          <p>AI diagnoses are informational and not guaranteed accurate. Consult a professional for serious plant health concerns.</p>
        </div>
      </div>
    </footer>
  );
}