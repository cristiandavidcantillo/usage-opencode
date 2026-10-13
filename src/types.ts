export interface SessionCost {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  totalCost: number;
}

export interface SessionMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  model?: string;
  cost?: SessionCost;
}

export interface UsageData {
  cost: SessionCost;
  messageCount: { user: number; assistant: number };
  tokensPerTurn: number;
}