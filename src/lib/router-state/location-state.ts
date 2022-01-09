import { Data, Params } from "@angular/router";

export const STATE_KEY = "routing";

export interface LocationState {
    data?: Data;
    params: Params;
    queryParams: Params;
    url: string;
}
