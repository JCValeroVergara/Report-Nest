import fs from 'fs';
import { TDocumentDefinitions, Content } from 'pdfmake/interfaces';
import * as Utils from '../helpers/chart-utils';

const svgContent = fs.readFileSync('src/assets/ford.svg', 'utf8');

const generetaChartImage = async() => {
    const chartConfig = {
        type: 'bar',                                // Show a bar chart
        data: {
            labels: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],   // Set X-axis labels
            datasets: [{
                label: 'Primera gráfica',                // Add a title to the chart 
                data: [ 65, 59, 80, 81, 56, 55, 10],          // Add data to the chart
                backgroundColor: 'rgba( 93, 75, 192, 0.2)', // Add a background color to the chart
                borderColor: 'rgb( 81, 75, 192)',       // Add a border color to the chart
                borderWidth: 1,                         // Add a border width to the chart
            }]
        }
    }
    return Utils.chartJsToImage(chartConfig);
}

//? Generate a donut chart
const generateChartDonut = async() => {
    const DATA_COUNT = 5;
    const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};

    const data = {
        labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
        datasets: [
            {
            label: 'Dataset 1',
            data: Utils.numbers(NUMBER_CFG),
            backgroundColor: Object.values(Utils.CHART_COLORS),
            }
        ]
    };

    const config = {
        type: 'doughnut',
        data: data,
        options: {
        responsive: true,
        title: {
            display: true,
            text: 'Chart.js Doughnut Chart'
            },
        },
    };
    return Utils.chartJsToImage(config);
}


export const getBasicChartSvgReport = 
    async():Promise<TDocumentDefinitions> => {

        //! lanza las dos promesas al mismo tiempo
        const [chart, chartDonut] = await Promise.all([generetaChartImage(), generateChartDonut()]);

        return{
            content: [
                {
                    svg: svgContent,
                    width: 100,
                    fit: [100, 100]
                },
                {
                    image: chart,
                    width: 500,
                },
                {
                    image: chartDonut,
                    width: 500,
                }
            ],
        }
    }