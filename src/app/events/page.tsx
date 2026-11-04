import { Calendar } from "@/components/calendar";
export const metadata = { title: "Events" };
export default function Page() {
  return (
    <>
      <div className="page-heading">
        <p className="eyebrow">COME TOGETHER AT VERITAS</p>
        <h1>Our community calendar</h1>
        <p>
          Thoughtful conversations, shared traditions, and opportunities to grow
          in faith.
        </p>
      </div>
      <section className="section narrow">
        <Calendar />
      </section>
    </>
  );
}
