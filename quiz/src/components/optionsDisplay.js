import React, { Component } from 'react';

class OptionsDisplay extends Component {
  constructor(props){
    super(props);
    this.handler = this.handler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handler(e){
    this.props.options_update(e.target.value);
  }

  handleChange(index){
    this.props.option_id(index);
  }

  handleRemove(index){
    this.props.delete_options(index);
  }

  render() {
    return (
      <ol>
        {this.props.options_list.options.map(question_list => (
        	<div>
	          <span> Options </span>
	      		<input type="text" onClick={() => this.handleChange(question_list.id)} key={question_list.id} defaultValue={question_list.text} onBlur={this.handler} />
            <button onClick={() => this.handleRemove(question_list.id)} className="small">-</button>
	      	</div>
        ))}
      </ol>
    );
  }
}

export default OptionsDisplay;