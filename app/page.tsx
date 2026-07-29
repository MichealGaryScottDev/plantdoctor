"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Leaf, Stethoscope, AlertCircle, CheckCircle2 } from "lucide-react";

interface Diagnosis {
  condition: string;
  severity: string;
  treatment: string;
  timestamp: string;
}

export default function HomePage() {
  const [plantType, setPlantType] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDiagnose = async () => {
    if (!symptoms.trim()) {
      setError("Please describe the plant symptoms");
      return;
    }

    setLoading(true);
    setError("");
    setDiagnosis(null);

    try {
      const res = await fetch("/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms, plantType }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to diagnose");
      }

      setDiagnosis(data.diagnosis);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to diagnose");
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "mild":
        return "bg-green-100 text-green-800 border-green-200";
      case "moderate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "severe":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-zinc-100 text-zinc-800 border-zinc-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <h1 className="text-xl font-semibold text-zinc-900">PlantDoctor</h1>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
            <Stethoscope className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4">
            AI-Powered Plant Health Diagnosis
          </h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            Describe your plant's symptoms and get instant expert diagnosis with
            treatment recommendations
          </p>
        </div>

        {/* Diagnosis Form */}
        <Card className="p-6 md:p-8 mb-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="plantType">Plant Type (Optional)</Label>
              <Input
                id="plantType"
                placeholder="e.g., Tomato, Rose, Fiddle Leaf Fig"
                value={plantType}
                onChange={(e) => setPlantType(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="symptoms">
                Symptoms <span className="text-red-600">*</span>
              </Label>
              <Textarea
                id="symptoms"
                placeholder="Describe what you're seeing: yellowing leaves, spots, wilting, pests, etc."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                disabled={loading}
                rows={6}
                className="resize-none"
              />
            </div>

            {error && (
              <div className="flex items-start gap-2 p-4 bg-red-50 border border-red-200 rounded-md">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <Button
              onClick={handleDiagnose}
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading ? "Analyzing..." : "Diagnose Plant"}
            </Button>
          </div>
        </Card>

        {/* Diagnosis Result */}
        {diagnosis && (
          <Card className="p-6 md:p-8 border-green-200 bg-green-50/50">
            <div className="flex items-start gap-3 mb-4">
              <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-zinc-900 mb-1">
                  Diagnosis Complete
                </h3>
                <p className="text-sm text-zinc-600">
                  {new Date(diagnosis.timestamp).toLocaleString()}
                </p>
              </div>
              <Badge className={getSeverityColor(diagnosis.severity)}>
                {diagnosis.severity}
              </Badge>
            </div>

            <Separator className="my-4" />

            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap text-zinc-700 leading-relaxed">
                {diagnosis.treatment}
              </div>
            </div>
          </Card>
        )}

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4 mt-12">
          <Card className="p-6">
            <h3 className="font-semibold text-zinc-900 mb-2">Expert AI</h3>
            <p className="text-sm text-zinc-600">
              Powered by advanced AI trained on plant pathology
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold text-zinc-900 mb-2">Instant Results</h3>
            <p className="text-sm text-zinc-600">
              Get diagnosis and treatment plans in seconds
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold text-zinc-900 mb-2">Free to Use</h3>
            <p className="text-sm text-zinc-600">
              No sign-up required, completely free forever
            </p>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-zinc-600">
          <p>PlantDoctor &mdash; AI-powered plant health diagnosis</p>
        </div>
      </footer>
    </div>
  );
}