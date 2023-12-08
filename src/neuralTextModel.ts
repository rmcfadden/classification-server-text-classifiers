import {
    DataSet,
    LabelPredictionResult,
    PredictionResult,
    TextLabel,
    ModelBase,
} from "classification-server/types";

export const NeuralTextModel = (labels: TextLabel[]) => {
    const predict = async (input: string): Promise<PredictionResult> =>
        ({} as LabelPredictionResult);
    const train = async ({ items }: DataSet) => NeuralTextModel(items as TextLabel[]);
    return { predict, train, name: "NeuralTextModel" } as ModelBase;
};
