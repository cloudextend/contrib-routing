import { Route } from "@angular/router";
import { View } from "./view-creators";

export function routify(view: View, targetAttributes: Route): Route {
    Object.assign(view, targetAttributes);
    return view;
}
