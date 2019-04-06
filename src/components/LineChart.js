import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class LineChart extends Component {
  render() {
    let labels = [];
    let data = [];
    if (this.props.data) {
      this.props.data.forEach(element => {
        labels.push(element.Date);
        data.push(element.SP500);
      });
    }
    let chartData = {
      labels: labels,
      datasets: [
        {
          data: data,
          // borderColor: '#f00',
          borderWidth: 2,
          radius: 0,
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
              display: false,
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
