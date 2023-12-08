import {
    DataSet,
    PredictionResult,
    TextLabel,
    LabelPredictionResult,
    ModelBase,
} from "classification-server/types";
import { PrefixTreeBuilder } from "./prefixTreeBuilder";
import { PrefixTreeSearcher } from "./prefixTreeSearcher";

export const PrefixTreeTextModel = (labels: TextLabel[]) => {
    const { build } = PrefixTreeBuilder();
    const root = build(labels);
    const { search } = PrefixTreeSearcher();
    const predict = async (input: string): Promise<PredictionResult> => {
        const results = search(input, root);
        return {
            predictions: results.map((label) => ({
                label,
                probability: (1 / results.length) * 100,
            })),
        } as LabelPredictionResult;
    };
    const train = async ({ items }: DataSet) => PrefixTreeTextModel(items as TextLabel[]);
    return { predict, train, name: "PrefixTreeTextModel" } as ModelBase;
};
