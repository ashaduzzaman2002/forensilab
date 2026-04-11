import Link from "next/link";

export function Hero() {
  return (
    <section
      className="relative -mt-20 flex h-screen items-center bg-cover bg-center bg-no-repeat rounded-b-3xl"
      style={{
        backgroundImage:
          "url('/hero-bg.png')",
      }}
    >

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <h1 className="font-heading text-5xl font-bold uppercase leading-tight tracking-wide text-black md:text-7xl">
          FORENSIC SOLUTIONS
          <br />
          AND LAB SERVICES
        </h1>
        <p className="mt-4 max-w-xl text-lg text-black/80">
          Empowering justice through scientific analysis
        </p>
        <div className="mt-8 md:flex flex-wrap grid grid-cols-1 gap-4">
          <Link
            href="/services"
            className="rounded-full bg-primary px-8 py-3 h-12 text-sm flex items-center justify-center font-semibold uppercase tracking-wider text-primary-foreground transition hover:bg-white hover:text-primary border-2 border-primary" 
          >
            Explore Services
          </Link>
          <a
            href="#"
            className="rounded-full border-2 border-primary h-12 px-8 py-3 text-sm flex items-center justify-center font-semibold uppercase tracking-wider text-primary transition hover:bg-primary hover:text-white"
          >
            Download Catalog
          </a>
        </div>
      </div>
    </section>
  );
}
