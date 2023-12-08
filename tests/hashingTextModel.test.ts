import { TextLabel, LabelPredictionResult } from "classification-server/types";
import { HashingTextModel } from "../src/hashingTextModel";

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
    const { predict } = HashingTextModel(labels);
    const {
        predictions: [prediction1, predication2],
    } = (await predict("banana")) as LabelPredictionResult;
    expect(prediction1.label).toBe("fruit");
    expect(prediction1.probability).toBe(100);
    expect(predication2.label).toBe("tropicalfruit");
    expect(predication2.probability).toBe(100);

    const {
        predictions: [prediction3],
    } = (await predict("oat")) as LabelPredictionResult;
    expect(prediction3.label).toBe("grain");
    expect(prediction3.probability).toBe(100);

    const { predictions } = (await predict("oatasdf")) as LabelPredictionResult;
    expect(predictions.length).toBe(0);
});
