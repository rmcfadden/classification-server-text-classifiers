import { TextLabel } from "classification-server/types";

import { TrieNode } from "./trieNode";
export const TrieBuilder = () => {
    const add = (node: TrieNode, textLabel: TextLabel): TrieNode => {
        const { text, label } = textLabel;
        const { length } = text;
        return text.split("").reduce((a, c, i) => {
            const current =
                a.children.get(c) ??
                a.children
                    .set(c, {
                        labels: [],
                        children: new Map<string, TrieNode>(),
                    })
                    .get(c)!;
            current.labels = i === length - 1 ? [label, ...current.labels] : current.labels;
            return current;
        }, node);
    };
    const build = (textLabels: TextLabel[]): TrieNode =>
        textLabels.reduce(
            (a, c) => {
                add(a, c);
                return a;
            },
            { labels: [], children: new Map<string, TrieNode>() }
        );
    return { add, build };
};
