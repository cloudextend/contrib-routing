import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";

import { NavigationEffects } from "./navigation.effects";

@NgModule({
    imports: [CommonModule, EffectsModule.forFeature([NavigationEffects])],
})
export class RxRoutingModule {}
