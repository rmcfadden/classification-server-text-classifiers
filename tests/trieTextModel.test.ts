import {
    TextLabel,
    LabelPredictionResult,
    LabelClassifyResponse,
} from "classification-server/types";
import { TrieTextModel } from "../src/trieTextModel";
test("predict", async () => {
    const labels: TextLabel[] = [
        { text: "apple", label: "fruit" },
        { text: "orange", label: "fruit" },
        { text: "beans", label: "vegetable" },
        { text: "sprouts", label: "vegetable" },
        { text: "oats", label: "grain" },
        { text: "barley", label: "grain" },
    ];
    const { predict } = TrieTextModel(labels);
    const {
        predictions: [prediction],
    }: LabelPredictionResult = (await predict("apple")) as LabelClassifyResponse;
    const { label, probability } = prediction;
    expect(label).toBe("fruit");
    expect(probability).toBe(100);
});
