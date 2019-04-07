import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class LineChart extends Component {
  render() {
    let labels = [];
    let data = [];
    let pointRadius = [];
    let pointBackgroundColors = [];
    if (this.props.data) {
      this.props.data.forEach((element, index) => {
        let date = element.Date;
        let price = element.SP500;
        let transactionIndex = this.props.transactionLog.indexOf(date);

        // Check if this month has a buy or sell event
        if (transactionIndex !== -1) {
          // Add a point on chart
          pointRadius.push(5);

          // Check if buy or sell
          if (transactionIndex % 2) {
            // Buy
            // Odd items in array is even in 0 index
            pointBackgroundColors.push('#ff1654');
          } else {
            // Sell
            pointBackgroundColors.push('#90cd8a');
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
    let options = {
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
              display: true,
            },
          },
        ],
      },
    };

    return (
      <div className="component--line-chart">
        <Line data={chartData} options={options} />
      </div>
    );
  }
}

export default LineChart;
