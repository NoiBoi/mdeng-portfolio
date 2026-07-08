import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6">
      <div className="max-w-xl text-center">
        <p className="section-label">404</p>
        <h1 className="mt-4 text-4xl font-semibold text-paper">Project not found</h1>
        <p className="mt-4 text-muted">This project page is not available in the local portfolio data.</p>
        <Link href="/#work" className="mt-8 inline-flex button-primary">
          Back to selected work
        </Link>
      </div>
    </main>
  );
}
