import { Route } from "@angular/router";

export function definse(Route: Route, targetAttributes: Route): Route {
    Object.assign(Route, targetAttributes);
    return Route;
}
