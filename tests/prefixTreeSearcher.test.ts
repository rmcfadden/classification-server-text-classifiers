import { TextLabel } from "classification-server/types";
import { PrefixTreeSearcher } from "../src/prefixTreeSearcher";
import { PrefixTreeBuilder } from "../src/prefixTreeBuilder";

test("search", async () => {
    const labels: TextLabel[] = [
        { text: "banana", label: "fruit" },
        { text: "banana", label: "tropicalfruit" },
        { text: "bananas", label: "fruit" },
        { text: "bana", label: "madeupfruit" },
        { text: "bran", label: "muffin" },
        { text: "oats", label: "grain" },
        { text: "oat", label: "grain" },
        { text: "barley", label: "grain" },
    ];

    const { build } = PrefixTreeBuilder();
    const node = build(labels);

    const { search } = PrefixTreeSearcher();
    const foundLabels = search("banana", node);
    expect(foundLabels).toStrictEqual(["tropicalfruit", "fruit"]);

    const notFoundLabels = search("banana123", node);
    expect(notFoundLabels.length).toBe(0);
});
