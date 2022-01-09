import { RouterReducerState } from "@ngrx/router-store";
import { createFeatureSelector, createSelector } from "@ngrx/store";

import { LocationState, STATE_KEY } from "./location-state";

export { LocationState };
export * from "./custom-route-serializer";
export * from "./router-state.module";

export interface State {
    [STATE_KEY]: RouterReducerState<LocationState>;
}

export const selectRouterState =
    createFeatureSelector<RouterReducerState<LocationState>>(STATE_KEY);

export const selectCurrentUrl = createSelector(
    selectRouterState,
    routerState => routerState?.state?.url
);

export const selectRouteData = createSelector(
    selectRouterState,
    routerState => routerState.state?.data
);

export const selectQueryParams = createSelector(
    selectRouterState,
    routerState => routerState.state.queryParams
);
