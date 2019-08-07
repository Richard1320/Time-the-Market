import React, {useEffect, useState} from 'react';
import {Line} from 'react-chartjs-2';
import {useSelector} from "react-redux";

import {IDataPoint, stateTypes} from '../redux/initialState';

const initialOptions = {
    legend: {
        display: false,
    },
    scales: {
        xAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    display: false,
                },
                scaleLabel: {
                    display: false,
                    labelString: 'Date',
                },
            },
        ],
        yAxes: [
            {
                ticks: {
                    display: false,
                },
                scaleLabel: {
                    display: false,
                    labelString: 'S&P500 Price',
                },
            },
        ],
    },
};

const LineChart: React.FC = () => {
    const isPlaying = useSelector((state: stateTypes) => state.isPlaying);
    const transactionLog = useSelector((state: stateTypes) => state.transactionLog);
    const runningData = useSelector((state: stateTypes) => state.runningData);
    const [options, setOptions] = useState(initialOptions);
    const [redraw, setRedraw] = useState(false);
    let labels: string[] = [];
    let data: number[] = [];
    let pointRadius: number[] = [];
    let pointBackgroundColors: string[] = [];

    useEffect(() => {
        // Show dates and prices after game is over
        let newOptions = Object.assign({}, options);
        newOptions.scales.xAxes[0].ticks.display = !isPlaying;
        newOptions.scales.yAxes[0].ticks.display = !isPlaying;
        newOptions.scales.xAxes[0].scaleLabel.display = !isPlaying;
        newOptions.scales.yAxes[0].scaleLabel.display = !isPlaying;

        // Redraw chart once to refresh options display
        setOptions(newOptions);
        setRedraw(true);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPlaying]);

    useEffect(() => {
        // Stop redrawing after single redraw
        setRedraw(false);
    }, [redraw]);

    if (runningData) {
        runningData.forEach((element: IDataPoint) => {
            let date = element.Date;
            let price = element.SP500;
            let transactionIndex = transactionLog.indexOf(date);

            // Check if this month has a buy or sell event
            if (transactionIndex !== -1) {
                // Add a point on chart
                pointRadius.push(5);

                // Check if buy or sell
                if (transactionIndex % 2 === 0) {
                    // Buy
                    // Odd items in array is even in 0 index
                    pointBackgroundColors.push('#90cd8a');
                } else {
                    // Sell
                    pointBackgroundColors.push('#ff1654');
                }
            } else {
                // No event, hide radius
                pointRadius.push(0);
                pointBackgroundColors.push('#000');
            }
            labels.push(date);
            data.push(price);
        });
    }

    let chartData = {
        labels: labels,
        datasets: [
            {
                data: data,
                // borderColor: '#f00',
                borderWidth: 2,
                radius: pointRadius,
                lineTension: 0,
                pointBackgroundColor: pointBackgroundColors,
            },
        ],
    };

    return (
        <div className="component--line-chart">
            <Line
                data={chartData}
                redraw={redraw}
                options={options}
            />
        </div>
    );
};

export default LineChart;