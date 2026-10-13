import { createSignal, createEffect, onCleanup, Accessor } from "solid-js";
import type { SessionCost, SessionMessage, UsageData } from "./types";
import type { OpencodePlugin } from "./opencode";

function getContext(): OpencodePlugin.PluginContext {
  // @ts-ignore - provided by OpenCode at runtime
  return context;
}

export function useSessionCost(sessionId: Accessor<string | undefined>) {
  const [cost, setCost] = createSignal<SessionCost>({
    inputTokens: 0,
    outputTokens: 0,
    totalTokens: 0,
    totalCost: 0,
  });

  createEffect(() => {
    const id = sessionId();
    if (!id) return;

    let cancelled = false;
    const ctx = getContext();

    async function fetchCost() {
      try {
        const data = await ctx.data.session.cost(id);
        if (!cancelled && data) {
          setCost({
            inputTokens: data.inputTokens ?? 0,
            outputTokens: data.outputTokens ?? 0,
            totalTokens: data.totalTokens ?? 0,
            totalCost: data.totalCost ?? 0,
          });
        }
      } catch {
        // Silencioso
      }
    }

    fetchCost();
    const interval = setInterval(fetchCost, 2000);

    onCleanup(() => {
      cancelled = true;
      clearInterval(interval);
    });
  }, [sessionId]);

  return cost;
}

export function useSessionMessages(sessionId: Accessor<string | undefined>) {
  const [messages, setMessages] = createSignal<SessionMessage[]>([]);

  createEffect(() => {
    const id = sessionId();
    if (!id) return;

    let cancelled = false;
    const ctx = getContext();

    async function fetchMessages() {
      try {
        const data = await ctx.data.session.message.list(id);
        if (!cancelled && Array.isArray(data)) {
          setMessages(data);
        }
      } catch {
        // Silencioso
      }
    }

    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);

    onCleanup(() => {
      cancelled = true;
      clearInterval(interval);
    });
  }, [sessionId]);

  return messages;
}

export function useUsageData(sessionId: Accessor<string | undefined>): UsageData {
  const cost = useSessionCost(sessionId);
  const messages = useSessionMessages(sessionId);

  return {
    get cost() {
      return cost();
    },
    get messageCount() {
      const msgs = messages();
      return {
        user: msgs.filter(m => m.role === "user").length,
        assistant: msgs.filter(m => m.role === "assistant").length,
      };
    },
    get tokensPerTurn() {
      const c = cost();
      const mc = messages();
      const turns = Math.max(1, mc.filter(m => m.role === "user").length);
      return Math.round(c.totalTokens / turns);
    },
  };
}