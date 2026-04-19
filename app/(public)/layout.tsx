import { Suspense } from "react";
import { Navbar } from "@/components/public/navbar";
import { Footer } from "@/components/public/footer";
import { FooterSkeleton } from "@/components/public/skeletons";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-[60px] overflow-x-hidden">{children}</main>
      <Suspense fallback={<FooterSkeleton />}><Footer /></Suspense>
    </>
  );
}
