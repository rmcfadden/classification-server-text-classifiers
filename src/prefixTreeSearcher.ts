import { PrefixTreeNode } from "./prefixTreeNode";
export const PrefixTreeSearcher = () => {
    const search = (needle: string, node: PrefixTreeNode | undefined): string[] =>
        needle
            .split("")
            .reduce(
                (a, c, i) =>
                    !a || (i === needle.length - 1 && a.labels.length > 0) ? a : a.children.get(c),
                node
            )?.labels ?? [];
    return { search };
};
