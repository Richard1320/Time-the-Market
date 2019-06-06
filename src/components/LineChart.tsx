import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';

import { stateTypes } from '../redux/initialState';


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

interface MyState {
options: any,
redraw: boolean
}

class LineChart extends Component<stateTypes, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      options: initialOptions,
      redraw: false,
    };
  }
  componentDidUpdate(prevProps: any) {
    // Typical usage (don't forget to compare props):
    if (this.props.isPlaying !== prevProps.isPlaying) {
      // Show dates and prices after game is over
      let options = Object.assign({}, this.state.options);
      options.scales.xAxes[0].ticks.display = !this.props.isPlaying;
      options.scales.yAxes[0].ticks.display = !this.props.isPlaying;
      options.scales.xAxes[0].scaleLabel.display = !this.props.isPlaying;
      options.scales.yAxes[0].scaleLabel.display = !this.props.isPlaying;

      // Redraw chart once to refresh options display
      this.setState({ options: options, redraw: true }, () => {
        this.setState({ redraw: false });
      });
    }
  }
  render() {
    let labels:Array<string> = [];
    let data:Array<number> = [];
    let pointRadius:Array<number> = [];
    let pointBackgroundColors:Array<string> = [];

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
        <Line
          data={chartData}
          redraw={this.state.redraw}
          options={this.state.options}
        />
      </div>
    );
  }
}

// const mapDispatchToProps = {
//   fetchData,
// };
const mapStateToProps = (state: stateTypes, ownProps: any) => {
  return {
    runningData: state.runningData,
    transactionLog: state.transactionLog,
    timePeriod: state.timePeriod,
    counter: state.counter,
    isPlaying: state.isPlaying,
  };
};

export default connect(
  mapStateToProps,
  null
)(LineChart);
