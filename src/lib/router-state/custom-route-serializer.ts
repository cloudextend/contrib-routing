import { RouterStateSnapshot } from "@angular/router";
import { RouterStateSerializer } from "@ngrx/router-store";

import { LocationState } from "./location-state";

export class CustomSerializer implements RouterStateSerializer<LocationState> {
    serialize(routerState: RouterStateSnapshot): LocationState {
        let route = routerState.root;

        // Get to the leaf node:
        while (route.firstChild) {
            route = route.firstChild;
        }

        const {
            url,
            root: { queryParams },
        } = routerState;

        const { data, params } = route;

        return { data, params, queryParams, url };
    }
}
