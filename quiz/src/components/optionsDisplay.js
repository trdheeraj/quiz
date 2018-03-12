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
    var option_length = this.props.options_list.options.length + 1;
    return (
      <ol>
        {this.props.options_list.options.map(question_list => (
        	<div>
            <table>
              <tr>
                <td style={{ width: '5%'}}>
                  <span> {'Option ' + (option_length - this.props.options_list.options.length)} </span>
                  <input type="hidden" value={option_length = option_length + 1} />
                </td>
                <td style={{ width: '20%' }}>
	      		      <input type="text" onClick={() => this.handleChange(question_list.id)} key={question_list.id} defaultValue={question_list.text} onBlur={this.handler} />
                </td>
                <td style = {{ width: '10%'}}>
                  <input type="button" onClick={() => this.handleRemove(question_list.id)} value="-"/>
                </td>
              </tr>
            </table>
	      	</div>
        ))}
      </ol>
    );
  }
}

export default OptionsDisplay;