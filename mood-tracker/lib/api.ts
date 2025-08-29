"use server";

import { b } from "motion/react-m";
import { revalidatePath } from "next/cache";
import { nanoid } from "zod";

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

export async function createNewMoodEntry(
  data: Omit<MoodEntry, "id" | "createdAt">
): Promise<MoodEntry> {
  revalidatePath("/");

  return api<MoodEntry>("/moodEntries", {
    method: "POST",
    body: JSON.stringify({
      createdAt: new Date().toISOString(),
      ...data,
    }),
  });
}

export const deleteMoodById = async (id: number): Promise<void> => {
  await api<void>(`/moodEntries`, {
    method: "DELETE",
  });
};

export async function getMoodinFives(): Promise<MoodEntry[][] | null> {
  const all = await getMoodEntries();
  const sorted = all.sort((a, b) =>
    a.createdAt > b.createdAt ? -1 : b.createdAt > a.createdAt ? 1 : 0
  );
  if (sorted.length < 5) {
    return null;
  } else if (sorted.length < 10) {
    return [sorted.slice(0, 5)];
  } else {
    return [sorted.slice(0, 5), sorted.slice(5, 10)];
  }
}
