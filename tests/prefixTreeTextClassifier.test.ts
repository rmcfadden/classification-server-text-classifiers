import {
    TextLabel,
    LabelClassifyResponse,
    ClassifyDataSetQuery,
} from "classification-server/types";
import { PrefixTreeTextClassifier } from "../src/prefixTreeTextClassifier";

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
    const { classify } = PrefixTreeTextClassifier();
    const {
        predictions: [predication1, predication2],
    } = (await classify({
        text: "barley",
        dataSet: { items, name: "food", dataTypes: "TextLabel" },
    } as ClassifyDataSetQuery)) as LabelClassifyResponse;
    expect(predication1.label).toBe("seed");
    expect(predication1.probability).toBe(50);
    expect(predication2.label).toBe("grain");
    expect(predication2.probability).toBe(50);
});
