import { TextLabel } from "classification-server/types";
import { PrefixTreeBuilder } from "../src/prefixTreeBuilder";

test("build", async () => {
    const { build } = PrefixTreeBuilder();

    const labels: TextLabel[] = [
        { text: "banana", label: "fruit" },
        { text: "bananas", label: "fruit" },
        { text: "bana", label: "madeupfruit" },
        { text: "bran", label: "muffin" },
        { text: "oats", label: "grain" },
        { text: "oat", label: "grain" },
        { text: "barley", label: "grain" },
    ];

    const node = build(labels);
    expect(node.value).toBe(undefined);

    const madeUpFruitNode = node!.children
        .get("b")!
        .children.get("a")!
        .children.get("n")!
        .children.get("a")!;
    expect(madeUpFruitNode?.children.size).toBe(1);
    expect(madeUpFruitNode?.value).toBe("madeupfruit");

    const fruitNode = node!.children
        .get("b")!
        .children.get("a")!
        .children.get("n")!
        .children.get("a")!
        .children.get("n")!
        .children.get("a")!;
    expect(fruitNode?.children.size).toBe(1);
    expect(fruitNode?.value).toBe("fruit");

    const fruitsNode = fruitNode.children.get("s");
    expect(fruitsNode?.children.size).toBe(0);
    expect(fruitsNode?.value).toBe("fruit");

    const cNode = node!.children.get("c")!;
    expect(cNode).toBe(undefined);
});
