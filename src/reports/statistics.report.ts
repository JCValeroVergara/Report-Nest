import type { TDocumentDefinitions } from "pdfmake/interfaces";
import { getDonutChart } from "./charts/donut.chart";


interface TopCountry {
    country: string;
    customers: number;
}

interface ReportOptions {
    title? : string;
    subTitle? : string;
    topCpuntries: TopCountry[];
}



export const  getStatisticsReport = async (
    options: ReportOptions
): Promise<TDocumentDefinitions> => {

    const donutChart = await getDonutChart({
        entries: options.topCpuntries.map((country) => ({
            label: country.country,
            value: country.customers,
        })),
        position: 'left',
    });

    const docDefinition: TDocumentDefinitions = {
        content: [{image: donutChart, width: 500}],
    };

    return docDefinition;
};

