import { FlaskConical } from "lucide-react";

export default function ProductsPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-6">
      <FlaskConical className="size-16 text-primary mb-6" />
      <h1 className="font-heading text-4xl font-bold uppercase tracking-wide">Coming Soon</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        We&apos;re preparing our product catalog. Stay tuned for forensic tools, kits, and lab equipment.
      </p>
    </div>
  );
}
