import { createSignal } from "solid-js";
import { Text, Box, VStack } from "@opentui/core";
import { useUsageData } from "./hooks";

interface UsagePanelProps {
  sessionId: string | undefined;
}

export function UsagePanel({ sessionId }: UsagePanelProps) {
  const [sessionIdSignal] = createSignal(sessionId);
  const usage = useUsageData(sessionIdSignal);

  return () => {
    const { cost, messageCount, tokensPerTurn } = usage;

    return (
      <VStack style={{ padding: 1, gap: 1, width: "100%" }}>
        <Text content="Uso de la sesión" weight="bold" style={{ marginBottom: 1 }} />

        <Box style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text content="Tokens entrada:" />
          <Text content={cost.inputTokens.toLocaleString()} weight="bold" />
        </Box>

        <Box style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text content="Tokens salida:" />
          <Text content={cost.outputTokens.toLocaleString()} weight="bold" />
        </Box>

        <Box style={{ flexDirection: "row", justifyContent: "space-between", borderTop: "single", paddingTop: 1 }}>
          <Text content="Total:" />
          <Text content={cost.totalTokens.toLocaleString()} weight="bold" />
        </Box>

        <Box style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 1 }}>
          <Text content="Costo estimado:" />
          <Text content={`$${cost.totalCost.toFixed(4)}`} weight="bold" color="green" />
        </Box>

        <Box style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 1 }}>
          <Text content="Mensajes usuario:" />
          <Text content={messageCount.user.toString()} weight="bold" />
        </Box>

        <Box style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text content="Mensajes asistente:" />
          <Text content={messageCount.assistant.toString()} weight="bold" />
        </Box>

        <Box style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 1, borderTop: "single", paddingTop: 1 }}>
          <Text content="Tokens/turno:" />
          <Text content={tokensPerTurn.toLocaleString()} weight="bold" />
        </Box>
      </VStack>
    );
  };
}