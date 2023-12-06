import {
    ClassifyQuery,
    ClassifyDataSetQuery,
    LabelClassifyResponse,
    LabelPrediction,
    ClassifierBase,
} from "classification-server/types";

export const PrefixTreeClassifier = () => {
    const classify = async (query: ClassifyQuery) => {
        const { text } = query;
        const { dataSet } = query as ClassifyDataSetQuery;
        //const modelsFactory = ModelsFactory();
        //const model = modelsFactory.create("dataPointLabel");
        //const predictionModel = await model.train(dataSet);
        //const { predictions } = (await predictionModel.predict(
        //  text
        //)) as LabelClassifyResponse;
        return { predictions: [] as LabelPrediction[] } as LabelClassifyResponse;
    };
    return { classify, name: "textLabel-PrefixTree" } as ClassifierBase;
};
