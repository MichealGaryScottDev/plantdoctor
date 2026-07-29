import { Badge } from "@/components/ui/badge";
import { Upload, Scan, Heart } from "lucide-react";

const steps = [
  {
    icon: Upload,
    step: "1",
    title: "Upload Photo",
    description: "Take or select a clear photo of your plant showing visible symptoms like wilting, discoloration, or damage.",
  },
  {
    icon: Scan,
    step: "2",
    title: "AI Analysis",
    description: "Our AI examines leaf condition, color, texture, and growth patterns to identify potential issues.",
  },
  {
    icon: Heart,
    step: "3",
    title: "Get Care Plan",
    description: "Receive a detailed diagnosis with actionable steps, watering schedule, and recovery tips.",
  },
];

export function HowItWorks() {
  return (
    <section className="border-t bg-muted/20 py-20 sm:py-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-2xl font-semibold tracking-tight sm:text-3xl">
            How it works
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Three simple steps to healthier, happier plants
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((item, index) => (
            <div key={item.step} className="relative">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
                  <item.icon className="h-6 w-6" />
                </div>
                <Badge variant="outline" className="text-sm font-semibold">
                  Step {item.step}
                </Badge>
              </div>
              
              <h3 className="mb-3 text-lg font-medium">{item.title}</h3>
              <p className="leading-relaxed text-muted-foreground">
                {item.description}
              </p>

              {index < steps.length - 1 && (
                <div className="absolute -right-4 top-7 hidden h-0.5 w-8 bg-border md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}