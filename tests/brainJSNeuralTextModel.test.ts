import { TextLabel } from "classification-server/types";
import { BrainJSNeuralTextModel } from "../src/brainJSNeuralTextModel";

test("predict", async () => {
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
    const { predict } = BrainJSNeuralTextModel(labels);
});
