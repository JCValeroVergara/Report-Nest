import type { TDocumentDefinitions } from "pdfmake/interfaces";
import { getDonutChart } from "./charts/donut.chart";
import { headerSection } from "./sections/header.section";
import { getLineChart } from "./charts/line.chart";
import { getBarsChart } from "./charts/barsChart";
import { footerSection } from "./sections/foote.section";
import { getRadarChart } from "./charts/radarchart";


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

    const [donutChart, lineChart, barChart1, radarChart] = await Promise.all([
        getDonutChart({
            entries: options.topCpuntries.map((country) => ({
                label: country.country,
                value: country.customers,
            })),
            position: 'left',
        }),
        getLineChart(),
        getBarsChart(),
        getRadarChart(),
    ]);


    const docDefinition: TDocumentDefinitions = {
        pageMargins: [40, 100, 40, 60],
        header: headerSection({
            title: options.title ?? 'Estadísticas de clientes',
            subtitle: options.subTitle ?? 'Top 10 países con más clientes',
        }),
        footer: footerSection,
        content: [
            {
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
            },
            {
                image: lineChart,
                width: 500,
                margin: [0, 20, 0, 20],
            },
            {
                columnGap: 10,
                columns: [
                    {
                        image: barChart1,
                        width: 250,
                        margin: [0, 20, 10, 0],
                    },
                    {
                        image: radarChart,
                        width: 250,
                        margin: [10, 20, 0, 0],
                    },
                ],
            }
        ],
    };

    return docDefinition;
};

