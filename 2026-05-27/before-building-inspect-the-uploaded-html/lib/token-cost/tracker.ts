import type { TokenTracker } from "@/lib/agents/contracts";

export const deterministicTokenTracker: TokenTracker = {
  estimate(input) {
    const inputTokens = Math.max(200, Math.ceil(input.length / 4));
    const outputTokens = Math.ceil(inputTokens * 0.38);

    return {
      inputTokens,
      outputTokens,
      estimatedCost: Number(((inputTokens + outputTokens) * 0.000012).toFixed(4))
    };
  }
};
