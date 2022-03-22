import { Route } from "@angular/router";
import { Creator } from "@ngrx/store";

import { EventCreator, ObjectLike, RxEvent } from "@cloudextend/contrib/events";

import { navigation, NavigationEvent } from "./navigation";
import { extractUrlSegments } from "./url-segments-extractor";

export type RouteCreator<C extends Creator = Creator> = EventCreator<C> & Route;

export function where<T extends ObjectLike>() {
    return "params" as unknown as T;
}

export interface Navigatable {
    path?: string;
}

export interface UnparamterizedNavigation
    extends Navigatable,
        RouteCreator<
            (
                source: string,
                queryParams?: Record<string, unknown>
            ) => NavigationEvent
        > {}

export interface ParameterizedNavigation<T>
    extends Navigatable,
        RouteCreator<
            (
                soure: string,
                params: T,
                queryParams?: Record<string, unknown>
            ) => NavigationEvent
        > {}

export function declareRoute(): UnparamterizedNavigation;
export function declareRoute(path: string): UnparamterizedNavigation;
export function declareRoute<ParamsType extends Record<string, unknown>>(
    paramsHint: ParamsType
): ParameterizedNavigation<ParamsType>;
export function declareRoute<ParamsType extends Record<string, unknown>>(
    path: string,
    paramsHint: ParamsType
): ParameterizedNavigation<ParamsType>;
export function declareRoute<ParamsType extends Record<string, unknown>>(
    pathOrParamsHint?: string | ParamsType,
    paramsHint?: ParamsType
): (
    source: string,
    ...params: ParamsType[]
) => RxEvent | (RxEvent & ParamsType) {
    const path =
        typeof pathOrParamsHint === "string" ? pathOrParamsHint : undefined;
    const isParameterized = paramsHint || (!path && pathOrParamsHint);

    if (!isParameterized) {
        const action = (
            source: string,
            queryParams?: Record<string, unknown>
        ) => {
            const routePath = (action as Navigatable).path || path;
            if (!routePath) {
                throw new Error("Route misconfiguration. A path is required.");
            }
            const pathSegments = [routePath];
            return navigation(source, { pathSegments, queryParams });
        };
        (action as Navigatable).path = path;
        return action;
    } else {
        const action = (
            source: string,
            params: ParamsType,
            queryParams?: Record<string, unknown>
        ) => {
            const routePath = (action as Navigatable).path || path;
            if (!routePath) {
                throw new Error("Route misconfiguration. A path is required.");
            }

            const pathSegments = extractUrlSegments(routePath);
            return navigation(source, { pathSegments, params, queryParams });
        };
        (action as Navigatable).path = path;
        return action;
    }
}
