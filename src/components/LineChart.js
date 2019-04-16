import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';

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
          display: true,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          display: true,
        },
      },
    ],
  },
};

class LineChart extends Component {
  constructor() {
    super();

    this.state = {
      options: initialOptions,
    };
  }
  render() {
    let labels = [];
    let data = [];
    let pointRadius = [];
    let pointBackgroundColors = [];

    if (this.props.runningData) {
      this.props.runningData.forEach((element, index) => {
        let date = element.Date;
        let price = element.SP500;
        let transactionIndex = this.props.transactionLog.indexOf(date);

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
        <Line data={chartData} options={this.state.options} />
      </div>
    );
  }
}

// const mapDispatchToProps = {
//   fetchData,
// };
const mapStateToProps = function(state, ownProps) {
  return {
    runningData: state.runningData,
    transactionLog: state.transactionLog,
    timePeriod: state.timePeriod,
    counter: state.counter,
  };
};

export default connect(
  mapStateToProps,
  null
)(LineChart);
