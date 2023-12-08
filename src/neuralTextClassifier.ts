import {
    ClassifyQuery,
    ClassifyDataSetQuery,
    LabelClassifyResponse,
    TextLabel,
    ClassifierBase,
    LabelPredictionResult,
    LabelPrediction,
} from "classification-server/types";
export const NeuralTextClassifier = () => {
    const classify = async (query: ClassifyQuery) => {
        const { text } = query;
        const {
            dataSet: { items },
        } = query as ClassifyDataSetQuery;
        //const { predict } = HashingTextModel(items as TextLabel[]);
        //const { predictions } = (await predict(text)) as LabelPredictionResult;
        return {} as LabelClassifyResponse;
    };
    return { classify, name: "NeuralTextClassifier" } as ClassifierBase;
};
