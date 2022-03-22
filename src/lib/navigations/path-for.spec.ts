import { childPathFor, parentPathFor, pathFor } from "./path-for";
import { declareRoute } from "./route-creators";

describe("pathFor", () => {
    it("returns the path configured for the given route", () => {
        const specified = declareRoute("some/path");
        expect(pathFor(specified)).toEqual("some/path");
    });

    it("rejects 'pathless' routes", () => {
        const unspecified = declareRoute();
        expect(() => pathFor(unspecified)).toThrow();
    });

    it("can replace parameters with given values", () => {
        const route = declareRoute("a/b/:c/:cd");
        expect(pathFor(route, { c: "replaced" })).toEqual("a/b/replaced/:cd");
        expect(pathFor(route, { cd: "replaced" })).toEqual("a/b/:c/replaced");
        expect(pathFor(route, { c: "1", cd: "2" })).toEqual("a/b/1/2");
    });

    describe("child", () => {
        it("returns the child path segment at the given level", () => {
            const route = declareRoute("a/b/:c/d");
            expect(childPathFor(route)).toEqual("d");
            expect(childPathFor(route, 2)).toEqual(":c/d");
            expect(childPathFor(route, 3)).toEqual("b/:c/d");
        });

        it("throws an error if a child path cannot be created", () => {
            const hasNoChild = declareRoute("nochild");
            expect(() => childPathFor(hasNoChild)).toThrow();

            const hasNoChildAtLevel = declareRoute("a/b");
            expect(() => childPathFor(hasNoChildAtLevel, 2)).toThrow();
        });

        it("rejects 'pathless' routes", () => {
            const unspecified = declareRoute();
            expect(() => pathFor(unspecified)).toThrow();
        });
    });

    describe("parent", () => {
        it("returns the child path segment at the given level", () => {
            const route = declareRoute("a/b/:c/d");
            expect(parentPathFor(route)).toEqual("a/b/:c");
            expect(parentPathFor(route, 2)).toEqual("a/b");
            expect(parentPathFor(route, 3)).toEqual("a");
        });

        it("throws an error if a parent path cannot be created", () => {
            const hasNoChild = declareRoute("nochild");
            expect(() => parentPathFor(hasNoChild)).toThrow();

            const hasNoChildAtLevel = declareRoute("a/b");
            expect(() => parentPathFor(hasNoChildAtLevel, 2)).toThrow();
        });

        it("rejects 'pathless' routes", () => {
            const unspecified = declareRoute();
            expect(() => parentPathFor(unspecified)).toThrow();
        });
    });
});
