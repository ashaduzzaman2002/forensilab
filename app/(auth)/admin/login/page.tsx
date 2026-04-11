export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm space-y-4 p-6">
        <h1 className="text-2xl font-bold text-center">Admin Login</h1>
        <form className="space-y-4">
          <input type="email" placeholder="Email" className="w-full rounded border px-3 py-2" />
          <input type="password" placeholder="Password" className="w-full rounded border px-3 py-2" />
          <button type="submit" className="w-full rounded bg-primary px-3 py-2 text-primary-foreground">Sign In</button>
        </form>
      </div>
    </div>
  );
}
