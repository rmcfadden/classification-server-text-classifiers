import {
    DataSet,
    LabelPredictionResult,
    PredictionResult,
    TextLabel,
    ModelBase,
} from "classification-server/types";

export const CustomNeuralTextModel = (labels: TextLabel[]) => {
    const features = preProcess(labels.map(({ text }) => text));
    const finalLabels = preProcess(labels.map(({ label }) => label));

    const predict = async (input: string): Promise<PredictionResult> =>
        ({} as LabelPredictionResult);
    const train = async ({ items }: DataSet) => CustomNeuralTextModel(items as TextLabel[]);
    return { predict, train, name: "CustomNeuralTextModel" } as ModelBase;
};

const preProcess = (texts: string[]): string[] => {
    const loweredTexts = texts.map((text) => text.toLocaleLowerCase());
    // TODO: create n-grams
    const textFrequencyMap: Map<string, number> = loweredTexts.reduce(
        (a, c) => a.set(c, (a.get(c) ?? 0) + 1),
        new Map<string, number>()
    );
    return [...textFrequencyMap.keys()];
};

// First neural net implementation
// Tokenize
//
