declare namespace OpencodePlugin {
  interface SessionCost {
    inputTokens: number;
    outputTokens: number;
    totalTokens: number;
    totalCost: number;
  }

  interface SessionMessage {
    id: string;
    role: "user" | "assistant" | "system";
    content: string;
    model?: string;
    cost?: SessionCost;
    toolCalls?: Array<{ name: string; input: any }>;
  }

  interface Session {
    id: string;
    cwd: string;
  }

  interface DataAPI {
    session: {
      cost(id: string): Promise<SessionCost>;
      message: {
        list(id: string): Promise<SessionMessage[]>;
      };
      subscribe(callback: (session: Session | null) => void): () => void;
    };
  }

  interface UISlotOptions {
    append: string;
    render: () => any;
  }

  interface UIPanelOptions {
    position: "left" | "right" | "top" | "bottom";
    size: number;
    title: string;
    render: () => any;
  }

  interface UIAPI {
    slot(options: UISlotOptions): string;
    panel: {
      open(options: UIPanelOptions): string;
      close(id: string): void;
    };
  }

  interface KeymapLayer {
    name: string;
    bindings: Record<string, () => void>;
  }

  interface KeymapAPI {
    layer(options: KeymapLayer): KeymapLayer;
    add(layer: KeymapLayer): void;
    remove(layer: KeymapLayer): void;
  }

  interface PluginContext {
    data: DataAPI;
    ui: UIAPI;
    keymap: KeymapAPI;
    session: Session | null;
  }

  interface Plugin {
    destroy(): void;
  }
}

declare const context: OpencodePlugin.PluginContext;

export default function plugin(context: OpencodePlugin.PluginContext): OpencodePlugin.Plugin;
export type { OpencodePlugin };