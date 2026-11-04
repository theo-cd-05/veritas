export const metadata = {
  title: "Staff access",
  robots: { index: false, follow: false },
};
export default function Page() {
  return (
    <section className="section narrow empty-card">
      <p className="eyebrow">VERITAS STAFF</p>
      <h1>Administration</h1>
      <p>
        Staff sign-in is not enabled in this foundation release. No
        administrative data is exposed.
      </p>
      <p>
        Before enabling access, configure Supabase Authentication, apply the
        reviewed migrations, provision staff roles, and implement server-side
        authorization for every management action.
      </p>
    </section>
  );
}
