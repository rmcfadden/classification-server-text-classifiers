import {
    DataSet,
    PredictionResult,
    TextLabel,
    LabelPredictionResult,
    ModelBase,
} from "classification-server/types";
import { TrieBuilder } from "./trieBuilder";
import { TrieSearcher } from "./trieSearcher";

export const TrieTextModel = (labels: TextLabel[]) => {
    const { build } = TrieBuilder();
    const root = build(labels);
    const { search } = TrieSearcher();
    const predict = async (input: string): Promise<PredictionResult> => {
        const results = search(input, root);
        return {
            predictions: results.map((label) => ({
                label,
                probability: (1 / results.length) * 100,
            })),
        } as LabelPredictionResult;
    };
    const train = async ({ items }: DataSet) => TrieTextModel(items as TextLabel[]);
    return { predict, train, name: "TrieTextModel" } as ModelBase;
};
