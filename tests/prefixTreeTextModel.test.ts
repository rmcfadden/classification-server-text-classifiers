import { TextLabel, LabelPredictionResult } from "classification-server/types";
import { PrefixTreeTextModel } from "../src/prefixTreeTextModel";
test("predict", async () => {
    const labels: TextLabel[] = [
        { text: "a", label: "fruit" },
        { text: "aa", label: "fruit" },
        { text: "bb", label: "vegetable" },
        { text: "ccc", label: "vegetable" },
        { text: "dd", label: "grain" },
    ];
    const { predict } = PrefixTreeTextModel(labels);
    const {
        predictions: [prediction],
    }: LabelPredictionResult = (await predict("asefd")) as LabelPredictionResult;
    const { label, probability } = prediction;
    expect(label).toBe("fruit");
    expect(probability).toBe(100);
});
