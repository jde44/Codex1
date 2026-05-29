import type { ModelRouter } from "@/lib/agents/contracts";

export const deterministicModelRouter: ModelRouter = {
  recommend(input) {
    if (input.risk === "High" && input.complexity === "High") {
      return {
        provider: "openai",
        modelTier: "frontier",
        reason: "High-risk, high-complexity reasoning requires stronger model performance and human review.",
        humanReviewRequired: true
      };
    }

    if (input.dataSensitivity === "High") {
      return {
        provider: "local",
        modelTier: "local",
        reason: "Sensitive data should be processed through a controlled local or private endpoint when feasible.",
        humanReviewRequired: true
      };
    }

    return {
      provider: "anthropic",
      modelTier: "mid-tier",
      reason: "Moderate complexity can be handled by a lower-cost governed model route.",
      humanReviewRequired: input.risk !== "Low"
    };
  }
};
