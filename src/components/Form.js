import React, { Component } from 'react';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      timeline: 120,
    };
  }
  timelineHandler(e) {
    let value = e.target.value;
    this.setState({
      timeline: value,
    });
  }
  formSubmit(e) {
    this.props.formSubmit(this.state.timeline);
    e.preventDefault();
  }
  buySellHandler() {
    this.props.buySellHandler();
  }
  render() {
    let buySellText;
    if (this.props.holding) {
      buySellText = 'Sell';
    } else {
      buySellText = 'Buy';
    }
    return (
      <div className="component--form">
        <form onSubmit={this.formSubmit.bind(this)}>
          <label htmlFor="input-timeline">Time Period</label>
          <select
            id="input-timeline"
            value={this.state.timeline}
            onChange={this.timelineHandler.bind(this)}
          >
            <option value="120">10 Years</option>
            <option value="240">20 Years</option>
            <option value="320">30 Years</option>
            <option value="480">40 Years</option>
          </select>
          <button type="submit">Retry</button>
        </form>

        <button type="button" onClick={this.buySellHandler.bind(this)}>
          {buySellText}
        </button>
      </div>
    );
  }
}

export default Form;
