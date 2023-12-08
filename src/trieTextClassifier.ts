import {
    ClassifyQuery,
    ClassifyDataSetQuery,
    LabelClassifyResponse,
    TextLabel,
    ClassifierBase,
    LabelPredictionResult,
} from "classification-server/types";
import { TrieTextModel } from "./trieTextModel";
export const TrieTextClassifier = () => {
    const classify = async (query: ClassifyQuery) => {
        const { text } = query;
        const {
            dataSet: { items },
        } = query as ClassifyDataSetQuery;
        const { predict } = TrieTextModel(items as TextLabel[]);
        const { predictions } = (await predict(text)) as LabelPredictionResult;
        return { predictions } as LabelClassifyResponse;
    };
    return { classify, name: "TrieTextClassifier" } as ClassifierBase;
};
