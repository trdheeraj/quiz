import React, { Component } from 'react';

class OptionAddition extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.options_addition(e.target.value);
  }

  render() {
    return (
      <div>
      	<span> Options </span>
      	<input type="text" key={this.props.options_length} defaultValue="" name="options" onBlur={ this.handleChange } />
      </div>
    );
  }
}

export default OptionAddition;