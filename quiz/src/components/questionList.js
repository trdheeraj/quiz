import React, { Component } from 'react';

class QuestionList extends Component {
  constructor(props){
  	super(props);
  	this.handler = this.handler.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handler(index){
  	this.props.view_question(index);
  }


  handleRemove(index){
    this.props.delete_question(index);
  }

  render() {
    return (
      <ol>
        {this.props.question_list.map(question_list => (
          <div>
            <li style={{'text-align': 'left'}} onClick={() => this.handler(question_list.id)} key={question_list.id}>{question_list.text}</li>
            <button style={{'text-align': 'right'}} onClick={() => this.handleRemove(question_list.id)} className="small">-</button>
          </div>
        ))}
      </ol>
    );
  }
}

export default QuestionList;