"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="section empty-card">
      <h1>Something went wrong</h1>
      <p>Please try again in a moment.</p>
      <button onClick={reset} className="button primary">
        Try again
      </button>
    </section>
  );
}
