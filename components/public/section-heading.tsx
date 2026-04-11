export function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-12 text-center">
      <h2 className="font-heading text-3xl font-bold uppercase tracking-wide md:text-4xl">
        {title}
      </h2>
      <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-primary" />
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
}
