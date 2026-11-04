"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
export function Calendar() {
  const [month, setMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [selected, setSelected] = useState<number | null>(null);
  const start = month.getDay(),
    days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  function move(n: number) {
    setMonth(new Date(month.getFullYear(), month.getMonth() + n, 1));
    setSelected(null);
  }
  return (
    <>
      <div className="calendar">
        <div className="calendar-heading">
          <button aria-label="Previous month" onClick={() => move(-1)}>
            <ChevronLeft />
          </button>
          <h2 aria-live="polite">
            {month.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <button aria-label="Next month" onClick={() => move(1)}>
            <ChevronRight />
          </button>
        </div>
        <div className="calendar-grid">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div className="weekday" key={d}>
              {d}
            </div>
          ))}
          {Array.from({ length: Math.ceil((start + days) / 7) * 7 }, (_, i) => {
            const day = i - start + 1;
            return day < 1 || day > days ? (
              <div className="blank-day" key={i} />
            ) : (
              <button
                key={i}
                className={selected === day ? "selected-day" : ""}
                aria-pressed={selected === day}
                aria-label={new Date(
                  month.getFullYear(),
                  month.getMonth(),
                  day,
                ).toLocaleDateString("en-US", { dateStyle: "full" })}
                onClick={() => setSelected(day)}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
      <div className="empty-card" aria-live="polite">
        <h3>
          {selected
            ? `Events for ${month.toLocaleDateString("en-US", { month: "long" })} ${selected}`
            : "Upcoming gatherings"}
        </h3>
        <p>
          No confirmed events have been published
          {selected ? " for this date" : " yet"}. Please check back soon.
        </p>
        <small>
          Dates display in your device’s local calendar. Published events will
          include the store’s confirmed time zone.
        </small>
      </div>
    </>
  );
}
