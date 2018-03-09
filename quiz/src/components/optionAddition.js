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
    var hide_option_text = false;
    if(this.props.options_length === 6){
      hide_option_text = true;
    }
    return (
      <div>
      	<span> Option </span>
      	<input type="text" key={this.props.options_length} defaultValue="" name="options" onBlur={ this.handleChange } disabled={hide_option_text}/>
      </div>
    );
  }
}

export default OptionAddition;