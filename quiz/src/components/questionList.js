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
            <li style={{'textAlign': 'left'}} onClick={() => this.handler(question_list.id)} key={question_list.id}>{question_list.text}</li>
            <button style={{'textAlign': 'right'}} onClick={() => this.handleRemove(question_list.id)} className="small">-</button>
          </div>
        ))}
      </ol>
    );
  }
}

export default QuestionList;