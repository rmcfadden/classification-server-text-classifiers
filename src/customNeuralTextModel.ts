import {
    DataSet,
    LabelPredictionResult,
    PredictionResult,
    TextLabel,
    ModelBase,
} from "classification-server/types";

export const CustomNeuralTextModel = (labels: TextLabel[]) => {
    const inputs = preProcess(labels.map(({ text }) => text));
    const finalLabels = preProcess(labels.map(({ label }) => label));
    // denser layer one has one less node than inputs
    const layer1NodesLength = inputs.length > 2 ? inputs.length - 1 : inputs.length;
    const layer1Weights = [...Array(layer1NodesLength)].map(() =>
        [...Array(inputs.length)].map(Math.random)
    );
    const outputWeights = [...Array(finalLabels.length)].map(() =>
        [...Array(layer1Weights.length)].map(Math.random)
    );
    const predict = async (input: string): Promise<PredictionResult> =>
        ({} as LabelPredictionResult);
    const train = async ({ items }: DataSet) => CustomNeuralTextModel(items as TextLabel[]);
    const getModel = () => ({
        inputs,
        layers: [{ weights: layer1Weights }, [{ weights: outputWeights }]],
        labels: finalLabels,
    });

    console.log("GetModel", JSON.stringify(getModel()));

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

const createTextIntegerMap = (texts: string[]) =>
    texts.reduce((a, c, i) => a.set(c, i), new Map<string, number>());

const createReverseIntegerTextMap = (textMap: Map<string, number>) =>
    Array.from(textMap.entries()).reduce((a, [key, value]) => a.set(value, key), new Map<number, string>()
