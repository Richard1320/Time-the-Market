import React, { Component } from 'react';

import data from './data/historical-sp500.json';
import LineChart from './components/LineChart.js';
import Form from './components/Form.js';
import Summary from './components/Summary.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      startIndex: 0,
      counter: 0,
      limit: 120,
      runningData: [],
      netWorth: 10000,
      transactionLog: [],
    };
  }
  isHolding() {
    // Every buy and sell is an item in the transaction log
    // Odd number of items in log is holding (bought)
    // Even number of items in log is waiting (sold)
    let transactionLength = this.state.transactionLog.length;
    return transactionLength % 2 === 1;
  }
  gameTick() {
    this.addPointToRunningData();
  }
  calculateNetWorth() {
    if (this.isHolding()) {
      let netWorth = this.state.netWorth;
      let lastTwo = this.state.runningData.slice(-2);
      let lastMonthPrice = lastTwo[0].SP500;
      let thisMonthPrice = lastTwo[1].SP500;
      let gainPercent = (thisMonthPrice - lastMonthPrice) / lastMonthPrice;

      netWorth = netWorth * (1 + gainPercent);

      this.setState({
        netWorth: netWorth,
      });
    }
  }
  addPointToRunningData() {
    let counter = this.state.counter + 1;
    let sliceStart = this.state.startIndex;
    let sliceEnd = this.state.startIndex + counter;
    let runningData = data.slice(sliceStart, sliceEnd);

    this.setState(
      {
        counter: counter,
        runningData: runningData,
      },
      this.calculateNetWorth
    );
  }
  initGame() {
    // Randomize start index
    let count = data.length;
    let maxStart = count - this.state.limit;
    let startIndex = Math.floor(Math.random() * Math.floor(maxStart));

    // Reset variables
    this.setState({
      counter: 0,
      runningData: [],
      startIndex: startIndex,
      transactionLog: [],
    });

    this.interval = setInterval(() => {
      this.gameTick();

      if (this.state.counter > this.state.limit) clearInterval(this.interval);
    }, 100);
  }
  formSubmit(timePeriod) {
    this.setState(
      {
        limit: timePeriod,
      },
      this.initGame
    );
  }
  buySellHandler() {
    let transactionLog = this.state.transactionLog;
    let thisMonthIndex = this.state.startIndex + this.state.counter;
    let thisMonthData = data[thisMonthIndex];
    let thisMonthDate = thisMonthData.Date;
    transactionLog.push(thisMonthDate);

    this.setState({
      transactionLog: transactionLog,
    });
  }
  render() {
    return (
      <div className="App">
        <Form
          holding={this.isHolding()}
          buySellHandler={this.buySellHandler.bind(this)}
          formSubmit={this.formSubmit.bind(this)}
        />
        <Summary netWorth={this.state.netWorth} />
        <LineChart
          data={this.state.runningData}
          transactionLog={this.state.transactionLog}
        />
      </div>
    );
  }
}

export default App;
