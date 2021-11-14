import { args, declareEvent, RxEvent } from "@cloudextend/contrib/events";

export const NAVIGATION_VERB = "common:routes:Navigation";

export interface NavigationEvent extends RxEvent {
    verb: "contrib:views:Navigation";
    pathSegments: unknown[];
    params?: Record<string, unknown>;
    queryParams?: Record<string, unknown>;
}

export const navigate = declareEvent(
    NAVIGATION_VERB,
    args<{
        pathSegments: string[];
        params?: Record<string, unknown>;
        queryParams?: Record<string, unknown>;
    }>()
);
