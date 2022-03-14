import { declareRoute, ParameterizedNavigation } from "./route-creators";

export function pathFor<T extends Record<string, string>>(
    route: ParameterizedNavigation<T>,
    params?: T
): string | undefined {
    const path = route.path;
    if (!path || !path.length) {
        throw new Error("Route has not been provided with a path");
    }

    if (!params) {
        return path;
    } else {
        let parameterizedPath = path;
        Object.keys(params).forEach(key => {
            const regex = new RegExp(`(:${key})\\b`);
            parameterizedPath = parameterizedPath.replace(regex, params[key]);
        });
        return parameterizedPath;
    }
}

export function childPathFor(
    route: ReturnType<typeof declareRoute>,
    levels: number = 1
): string | undefined {
    const path = route.path;
    if (!path || !path.length) {
        throw new Error(
            "Route has not been provided with a path to be used as a child route."
        );
    }

    const startIndex = findSeperatorIndex(path, levels);
    return path.substring(startIndex + 1);
}

export function parentPathFor(
    route: ReturnType<typeof declareRoute>,
    childLevels: number = 1
) {
    const path = route.path;
    if (!path || !path.length) {
        throw new Error(
            "Route has not been provided with a path to be used as a child route."
        );
    }

    const endIndex = findSeperatorIndex(path, childLevels);
    return path.substring(0, endIndex);
}

function findSeperatorIndex(path: string, levels: number) {
    let index = path.length;
    let levelsFound = 0;
    while (levelsFound < levels && index > 0) {
        index = path.lastIndexOf("/", index - 1);
        if (index > 0) levelsFound++;
    }

    if (!levelsFound || levelsFound < levels) {
        throw new Error(
            `Route '${path}' is not configured with a path` +
                `that can be used as a child route with ${levels} level(s).`
        );
    }
    return index;
}
