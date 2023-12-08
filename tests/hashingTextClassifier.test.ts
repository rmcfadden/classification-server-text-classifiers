import {
    TextLabel,
    LabelClassifyResponse,
    ClassifyDataSetQuery,
    LabelPrediction,
} from "classification-server/types";
import { HashingTextClassifier } from "../src/hashingTextClassifier";

test("predict", async () => {
    const items: TextLabel[] = [
        { text: "apple", label: "fruit" },
        { text: "orange", label: "fruit" },
        { text: "beans", label: "vegetable" },
        { text: "sprouts", label: "vegetable" },
        { text: "oats", label: "grain" },
        { text: "barley", label: "grain" },
        { text: "barley", label: "seed" },
    ];
    const { classify } = HashingTextClassifier();
    const { predictions } = (await classify({
        text: "barley",
        dataSet: { items, name: "food", dataTypes: "TextLabel" },
    } as ClassifyDataSetQuery)) as LabelClassifyResponse;

    const [predication1, predication2] = [
        ...predictions.sort((a: LabelPrediction, b: LabelPrediction) =>
            a.label.localeCompare(b.label)
        ),
    ];
    expect(predication1.label).toBe("grain");
    expect(predication1.probability).toBe(50);
    expect(predication2.label).toBe("seed");
    expect(predication2.probability).toBe(50);
});
