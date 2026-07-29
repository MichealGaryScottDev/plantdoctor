import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, CheckCircle2, Droplets, BookOpen } from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "Photo Diagnosis",
    description: "Upload a clear photo of your plant showing symptoms and receive an AI-powered analysis of potential issues.",
  },
  {
    icon: CheckCircle2,
    title: "Care Checklist",
    description: "Get a personalized action plan with step-by-step instructions to address your plant's specific needs.",
  },
  {
    icon: Droplets,
    title: "Watering Schedule",
    description: "Receive tailored watering recommendations based on your plant's condition and environmental factors.",
  },
  {
    icon: BookOpen,
    title: "Save Plant Profiles",
    description: "Keep track of your plant diagnoses and care history to monitor progress over time.",
  },
];

export function Features() {
  return (
    <section className="py-20 sm:py-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-2xl font-semibold tracking-tight sm:text-3xl">
            Everything you need to revive your plants
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Professional plant care guidance at your fingertips, powered by advanced AI vision technology.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}