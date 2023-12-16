import { recurrent } from "brain.js";

import {
    DataSet,
    LabelPredictionResult,
    PredictionResult,
    TextLabel,
    ModelBase,
} from "classification-server/types";

export const BrainJSNeuralTextModel = (labels: TextLabel[]) => {
    const net = new recurrent.LSTM();
    net.train(
        labels.map(({ text, label }) => ({ input: text, output: label })),
        {
            log: (stats: string) => console.log(stats),
            iterations: 100,
        }
    );

    const result = net.run("banana");

    const predict = async (input: string): Promise<PredictionResult> =>
        ({} as LabelPredictionResult);
    const train = async ({ items }: DataSet) => BrainJSNeuralTextModel(items as TextLabel[]);
    return { predict, train, name: "NeuralTextModel" } as ModelBase;
};
