import React, { Component } from 'react';

import data from './data/historical-sp500.json';
import LineChart from './components/LineChart.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      runningData: data,
    };
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
