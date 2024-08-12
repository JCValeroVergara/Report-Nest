import type { TDocumentDefinitions } from "pdfmake/interfaces";
import { getDonutChart } from "./charts/donut.chart";
import { headerSection } from "./sections/header.section";


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
        pageMargins: [40, 100, 40, 60],
        header: headerSection({
            title: options.title ?? 'Estadísticas de clientes',
            subtitle: options.subTitle ?? 'Top 10 países con más clientes',
        }),
        content: [{
            columns: [
                {
                    stack: [
                        { 
                            text: '10 países con más clientes',
                            alignment: 'center',
                            margin: [0, 0, 0, 10],
                        },
                        {
                            image: donutChart, width: 320
                        },
                    ],
                },
                {
                    layout: 'lightHorizontalLines',
                    width: 'auto',
                    // alignment: 'right',
                    table: {
                        headerRows: 1,
                        widths: [100, 'auto'],
                        body: [
                            ['País', 'Clientes'],
                            ...options.topCpuntries.map((country) => [country.country, country.customers]),
                        ],
                    }
                },
            ],
        }],
    };

    return docDefinition;
};

