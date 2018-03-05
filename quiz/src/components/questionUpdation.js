import React, { Component } from 'react';

class QuestionUpdation extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.question_update(event.target.value);
  }

  render() {
  	if(this.props.operation_heading === 0){
  		return '';
  	}
    return (
      <div>
      	<span> Question </span>
      	<input type="text" key={this.props.question_text.id} defaultValue={this.props.question_text.text} onBlur={this.handleChange} />
      </div>
    );
  }
}

export default QuestionUpdation;