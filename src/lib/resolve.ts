import { Route } from "@angular/router";

export function resolve(Route: Route, targetAttributes: Route): Route {
    Object.assign(Route, targetAttributes);
    return Route;
}
