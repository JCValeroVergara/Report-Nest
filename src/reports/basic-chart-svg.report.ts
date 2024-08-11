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


export const getBasicChartSvgReport = 
    async():Promise<TDocumentDefinitions> => {

        const chart = await generetaChartImage();

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
                }
            ],
        }
    }