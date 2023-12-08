import { TrieNode } from "./trieNode";
export const TrieSearcher = () => {
    const search = (needle: string, node: TrieNode | undefined): string[] =>
        needle
            .split("")
            .reduce(
                (a, c, i) =>
                    !a || (i === needle.length - 1 && a.labels.length > 0) ? a : a.children.get(c),
                node
            )?.labels ?? [];
    return { search };
};
