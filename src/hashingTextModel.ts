import {
    DataSet,
    PredictionResult,
    TextLabel,
    LabelPredictionResult,
    ModelBase,
} from "classification-server/types";

export const HashingTextModel = (labels: TextLabel[]) => {
    const map = labels.reduce(
        (a, { text, label }) => a.set(text, [...new Set([...(a.get(text) ?? []), label])]),
        new Map<string, string[]>()
    );
    const predict = async (input: string): Promise<PredictionResult> => {
        const results = map.get(input) ?? [];
        return {
            predictions: results.map((label) => ({
                label,
                probability: (1 / results.length) * 100,
            })),
        } as LabelPredictionResult;
    };
    const train = async ({ items }: DataSet) => HashingTextModel(items as TextLabel[]);
    return { predict, train, name: "HashingTextModel" } as ModelBase;
};
