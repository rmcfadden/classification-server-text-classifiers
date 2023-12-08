import {
    ClassifyQuery,
    ClassifyDataSetQuery,
    LabelClassifyResponse,
    TextLabel,
    ClassifierBase,
    LabelPredictionResult,
} from "classification-server/types";
import { PrefixTreeTextModel } from "./prefixTreeTextModel";
export const PrefixTreeTextClassifier = () => {
    const classify = async (query: ClassifyQuery) => {
        const { text } = query;
        const {
            dataSet: { items },
        } = query as ClassifyDataSetQuery;
        const { predict } = PrefixTreeTextModel(items as TextLabel[]);
        const { predictions } = (await predict(text)) as LabelPredictionResult;
        return { predictions } as LabelClassifyResponse;
    };
    return { classify, name: "PrefixTreeTextClassifier" } as ClassifierBase;
};
