import React, { Component } from 'react';
import { connect } from 'react-redux';

class Summary extends Component {
  render() {
    return (
      <div className="component--summary">
        <h3>Summary</h3>
        <p>Value: ${this.props.netWorth.toFixed(2).toLocaleString()}</p>
      </div>
    );
  }
}

// const mapDispatchToProps = {
//   fetchData,
// };
const mapStateToProps = function(state, ownProps) {
  return {
    netWorth: state.netWorth,
  };
};

export default connect(
  mapStateToProps,
  null
)(Summary);
