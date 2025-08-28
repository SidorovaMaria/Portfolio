"use server";
const BASE_URL = process.env.BASE_URL ?? "http://localhost:3001";

async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${url}`, {
    cache: "no-store", // avoid stale data
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `${init?.method ?? "GET"} ${url} failed: ${res.status} ${res.statusText}${
        body ? ` — ${body}` : ""
      }`
    );
  }
  return (await res.json()) as T;
}

export async function getMoodEntries(): Promise<MoodEntry[]> {
  return api<MoodEntry[]>("/moodEntries");
}
export async function getUser(): Promise<User> {
  return api<User>("/user");
}

export async function getMoodEntryByDate(
  date: string
): Promise<MoodEntry | null> {
  const all = await getMoodEntries();

  return all.find((entry) => entry.createdAt.split("T")[0] === date) ?? null;
}
