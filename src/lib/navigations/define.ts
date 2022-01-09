import { Route } from "@angular/router";

export function define(Route: Route, targetAttributes: Route): Route {
    Object.assign(Route, targetAttributes);
    return Route;
}
