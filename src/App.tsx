import React, { Component } from 'react';
import { connect } from 'react-redux';

import './scss/app.scss';
import { fetchData } from './redux/actions';
import { stateTypes } from './redux/initialState';

import LineChart from './components/LineChart';
import Form from './components/Form';
import Summary from './components/Summary';
import Header from './components/Header';
import Footer from './components/Footer';

interface MyProps {
  fetchData: any;
}

interface MyState {}

class App extends Component<MyProps, MyState> {
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
const mapStateToProps = function(state: stateTypes) {
  return {
    historicalData: state.historicalData,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
