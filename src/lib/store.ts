import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CoachTurn, DoneMove, LedgerEntry, PipelineItem, PipelineStatus, Profile } from "./types";
import { uid } from "./utils";

const emptyProfile: Profile = {
  name: "",
  situation: "",
  cash: 0,
  weeklySpend: 0,
  hoursPerWeek: 15,
  energy: "medium",
  skills: ["phone"],
  constraints: [],
  goal: "both",
  onboarded: false,
  createdAt: "",
};

type State = {
  profile: Profile;
  pipeline: PipelineItem[];
  ledger: LedgerEntry[];
  done: DoneMove[];
  coach: CoachTurn[];
  completeOnboarding: (profile: Omit<Profile, "onboarded" | "createdAt">) => void;
  patchProfile: (patch: Partial<Profile>) => void;
  addPipeline: (item: Omit<PipelineItem, "id" | "createdAt" | "updatedAt" | "status"> & { status?: PipelineStatus }) => void;
  setPipelineStatus: (id: string, status: PipelineStatus, earned?: number) => void;
  removePipeline: (id: string) => void;
  addLedger: (entry: Omit<LedgerEntry, "id" | "at"> & { at?: string }) => void;
  markMove: (moveId: string, day: string) => void;
  addCoach: (turn: Omit<CoachTurn, "id" | "at">) => void;
  reset: () => void;
};

export const useAppStore = create<State>()(
  persist(
    (set, get) => ({
      profile: emptyProfile,
      pipeline: [],
      ledger: [],
      done: [],
      coach: [],
      completeOnboarding: (profile) =>
        set({
          profile: {
            ...profile,
            onboarded: true,
            createdAt: new Date().toISOString(),
          },
        }),
      patchProfile: (patch) => set({ profile: { ...get().profile, ...patch } }),
      addPipeline: (item) => {
        const now = new Date().toISOString();
        set({
          pipeline: [
            {
              ...item,
              status: item.status ?? "queued",
              id: uid(),
              createdAt: now,
              updatedAt: now,
            },
            ...get().pipeline,
          ],
        });
      },
      setPipelineStatus: (id, status, earned) => {
        const now = new Date().toISOString();
        const current = get().pipeline.find((p) => p.id === id);
        set({
          pipeline: get().pipeline.map((p) =>
            p.id === id
              ? { ...p, status, earned: earned ?? p.earned, updatedAt: now }
              : p,
          ),
        });
        if (status === "paid" && earned && earned > 0) {
          const already = get().ledger.some(
            (l) => l.source === `pipeline:${id}` && l.kind === "income",
          );
          if (!already) {
            get().addLedger({
              amount: earned,
              source: current?.title ? `Paid: ${current.title}` : "Pipeline payout",
              kind: "income",
            });
          }
        }
      },
      removePipeline: (id) => set({ pipeline: get().pipeline.filter((p) => p.id !== id) }),
      addLedger: ({ amount, source, kind, at }) => {
        const entry: LedgerEntry = {
          id: uid(),
          amount,
          source,
          kind,
          at: at ?? new Date().toISOString(),
        };
        const cashDelta = kind === "income" ? amount : -amount;
        set({
          ledger: [entry, ...get().ledger],
          profile: {
            ...get().profile,
            cash: Math.max(0, Math.round((get().profile.cash + cashDelta) * 100) / 100),
          },
        });
      },
      markMove: (moveId, day) => {
        if (get().done.some((d) => d.moveId === moveId && d.day === day)) return;
        set({ done: [...get().done, { moveId, day }] });
      },
      addCoach: (turn) =>
        set({
          coach: [...get().coach, { ...turn, id: uid(), at: new Date().toISOString() }].slice(-40),
        }),
      reset: () =>
        set({
          profile: emptyProfile,
          pipeline: [],
          ledger: [],
          done: [],
          coach: [],
        }),
    }),
    { name: "easy-street-v1" },
  ),
);
