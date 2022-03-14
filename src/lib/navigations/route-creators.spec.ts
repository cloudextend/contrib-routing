import { NAVIGATION_VERB } from "./navigation";
import { declareRoute, where } from "./route-creators";

describe("Route Creation", () => {
    describe("Parameterless routes", () => {
        const unparamRoute = declareRoute("sample/path");

        describe("when routified", () => {
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
        const paramRoute = declareRoute(
            "sample/:a/route/:b",
            where<{ a: string; b: string }>()
        );

        describe("when routified", () => {
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
