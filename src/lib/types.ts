export type Situation = "laid-off" | "long-out" | "never" | "between" | "crisis";

export type Energy = "low" | "medium" | "high";

export type Goal = "cash-now" | "steady-job" | "both";

export type PathCategory = "today" | "this-week" | "steady" | "owed";

export type SkillId =
  | "car"
  | "bike"
  | "phone"
  | "computer"
  | "drive"
  | "lift"
  | "talk"
  | "write"
  | "design"
  | "code"
  | "language"
  | "subject"
  | "stuff"
  | "animals"
  | "overnight-ok"
  | "clean";

export type ConstraintId =
  | "no-car"
  | "no-id"
  | "anxiety"
  | "no-calls"
  | "caregiving"
  | "record"
  | "no-bank"
  | "body"
  | "low-energy"
  | "rural"
  | "under-21";

export type Profile = {
  name: string;
  situation: Situation | "";
  cash: number;
  weeklySpend: number;
  hoursPerWeek: number;
  energy: Energy;
  skills: SkillId[];
  constraints: ConstraintId[];
  goal: Goal;
  onboarded: boolean;
  createdAt: string;
};

export type PipelineKind = "gig" | "job" | "sale" | "benefit" | "other";

export type PipelineStatus = "queued" | "started" | "waiting" | "paid" | "dead";

export type PipelineItem = {
  id: string;
  title: string;
  pathId?: string;
  kind: PipelineKind;
  status: PipelineStatus;
  expected?: number;
  earned?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type LedgerEntry = {
  id: string;
  amount: number;
  source: string;
  kind: "income" | "expense";
  at: string;
};

export type DoneMove = {
  moveId: string;
  day: string;
};

export type CoachTurn = {
  id: string;
  role: "user" | "assistant";
  text: string;
  at: string;
};

export type MoneyPath = {
  id: string;
  name: string;
  kicker: string;
  summary: string;
  category: PathCategory;
  speed: string;
  pay: string;
  effort: "low" | "medium" | "high";
  firstAction: string;
  needsAny: SkillId[];
  needsAll: SkillId[];
  blockedBy: ConstraintId[];
  boostedBy: ConstraintId[];
  requirements: string[];
  steps: { title: string; body: string }[];
  script?: { title: string; body: string };
  links: { label: string; href: string }[];
  warning?: string;
  base: number;
};
