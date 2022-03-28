import React, {useEffect, useState} from 'react';
import {Line} from 'react-chartjs-2';
import {useSelector} from "react-redux";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    ChartOptions,
} from 'chart.js';
import {IDataPoint, stateTypes} from '../redux/initialState';
import cloneDeep from 'lodash.clonedeep';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
);

const initialOptions: ChartOptions<"line"> = {
    // responsive:true,
    animation: false,
    scales: {
        x: {
            ticks: {
                display: false,
            },
            title: {
                display: true,
                text: "Date",
            },
            grid: {
                display: false,
            },
        },
        y: {
            ticks: {
                display: false,
            },
            title: {
                display: true,
                text: "S&P500 Price",
            },
            // suggestedMin: 0,
        },
    },
};

const LineChart: React.FC = () => {
    const isPlaying = useSelector((state: stateTypes) => state.isPlaying);
    const transactionLog = useSelector((state: stateTypes) => state.transactionLog);
    const runningData = useSelector((state: stateTypes) => state.runningData);
    const [options, setOptions] = useState<ChartOptions<"line">>(initialOptions);
    const [redraw, setRedraw] = useState<boolean>(false);
    let labels: string[] = [];
    let data: number[] = [];
    let pointRadius: number[] = [];
    let pointBackgroundColors: string[] = [];

    useEffect(() => {
        // Show dates and prices after game is over
        const newOptions: ChartOptions<"line"> = cloneDeep(options);
        // @ts-ignore
        newOptions.scales.x.ticks.display = !isPlaying;
        // @ts-ignore
        newOptions.scales.y.ticks.display = !isPlaying;

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
                    pointBackgroundColors.push('#1645ff');
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