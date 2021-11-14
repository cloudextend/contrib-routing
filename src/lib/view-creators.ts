import { Creator } from "@ngrx/store";

import { EventCreator, ObjectLike, RxEvent } from "@cloudextend/contrib/events";

import { navigate, NavigationEvent } from "./navigation";
import { extractUrlSegments } from "./url-segments-extractor";
import { Route } from "@angular/router";

export type View = Route;

export type ViewCreator<C extends Creator = Creator> = EventCreator<C> & View;

export function where<T extends ObjectLike>() {
    return "params" as unknown as T;
}

export interface UnparamterizedNavigation
    extends View,
        ViewCreator<
            (
                source: string,
                queryParams?: Record<string, unknown>
            ) => NavigationEvent
        > {}

export interface ParameterizedNavigation<T>
    extends View,
        ViewCreator<
            (
                soure: string,
                params: T,
                queryParams?: Record<string, unknown>
            ) => NavigationEvent
        > {}

export function createView(): UnparamterizedNavigation;
export function createView<ParamsType extends Record<string, unknown>>(
    paramsHint: ParamsType
): ParameterizedNavigation<ParamsType>;
export function createView<ParamsType extends Record<string, unknown>>(
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
            const view = action as unknown as View;
            if (!view.path) {
                throw new Error("View misconfiguration. A path is required.");
            }
            const pathSegments = [view.path];
            return navigate(source, { pathSegments, queryParams });
        };
        return action;
    } else {
        const action = (
            source: string,
            params: ParamsType,
            queryParams?: Record<string, unknown>
        ) => {
            const view = action as unknown as View;
            if (!view.path) {
                throw new Error("View misconfiguration. A path is required.");
            }

            const pathSegments = extractUrlSegments(view.path);
            return navigate(source, { pathSegments, params, queryParams });
        };
        return action;
    }
}
