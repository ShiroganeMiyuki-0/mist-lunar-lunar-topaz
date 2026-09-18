import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { askCoach } from "@/lib/ask-coach";
import { localCoach } from "@/lib/local-coach";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/_app/coach")({
  component: CoachPage,
});

const STARTERS = [
  "What should I do in the next four hours?",
  "I have a laptop, no car, and low energy. What pays?",
  "Be honest. How do I get to an easy life from here?",
];

function CoachPage() {
  const profile = useAppStore((s) => s.profile);
  const pipeline = useAppStore((s) => s.pipeline);
  const coach = useAppStore((s) => s.coach);
  const addCoach = useAppStore((s) => s.addCoach);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);

  async function send(question: string) {
    const q = question.trim();
    if (!q || busy) return;
    setBusy(true);
    setText("");
    addCoach({ role: "user", text: q });
    try {
      const res = await askCoach({ data: { profile, pipeline, question: q } });
      addCoach({ role: "assistant", text: res.text });
    } catch {
      addCoach({ role: "assistant", text: localCoach(profile, pipeline) });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-[70dvh] flex-col">
      <p className="text-xs tracking-[0.2em] text-subtle uppercase">Coach</p>
      <h1 className="mt-3 font-display text-4xl tracking-tight">No pep talk.</h1>
      <p className="mt-3 max-w-md text-muted">
        Ask for the next four hours, not a five-year plan. If the live coach is out, you still get a local one built from your paths.
      </p>

      <div className="mt-8 flex flex-1 flex-col gap-4">
        {coach.length === 0 ? (
          <div className="rounded-3xl bg-surface p-5">
            <p className="font-display text-xl tracking-tight">Start here</p>
            <div className="mt-4 space-y-2">
              {STARTERS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="block w-full rounded-2xl px-4 py-3 text-left text-sm hairline hairline-hover"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <ul className="space-y-4">
            {coach.map((t) => (
              <li
                key={t.id}
                className={
                  t.role === "user"
                    ? "ml-8 rounded-2xl bg-raised px-4 py-3 text-sm"
                    : "mr-4 whitespace-pre-wrap rounded-2xl bg-surface px-4 py-3 text-sm leading-relaxed"
                }
              >
                {t.text}
              </li>
            ))}
            {busy ? <li className="text-sm text-subtle">Thinking in specifics…</li> : null}
          </ul>
        )}
      </div>

      <form
        className="sticky bottom-20 mt-6 space-y-2 bg-bg pt-2 md:bottom-0"
        onSubmit={(e) => {
          e.preventDefault();
          void send(text);
        }}
      >
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="I have four hours and a closet full of junk…"
        />
        <Button className="w-full" type="submit" disabled={busy || !text.trim()}>
          Ask
        </Button>
      </form>
    </div>
  );
}
