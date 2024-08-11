import axios from "axios";

interface ChartJsOptions {
    height?: number;
    width?: number;
}

export const chartJsToImage = async (
    chartConfig: unknown,
    options: ChartJsOptions = {},
) => {
    const params = new URLSearchParams();
    if(options.height) params.append('height', options.height.toString());
    if(options.width) params.append('width', options.width.toString());


    const encodedUri = encodeURIComponent(JSON.stringify(chartConfig));

    const chartUrl = `https://quickchart.io/chart?c=${encodedUri}&${params.toString()}`;

    const responser = await axios.get(chartUrl, { responseType: 'arraybuffer' });

    return `data:image/png;base64,${Buffer.from(responser.data).toString('base64')}`;
};