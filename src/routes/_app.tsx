import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Onboarding } from "@/components/onboarding";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/_app")({
  component: Guarded,
});

function Guarded() {
  const onboarded = useAppStore((s) => s.profile.onboarded);
  if (!onboarded) return <Onboarding />;
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
