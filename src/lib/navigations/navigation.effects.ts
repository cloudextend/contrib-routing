import { Injectable } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { Actions, createEffect } from "@ngrx/effects";
import { from } from "rxjs";
import { switchMap } from "rxjs/operators";

import { onEvent } from "@cloudextend/contrib/events";

import { navigation } from "./navigation";

@Injectable()
export class NavigationEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly router: Router
    ) {}

    navigateOnEvent$ = createEffect(
        () =>
            this.actions$.pipe(
                onEvent(navigation),
                switchMap(event => {
                    const { params, queryParams } = event;
                    const pathParams = event.pathSegments;
                    const navExtras = queryParams
                        ? ({ queryParams } as NavigationExtras)
                        : undefined;

                    let result: Promise<boolean>;
                    if (params && pathParams) {
                        const urlSegments = pathParams.map(seg =>
                            params[seg] ? params[seg] : seg
                        );
                        result = this.router.navigate(urlSegments, navExtras);
                    } else {
                        result = this.router.navigate(pathParams, navExtras);
                    }
                    return from(result);
                })
            ),
        { dispatch: false }
    );
}
