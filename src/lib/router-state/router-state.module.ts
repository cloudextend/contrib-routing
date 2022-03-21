import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { routerReducer, StoreRouterConnectingModule } from "@ngrx/router-store";
import { StoreModule } from "@ngrx/store";

import { CustomSerializer } from "./custom-route-serializer";
import { STATE_KEY } from "./location-state";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forFeature(STATE_KEY, routerReducer),
        StoreRouterConnectingModule.forRoot({
            serializer: CustomSerializer,
        }),
    ],
})
export class RouterStateModule {}
