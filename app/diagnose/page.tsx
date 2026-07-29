import { Header } from "@/components/header";
import { DiagnoseTool } from "@/components/diagnose-tool";
import { Footer } from "@/components/footer";

export default function DiagnosePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-16">
        <DiagnoseTool />
      </main>
      <Footer />
    </div>
  );
}