"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Camera, Upload, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface DiagnosisResult {
  diagnosis: string;
}

export function DiagnoseTool() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setResult(null);
      setError(null);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDiagnose = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await fetch("/api/diagnose", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to get diagnosis");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Unable to process diagnosis. Please try again with a clearer photo.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="mb-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Plant Diagnosis
        </h1>
        <p className="text-base leading-relaxed text-muted-foreground">
          Upload a photo of your plant to receive an AI-powered diagnosis and care recommendations
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Plant Photo</CardTitle>
            <CardDescription>
              Choose a clear, well-lit photo showing the plant's symptoms
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="plant-photo" className="sr-only">
                Plant Photo
              </Label>
              <div className="space-y-4">
                <div
                  className={cn(
                    "relative flex min-h-[280px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted/20 transition-colors hover:bg-muted/40",
                    previewUrl && "border-primary/50"
                  )}
                >
                  {previewUrl ? (
                    <div className="relative h-full w-full">
                      <img
                        src={previewUrl}
                        alt="Plant preview"
                        className="h-full w-full rounded-lg object-cover"
                      />
                    </div>
                  ) : (
                    <label
                      htmlFor="plant-photo"
                      className="flex cursor-pointer flex-col items-center justify-center p-8 text-center"
                    >
                      <Camera className="mb-4 h-12 w-12 text-muted-foreground/60" />
                      <p className="mb-2 text-sm font-medium">Click to upload</p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG or WEBP (max 10MB)
                      </p>
                    </label>
                  )}
                  <input
                    id="plant-photo"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleFileSelect}
                  />
                </div>

                {selectedFile && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>{selectedFile.name}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleDiagnose}
                disabled={!selectedFile || isLoading}
                className="flex-1"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Diagnose Plant
                  </>
                )}
              </Button>
              {(selectedFile || result) && (
                <Button onClick={handleReset} variant="outline" size="lg">
                  Reset
                </Button>
              )}
            </div>

            {error && (
              <div className="flex gap-3 rounded-lg border border-destructive/50 bg-destructive/10 p-4">
                <AlertCircle className="h-5 w-5 flex-shrink-0 text-destructive" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card>
          <CardHeader>
            <CardTitle>Diagnosis Results</CardTitle>
            <CardDescription>
              AI-generated care recommendations for your plant
            </CardDescription>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="prose prose-sm max-w-none space-y-4">
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {result.diagnosis}
                </div>
              </div>
            ) : (
              <div className="flex min-h-[280px] flex-col items-center justify-center text-center text-muted-foreground">
                <AlertCircle className="mb-4 h-12 w-12 opacity-40" />
                <p className="text-sm">
                  {isLoading
                    ? "Analyzing your plant photo..."
                    : "Upload a photo to receive diagnosis"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Disclaimer */}
      <Card className="mt-8 border-muted">
        <CardContent className="py-6">
          <p className="text-center text-xs text-muted-foreground">
            <strong>Disclaimer:</strong> AI diagnoses are informational and not guaranteed accurate. 
            For serious plant health concerns or rare species, consult a professional botanist or horticulturist.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}