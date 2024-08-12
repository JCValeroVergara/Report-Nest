import * as Utils from '../../helpers/chart-utils';

export const getRadarChart = async (): Promise<string>=> {
    const DATA_COUNT = 7;
    const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};

    const labels = Utils.months({count: 7});
    const data = {
        labels: labels,
        datasets: [
            {
            label: 'Dataset 1',
            data: Utils.numbers(NUMBER_CFG),
            borderColor: Utils.NAMED_COLORS.orange,
            backgroundColor: Utils.transparentize(Utils.NAMED_COLORS.orange, 0.5),
            },
            {
            label: 'Dataset 2',
            data: Utils.numbers(NUMBER_CFG),
            borderColor: Utils.NAMED_COLORS.purple,
            backgroundColor: Utils.transparentize(Utils.NAMED_COLORS.purple, 0.5),
            }
        ]
    };

    const config = {
        type: 'radar',
        data: data,    
    };

    return Utils.chartJsToImage(config);

}