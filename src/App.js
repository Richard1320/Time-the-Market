import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchData } from './redux/actions';

import LineChart from './components/LineChart.js';
import Form from './components/Form.js';
import Summary from './components/Summary.js';

class App extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     startIndex: 0,
  //     counter: 0,
  //     timePeriod: 120,
  //     runningData: [],
  //     netWorth: 10000,
  //     transactionLog: [],
  //     startInvested: false,
  //   };
  // }
  componentDidMount() {
    this.props.fetchData();
  }
  // isHolding() {
  //   // Every buy and sell is an item in the transaction log
  //   // Odd number of items in log is holding (bought)
  //   // Even number of items in log is waiting (sold)
  //   let transactionLength = this.props.transactionLog.length;
  //   return transactionLength % 2 === 1;
  // }
  // gameTick() {
  //   this.moveToNewMonth()
  //     .then(result => {
  //       return this.addPointToRunningData();
  //     })
  //     .then(result => {
  //       return this.calculateNetWorth();
  //     })
  //     .then(result => {
  //       this.gameTickCallback();
  //     });
  // }
  // isEnd() {
  //   // Check if timeline is over
  //   return this.state.counter > this.state.timePeriod;
  // }
  // gameTickCallback() {
  //   if (this.isEnd()) {
  //   } else {
  //     // Game step "tick"
  //     this.timeout = setTimeout(this.gameTick.bind(this), 100);
  //   }
  // }
  // calculateNetWorth() {
  //   return new Promise((resolve, reject) => {
  //     if (this.isHolding()) {
  //       let netWorth = this.state.netWorth;
  //       let lastTwo = this.state.runningthis.props.data.slice(-2);

  //       // Check if running data has at least two months
  //       // And this month is not a "buy" month
  //       if (lastTwo[1]) {
  //         let lastMonthPrice = lastTwo[0].SP500;
  //         let thisMonthPrice = lastTwo[1].SP500;
  //         let gainPercent = (thisMonthPrice - lastMonthPrice) / lastMonthPrice;

  //         netWorth = netWorth * (1 + gainPercent);

  //         this.setState(
  //           {
  //             netWorth: netWorth,
  //           },
  //           resolve
  //         );
  //       } else {
  //         resolve();
  //       }
  //     } else {
  //       resolve();
  //     }
  //   });
  // }
  // moveToNewMonth() {
  //   return new Promise((resolve, reject) => {
  //     let counter = this.state.counter + 1;
  //     this.setState(
  //       {
  //         counter: counter,
  //       },
  //       resolve
  //     );
  //   });
  // }
  // addPointToRunningData() {
  //   return new Promise((resolve, reject) => {
  //     let counter = this.state.counter;
  //     let sliceStart = this.state.startIndex;
  //     let sliceEnd = this.state.startIndex + counter;
  //     let runningData = this.props.data.slice(sliceStart, sliceEnd);
  //     this.setState(
  //       {
  //         runningData: runningData,
  //       },
  //       resolve
  //     );
  //   });
  // }
  // initGame() {
  //   // Randomize start index
  //   let count = this.props.data.length;
  //   let maxStart = count - this.state.timePeriod;
  //   let startIndex = Math.floor(Math.random() * Math.floor(maxStart));
  //   let transactionLog = [];

  //   if (this.state.startInvested) {
  //     transactionLog.push(data[startIndex].Date);
  //   }

  //   // Reset variables
  //   this.setState(
  //     {
  //       counter: 0,
  //       runningData: [],
  //       startIndex: startIndex,
  //       transactionLog: transactionLog,
  //       netWorth: 10000,
  //     },
  //     () => {
  //       // Add starting month to running data
  //       this.addPointToRunningData().then(() => {
  //         this.gameTick();
  //       });
  //     }
  //   );
  // }
  // formSubmit(formState) {
  //   this.setState(
  //     {
  //       timePeriod: formState.timePeriod,
  //       startInvested: formState.startInvested,
  //     },
  //     this.initGame
  //   );
  // }
  // buySellHandler() {
  //   let transactionLog = this.state.transactionLog;
  //   let thisMonthIndex = this.state.startIndex + this.state.counter;
  //   let thisMonthData = data[thisMonthIndex];
  //   let thisMonthDate = thisMonththis.props.data.Date;
  //   transactionLog.push(thisMonthDate);

  //   this.setState({
  //     transactionLog: transactionLog,
  //   });
  // }
  render() {
    return (
      <div className="App">
        <Form />
        <Summary />
        <LineChart />
      </div>
    );
  }
}
const mapDispatchToProps = {
  fetchData,
};
const mapStateToProps = function(state, ownProps) {
  return {
    historicalData: state.historicalData,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
