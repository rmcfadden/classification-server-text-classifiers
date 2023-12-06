import {
    DataSet,
    PredictionResult,
    TextLabel,
    LabelPredictionResult,
    ModelBase,
} from "classification-server/types";

export const PrefixTreeTextModel = (textLabels: TextLabel[]) => {
    const predict = async (input: string): Promise<PredictionResult> =>
        ({
            predictions: [],
        } as LabelPredictionResult);
    const train = async (dataSet: DataSet) => PrefixTreeTextModel(dataSet.items as TextLabel[]);
    return { predict, train, name: "textLabel-KDTree" } as ModelBase;
};
