import { useEffect, useMemo, useState } from "react";
import type { CardStatus } from "../data/reviewData";

const STORAGE_KEY = "mayuan-review-progress-v1";

export interface CardProgress {
  status: CardStatus;
  seen: number;
  updatedAt: string;
}

export type ProgressMap = Record<string, CardProgress>;

const statusRank: Record<CardStatus, number> = {
  unknown: 0,
  hard: 1,
  ok: 2,
  mastered: 3
};

function readProgress(): ProgressMap {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as ProgressMap;
  } catch {
    return {};
  }
}

export function useReviewProgress(cardIds: string[]) {
  const [progress, setProgress] = useState<ProgressMap>(() => readProgress());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const setStatus = (cardId: string, status: CardStatus) => {
    setProgress((current) => {
      const previous = current[cardId];
      return {
        ...current,
        [cardId]: {
          status,
          seen: (previous?.seen ?? 0) + 1,
          updatedAt: new Date().toISOString()
        }
      };
    });
  };

  const resetProgress = () => setProgress({});

  const stats = useMemo(() => {
    const total = cardIds.length;
    const counts: Record<CardStatus, number> = { unknown: 0, hard: 0, ok: 0, mastered: 0 };
    for (const cardId of cardIds) {
      counts[progress[cardId]?.status ?? "unknown"] += 1;
    }
    const score = cardIds.reduce((sum, cardId) => {
      return sum + statusRank[progress[cardId]?.status ?? "unknown"];
    }, 0);
    return {
      total,
      counts,
      completed: counts.ok + counts.mastered,
      masteryRate: total === 0 ? 0 : Math.round((score / (total * 3)) * 100)
    };
  }, [cardIds, progress]);

  return { progress, setStatus, resetProgress, stats };
}
