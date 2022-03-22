import { ParameterizedNavigation } from "./route-creators";

export function mapPaths<T>(
    mappings: [ParameterizedNavigation<T>, string][]
): void {
    mappings.forEach(mapping => (mapping[0].path = mapping[1]));
}
