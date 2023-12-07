import { TextLabel, LabelPredictionResult } from "classification-server/types";
import { PrefixTreeTextModel } from "../src/prefixTreeTextModel";
test("predict", async () => {
    const labels: TextLabel[] = [
        { text: "apple", label: "fruit" },
        { text: "orange", label: "fruit" },
        { text: "beans", label: "vegetable" },
        { text: "sprouts", label: "vegetable" },
        { text: "oats", label: "grain" },
        { text: "barley", label: "grain" },
    ];
    const { predict } = PrefixTreeTextModel(labels);
    const {
        predictions: [prediction],
    }: LabelPredictionResult = (await predict("apple")) as LabelPredictionResult;
    const { label, probability } = prediction;
    expect(label).toBe("fruit");
    expect(probability).toBe(100);
});
