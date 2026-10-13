import { Accessor } from "solid-js";
import type { SessionCost, SessionMessage, UsageData } from "./types";
export declare function useSessionCost(sessionId: Accessor<string | undefined>): Accessor<SessionCost>;
export declare function useSessionMessages(sessionId: Accessor<string | undefined>): Accessor<SessionMessage[]>;
export declare function useUsageData(sessionId: Accessor<string | undefined>): UsageData;
//# sourceMappingURL=hooks.d.ts.map