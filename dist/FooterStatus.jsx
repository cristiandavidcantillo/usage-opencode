import { createSignal, onMount, onCleanup } from "solid-js";
import { Text, Box } from "@opentui/core";
import { useUsageData } from "./hooks";
function getContext() {
    // @ts-ignore - provided by OpenCode at runtime
    return context;
}
export function FooterStatus() {
    const [sessionId, setSessionId] = createSignal();
    onMount(() => {
        const ctx = getContext();
        const unsubscribe = ctx.data.session.subscribe((session) => {
            setSessionId(session?.id);
        });
        onCleanup(unsubscribe);
    });
    const usage = useUsageData(sessionId);
    return () => {
        const { cost, messageCount, tokensPerTurn } = usage;
        const totalMessages = messageCount.user + messageCount.assistant;
        return (<Box style={{ flexDirection: "row", gap: 1, paddingX: 1 }}>
        <Text content={`$${cost.totalCost.toFixed(4)}`}/>
        <Text content="|"/>
        <Text content={`${cost.totalTokens.toLocaleString()} tok`}/>
        <Text content="|"/>
        <Text content={`${totalMessages} msg`}/>
        <Text content="|"/>
        <Text content={`${tokensPerTurn.toLocaleString()} tok/turn`}/>
      </Box>);
    };
}
