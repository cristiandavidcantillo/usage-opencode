import { render } from "@opentui/solid";
import { FooterStatus } from "./FooterStatus";
import { UsagePanel } from "./UsagePanel";
import type { OpencodePlugin } from "./opencode";

export default function plugin(context: OpencodePlugin.PluginContext) {
  let panelId: string | null = null;
  let footerSlotId: string | null = null;

  footerSlotId = context.ui.slot({
    append: "session.footer",
    render: () => render(FooterStatus()),
  });

  function openPanel() {
    if (panelId) return;

    panelId = context.ui.panel.open({
      position: "right",
      size: 36,
      title: "Uso",
      render: () => render(UsagePanel({ sessionId: context.session?.id })),
    });
  }

  function closePanel() {
    if (panelId) {
      context.ui.panel.close(panelId);
      panelId = null;
    }
  }

  function togglePanel() {
    if (panelId) closePanel();
    else openPanel();
  }

  const keymapLayer = context.keymap.layer({
    name: "usage-plugin",
    bindings: {
      "ctrl+u": togglePanel,
    },
  });
  context.keymap.add(keymapLayer);

  return {
    destroy() {
      if (panelId) context.ui.panel.close(panelId);
      context.keymap.remove(keymapLayer);
    },
  };
}