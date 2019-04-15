import React, { Component } from 'react';
import { connect } from 'react-redux';

import './scss/app.scss';
import { fetchData } from './redux/actions';

import LineChart from './components/LineChart.js';
import Form from './components/Form.js';
import Summary from './components/Summary.js';

class App extends Component {
  componentDidMount() {
    this.props.fetchData();
  }
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
