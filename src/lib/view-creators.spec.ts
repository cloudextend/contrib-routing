import { NAVIGATION_VERB } from "./navigation";
import { routify } from "./routify";
import {
    createView,
    ParameterizedNavigation,
    UnparamterizedNavigation,
    where,
} from "./view-creators";

describe("View Creation", () => {
    describe("Parameterless routes", () => {
        let unparamRoute: UnparamterizedNavigation;

        beforeEach(() => {
            unparamRoute = createView();
        });

        describe("when routified", () => {
            beforeEach(() => routify(unparamRoute, { path: "sample/path" }));

            it("can be navigated", () => {
                const nav = unparamRoute("UT");
                expect(nav.verb).toEqual(NAVIGATION_VERB);
                expect(nav.pathSegments).toEqual(["sample/path"]);
                expect(nav.params).toBeFalsy();
                expect(nav.queryParams).toBeFalsy();
            });

            it("can be invoked with query params", () => {
                const nav = unparamRoute("UT", { x: "1", y: "2" });
                expect(nav.verb).toEqual(NAVIGATION_VERB);
                expect(nav.pathSegments).toEqual(["sample/path"]);
                expect(nav.params).toBeFalsy();
                expect(nav.queryParams).toEqual({ x: "1", y: "2" });
            });
        });
    });

    describe("Paramtered routes", () => {
        let paramRoute: ParameterizedNavigation<{ a: string; b: string }>;

        beforeEach(() => {
            paramRoute = createView(where<{ a: string; b: string }>());
        });

        describe("when routified", () => {
            beforeEach(() =>
                routify(paramRoute, { path: "sample/:a/route/:b" })
            );

            it("can be navigated", () => {
                const nav = paramRoute("UT", { a: "alpha", b: "beta" });
                expect(nav.verb).toEqual(NAVIGATION_VERB);
                expect(nav.pathSegments).toEqual(["sample", "a", "route", "b"]);
                expect(nav.params).toEqual({ a: "alpha", b: "beta" });
            });

            it("can be invoked with query params", () => {
                const nav = paramRoute(
                    "UT",
                    { a: "alpha", b: "beta" },
                    { x: "1", y: "2" }
                );
                expect(nav.verb).toEqual(NAVIGATION_VERB);
                expect(nav.pathSegments).toEqual(["sample", "a", "route", "b"]);
                expect(nav.params).toEqual({ a: "alpha", b: "beta" });
                expect(nav.queryParams).toEqual({ x: "1", y: "2" });
            });
        });
    });
});
