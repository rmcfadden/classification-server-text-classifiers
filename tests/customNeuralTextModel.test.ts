import { TextLabel, DataSet } from "classification-server/types";
import { CustomNeuralTextModel } from "../src/customNeuralTextModel";

test("train and predict", async () => {
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
    const { train } = CustomNeuralTextModel([]);
    const { predict } = await train({
        items: labels,
        name: "fruit",
        dataTypes: "textLabel",
    } as DataSet);
});
