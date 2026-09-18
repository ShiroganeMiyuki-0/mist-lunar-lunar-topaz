import { createFileRoute } from "@tanstack/react-router";
import { Onboarding } from "@/components/onboarding";

export const Route = createFileRoute("/start")({
  component: Onboarding,
});
