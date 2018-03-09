import React, { Component } from 'react';

// Module is used to display Question List
class QuestionList extends Component {
  constructor(props){
  	super(props);
  	this.handler = this.handler.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  // Function is to select the question from the list of questions displayed
  handler(index){
  	this.props.view_question(index);
  }

  // Function is to perform delete operation on the selected question
  handleRemove(index){
    this.props.delete_question(index);
  }

  render() {
    return (
      <ol>
        {this.props.question_list.map(question_list => (
          <div>
            <table>
              <tr>
                <td style={{ width: '50%'}}>
                  <li style={{'textAlign': 'center'}} onClick={() => this.handler(question_list.id)} key={question_list.id}>{question_list.text}</li>
                </td>
                <td style={{ width: '20%'}}>
                  <input type="button" onClick={() => this.handleRemove(question_list.id)} value="-" />
                </td>
              </tr>
            </table>
          </div>
        ))}
      </ol>
    );
  }
}

export default QuestionList;