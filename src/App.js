import React, { Component } from 'react';
import { connect } from 'react-redux';

import './scss/app.scss';
import { fetchData } from './redux/actions';

import LineChart from './components/LineChart.js';
import Form from './components/Form.js';
import Summary from './components/Summary.js';
import Header from './components/Header.js';
import Footer from './components/Footer.js';

class App extends Component {
  componentDidMount() {
    this.props.fetchData();
  }
  render() {
    return (
      <div className="App">
        <Header />
        <Form />
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-lg-8">
              <LineChart />
            </div>
            <div className="col-12 col-lg-4">
              <Summary />
            </div>
          </div>
        </div>
        <Footer />
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
