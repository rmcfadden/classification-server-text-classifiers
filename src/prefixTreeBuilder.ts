import { TextLabel } from "classification-server/types";

import { PrefixTreeNode } from "./prefixTreeNode";
export const PrefixTreeBuilder = () => {
    const add = (node: PrefixTreeNode, textLabel: TextLabel): PrefixTreeNode => {
        const { text, label } = textLabel;
        const { length } = text;
        return text.split("").reduce((a, c, i) => {
            const current =
                a.children.get(c) ??
                a.children
                    .set(c, {
                        labels: [],
                        children: new Map<string, PrefixTreeNode>(),
                    })
                    .get(c)!;
            current.labels = i === length - 1 ? [label, ...current.labels] : current.labels;
            return current;
        }, node);
    };
    const build = (textLabels: TextLabel[]): PrefixTreeNode =>
        textLabels.reduce(
            (a, c) => {
                add(a, c);
                return a;
            },
            { labels: [], children: new Map<string, PrefixTreeNode>() }
        );
    return { add, build };
};
