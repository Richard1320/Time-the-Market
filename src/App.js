import React, { Component } from 'react';

import data from './data/historical-sp500.json';
import LineChart from './components/LineChart.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      startIndex: 0,
      counter: 0,
      limit: 120,
      runningData: [],
    };
  }
  componentDidMount() {
    this.initGame();
  }
  addPointToRunningData() {
    let counter = this.state.counter + 1;
    let sliceStart = this.state.startIndex;
    let sliceEnd = this.state.startIndex + counter;
    let runningData = data.slice(sliceStart, sliceEnd);

    this.setState({
      counter: counter,
      runningData: runningData,
    });
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
    });

    this.interval = setInterval(() => {
      this.addPointToRunningData();

      if (this.state.counter > this.state.limit) clearInterval(this.interval);
    }, 100);
  }
  render() {
    return (
      <div className="App">
        <LineChart data={this.state.runningData} />
      </div>
    );
  }
}

export default App;
