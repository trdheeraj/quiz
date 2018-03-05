import React, { Component } from 'react';

class QuestionAddition extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.question_creation(e.target.value);
  }

  render() {
  	if(this.props.operation_heading === 0){
  		return '';
  	}
    return (
      <div>
      	<span> Question </span>
      	<input type="text" key={this.props.question_text.id} defaultValue={this.props.question_text.text} onBlur={ this.handleChange } />
      </div>
    );
  }
}

export default QuestionAddition;