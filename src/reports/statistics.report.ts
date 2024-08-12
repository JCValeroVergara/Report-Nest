import type { TDocumentDefinitions } from "pdfmake/interfaces";
import * as Utils from "../helpers/chart-utils";


interface TopCountry {
    country: string;
    customers: number;
}

interface ReportOptions {
    title? : string;
    subTitle? : string;
    topCpuntries: TopCountry[];
}

const generateToCountryDonut = async(topCountries: TopCountry[]): Promise<string>=> {
    const data = {
        labels: topCountries.map((country) => country.country),
        datasets: [
            {
            label: 'Dataset 1',
            data: topCountries.map((country) => country.customers),
            // backgroundColor: Object.values(Utils.CHART_COLORS),
            }
        ]
    };
    const config = {
        type: 'doughnut',
        data: data,
        options: {
            legend: {
            position: 'left',
            },
            responsive: true,
            plugins: {
            datalabels: {
                color: '#fff',
                font: {
                    weight: 'bold',
                    size: 14,
                },
            },
            },
        },
    };
    return Utils.chartJsToImage(config);
}

export const  getStatisticsReport = async (
    options: ReportOptions
): Promise<TDocumentDefinitions> => {

    const donutChart = await generateToCountryDonut(options.topCpuntries);

    const docDefinition: TDocumentDefinitions = {
        content: [{image: donutChart, width: 500}],
    };

    return docDefinition;
};

