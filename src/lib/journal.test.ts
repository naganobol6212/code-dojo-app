import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { computeStreak, toDateKey, type JournalEntry } from "./journal";

const FROZEN_NOW = new Date("2026-05-26T12:00:00");
const MS_DAY = 86400000;

function entryOn(date: Date, id = String(date.getTime())): JournalEntry {
  return {
    id,
    templateId: "kpt",
    createdAt: date.toISOString(),
    updatedAt: date.toISOString(),
    title: "test",
    content: { foo: "bar" },
  };
}

function dayOffset(days: number): Date {
  return new Date(FROZEN_NOW.getTime() - days * MS_DAY);
}

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(FROZEN_NOW);
});

afterEach(() => {
  vi.useRealTimers();
});

describe("toDateKey", () => {
  it("formats as YYYY-MM-DD with zero padding", () => {
    expect(toDateKey(new Date("2026-01-03"))).toBe("2026-01-03");
    expect(toDateKey(new Date("2026-12-31"))).toBe("2026-12-31");
  });
});

describe("computeStreak", () => {
  it("returns zeros for an empty list", () => {
    const s = computeStreak([]);
    expect(s.current).toBe(0);
    expect(s.longest).toBe(0);
    expect(s.totalDays).toBe(0);
    expect(s.lastDate).toBeNull();
    expect(s.todayWritten).toBe(false);
    expect(s.yesterdayWritten).toBe(false);
  });

  it("counts today + yesterday + day-before as current streak = 3", () => {
    const entries = [
      entryOn(dayOffset(0)),
      entryOn(dayOffset(1)),
      entryOn(dayOffset(2)),
    ];
    const s = computeStreak(entries);
    expect(s.current).toBe(3);
    expect(s.todayWritten).toBe(true);
    expect(s.yesterdayWritten).toBe(true);
    expect(s.totalDays).toBe(3);
  });

  it("keeps streak alive when today is missing but yesterday is written", () => {
    const entries = [entryOn(dayOffset(1)), entryOn(dayOffset(2))];
    const s = computeStreak(entries);
    expect(s.todayWritten).toBe(false);
    expect(s.yesterdayWritten).toBe(true);
    expect(s.current).toBe(2);
  });

  it("breaks streak when both today and yesterday are missing", () => {
    const entries = [entryOn(dayOffset(2)), entryOn(dayOffset(3))];
    const s = computeStreak(entries);
    expect(s.todayWritten).toBe(false);
    expect(s.yesterdayWritten).toBe(false);
    expect(s.current).toBe(0);
  });

  it("dedupes multiple entries on the same day", () => {
    // 3 entries today should count as 1 day, not 3
    const entries = [
      entryOn(dayOffset(0), "a"),
      entryOn(dayOffset(0), "b"),
      entryOn(dayOffset(0), "c"),
    ];
    const s = computeStreak(entries);
    expect(s.current).toBe(1);
    expect(s.totalDays).toBe(1);
  });

  it("computes longest correctly across a gap", () => {
    // 2026-05-26 (今日) と 2026-05-25 = current 2
    // 過去に 2026-05-15 〜 2026-05-19 (5 日連続) のブロックがあり、 longest はそちら
    const entries = [
      entryOn(dayOffset(0)),
      entryOn(dayOffset(1)),
      entryOn(dayOffset(7)),
      entryOn(dayOffset(8)),
      entryOn(dayOffset(9)),
      entryOn(dayOffset(10)),
      entryOn(dayOffset(11)),
    ];
    const s = computeStreak(entries);
    expect(s.current).toBe(2);
    expect(s.longest).toBe(5);
  });

  it("reports lastDate as the most recent entry's date key", () => {
    const entries = [entryOn(dayOffset(0)), entryOn(dayOffset(5))];
    const s = computeStreak(entries);
    expect(s.lastDate).toBe(toDateKey(FROZEN_NOW));
  });
});
