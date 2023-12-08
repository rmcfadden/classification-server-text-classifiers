import {
    ClassifyQuery,
    ClassifyDataSetQuery,
    LabelClassifyResponse,
    TextLabel,
    ClassifierBase,
    LabelPredictionResult,
} from "classification-server/types";
import { HashingTextModel } from "./hashingTextModel";
export const HashingTextClassifier = () => {
    const classify = async (query: ClassifyQuery) => {
        const { text } = query;
        const {
            dataSet: { items },
        } = query as ClassifyDataSetQuery;
        const { predict } = HashingTextModel(items as TextLabel[]);
        const { predictions } = (await predict(text)) as LabelPredictionResult;
        return { predictions } as LabelClassifyResponse;
    };
    return { classify, name: "HashingTextClassifier" } as ClassifierBase;
};
