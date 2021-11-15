import { Creator } from "@ngrx/store";

import { EventCreator, ObjectLike, RxEvent } from "@cloudextend/contrib/events";

import { navigate, NavigationEvent } from "./navigation";
import { extractUrlSegments } from "./url-segments-extractor";
import { Route } from "@angular/router";

export type RouteCreator<C extends Creator = Creator> = EventCreator<C> & Route;

export function takes<T extends ObjectLike>() {
    return "params" as unknown as T;
}

export interface UnparamterizedNavigation
    extends Route,
        RouteCreator<
            (
                source: string,
                queryParams?: Record<string, unknown>
            ) => NavigationEvent
        > {}

export interface ParameterizedNavigation<T>
    extends Route,
        RouteCreator<
            (
                soure: string,
                params: T,
                queryParams?: Record<string, unknown>
            ) => NavigationEvent
        > {}

export function declareRoute(): UnparamterizedNavigation;
export function declareRoute<ParamsType extends Record<string, unknown>>(
    paramsHint: ParamsType
): ParameterizedNavigation<ParamsType>;
export function declareRoute<ParamsType extends Record<string, unknown>>(
    ...params: ParamsType[]
): (
    source: string,
    ...params: ParamsType[]
) => RxEvent | (RxEvent & ParamsType) {
    if (!params || !params.length) {
        const action = (
            source: string,
            queryParams?: Record<string, unknown>
        ) => {
            const Route = action as unknown as Route;
            if (!Route.path) {
                throw new Error("Route misconfiguration. A path is required.");
            }
            const pathSegments = [Route.path];
            return navigate(source, { pathSegments, queryParams });
        };
        return action;
    } else {
        const action = (
            source: string,
            params: ParamsType,
            queryParams?: Record<string, unknown>
        ) => {
            const Route = action as unknown as Route;
            if (!Route.path) {
                throw new Error("Route misconfiguration. A path is required.");
            }

            const pathSegments = extractUrlSegments(Route.path);
            return navigate(source, { pathSegments, params, queryParams });
        };
        return action;
    }
}
