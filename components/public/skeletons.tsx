export function SectionSkeleton({ className = "bg-white", rows = 4 }: { className?: string; rows?: number }) {
  return (
    <section className={`${className} px-[60px] py-[100px] max-md:px-6 max-md:py-[72px] animate-pulse`}>
      <div className="mb-14 flex flex-wrap items-end justify-between gap-5">
        <div>
          <div className="mb-3.5 h-3 w-24 rounded bg-gray-200" />
          <div className="mt-3 h-12 w-64 rounded bg-gray-200" />
          <div className="mt-2 h-12 w-48 rounded bg-gray-200" />
        </div>
        <div className="h-12 w-60 rounded bg-gray-200 max-md:hidden" />
      </div>
      <div className="grid grid-cols-4 gap-[2px] max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex min-h-[200px] flex-col justify-between bg-gray-50 p-7">
            <div className="h-12 w-12 rounded-lg bg-gray-200" />
            <div>
              <div className="h-4 w-32 rounded bg-gray-200" />
              <div className="mt-2 h-3 w-full rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function HeroSkeleton() {
  return (
    <section className="relative -mt-[60px] flex h-screen items-center px-[60px] pb-[100px] pt-[120px] max-md:px-6 max-md:pb-[90px] animate-pulse"
      style={{ background: "linear-gradient(135deg, #0A0A1A 0%, #0A1A40 45%, #0557EE 100%)" }}
    >
      <div>
        <div className="mb-7 h-7 w-64 rounded-full bg-white/10" />
        <div className="h-16 w-96 rounded bg-white/10" />
        <div className="mt-3 h-16 w-72 rounded bg-white/10" />
        <div className="mt-5 h-5 w-80 rounded bg-white/10" />
        <div className="mt-2 h-5 w-64 rounded bg-white/10" />
        <div className="mt-9 flex gap-3">
          <div className="h-12 w-36 rounded bg-white/15" />
          <div className="h-12 w-40 rounded border border-white/20 bg-transparent" />
        </div>
      </div>
    </section>
  );
}

export function CardGridSkeleton({ className = "bg-white", count = 3 }: { className?: string; count?: number }) {
  return (
    <section className={`${className} px-[60px] py-[100px] max-md:px-6 max-md:py-[72px] animate-pulse`}>
      <div className="mb-14">
        <div className="mb-3.5 h-3 w-24 rounded bg-gray-200" />
        <div className="mt-3 h-12 w-64 rounded bg-gray-200" />
      </div>
      <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-lg border border-gray-100">
            <div className="h-[180px] bg-gray-200" />
            <div className="p-6 space-y-3">
              <div className="h-4 w-3/4 rounded bg-gray-200" />
              <div className="h-3 w-full rounded bg-gray-100" />
              <div className="h-3 w-2/3 rounded bg-gray-100" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FooterSkeleton() {
  return (
    <footer className="bg-primary text-white animate-pulse">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="h-5 w-28 rounded bg-white/10" />
              <div className="h-3 w-full rounded bg-white/5" />
              <div className="h-3 w-3/4 rounded bg-white/5" />
              <div className="h-3 w-1/2 rounded bg-white/5" />
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
