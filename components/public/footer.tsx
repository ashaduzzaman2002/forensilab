export function Footer() {
  return (
    <footer className="border-t bg-background py-8">
      <div className="mx-auto max-w-7xl px-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} ForensiLabs. All rights reserved.
      </div>
    </footer>
  );
}
