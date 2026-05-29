export type AgentOutput<TJson = Record<string, unknown>> = {
  json: TJson;
  summary: string;
  assumptions: string[];
  requiredEvidence: string[];
  riskFlags: string[];
  recommendedNextAction: string;
  tokenUsageEstimate: {
    inputTokens: number;
    outputTokens: number;
    estimatedCost: number;
  };
  modelRecommendation: string;
};

export interface ModelProvider {
  id: string;
  name: string;
  run(prompt: string, options: { model: string; maxTokens: number }): Promise<string>;
}

export interface ModelRouter {
  recommend(input: {
    workload: string;
    risk: string;
    complexity: string;
    dataSensitivity: string;
    budgetRemaining: number;
  }): {
    provider: "openai" | "anthropic" | "bedrock" | "vertex" | "local";
    modelTier: "frontier" | "mid-tier" | "lightweight" | "local";
    reason: string;
    humanReviewRequired: boolean;
  };
}

export interface TokenTracker {
  estimate(input: string): { inputTokens: number; outputTokens: number; estimatedCost: number };
}

export interface AgentRunner<TInput, TOutput> {
  run(input: TInput): Promise<AgentOutput<TOutput>>;
}

export interface EvalRunner {
  runEval(workflowId: string, testName: string): Promise<AgentOutput>;
}

export interface GovernanceMemoGenerator {
  generate(workflowId: string): Promise<{ markdown: string; html: string }>;
}
