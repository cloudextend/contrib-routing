import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EffectsModule } from "@ngrx/effects";
import { ViewStateEffects } from "./view-states.effects";

@NgModule({
    imports: [CommonModule, EffectsModule.forFeature([ViewStateEffects])],
})
export class ViewsModule {}
