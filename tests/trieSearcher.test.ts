import { TextLabel } from "classification-server/types";
import { TrieSearcher } from "../src/trieSearcher";
import { TrieBuilder } from "../src/trieBuilder";

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

    const { build } = TrieBuilder();
    const node = build(labels);

    const { search } = TrieSearcher();
    const foundLabels = search("banana", node);
    expect(foundLabels).toStrictEqual(["tropicalfruit", "fruit"]);

    const notFoundLabels = search("banana123", node);
    expect(notFoundLabels.length).toBe(0);
});
