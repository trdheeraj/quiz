import React, { Component } from 'react';
import OptionAddition from './components/optionAddition';
import QuestionAddition from './components/questionAddition';
import ViewQuestionDesign from './components/viewQuestionDesign';
import QuestionList from './components/questionList';
import OptionsDisplay from './components/optionsDisplay';
import './App.css';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleViewOperation = this.handleViewOperation.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove(index){
    this.props.delete_question(index);
  }

  render() {
    var heading = this.props.operation_heading === 0 ? <h3> Add your questions </h3> : <h3> Select your questions </h3>;
    var display_question_list = this.props.question_list.length === 0 ? '' : <QuestionList question_list={this.props.question_list} view_question={this.handleViewOperation} delete_question={this.handleRemove} />;
    return (
      <div>
        { heading }
        { display_question_list }
        <input
          type="button"
          value="Add"
          onClick={this.handleSubmit}
        />
        <input
          type="button"
          value="Delete"
          onClick={this.handleSubmit}
          disabled
        />
      </div>
    );
  }

  handleSubmit(e) {
    this.props.operationChange(e.target.value);
  }

  handleViewOperation(index){
    this.props.view_question(index);
  }
}


class QuestionDesign extends Component {
  constructor(props) {
    super(props);
    this.handleOperationChange = this.handleOperationChange.bind(this);
    this.handleOptionsAddition = this.handleOptionsAddition.bind(this);
    this.handleOptionsChange = this.handleOptionsChange.bind(this);
    this.handleOptionDeletion = this.handleOptionDeletion.bind(this);
    this.handleOptionsUpdation = this.handleOptionsUpdation.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleOperationChange(operation_heading) {
    this.props.operationChange(operation_heading);
  }

  handleOptionsAddition(e) {
    this.props.options_addition(e.target.value);
  }

  handleOptionsChange(options_text){
    this.props.option_change(options_text);
  }

  handleOptionDeletion(index){
    this.props.delete_options(index);
  }

  handleChange(index){
    this.props.option_id(index);
  }

  handleOptionsUpdation(options_text) {
    this.props.options_update(options_text);
  }

  render(){
    var question_addition = <QuestionAddition
      operation_heading = { this.props.operation_heading }
      question_number = { this.props.question_list.length + 1 }
      question_creation = { this.handleOperationChange }
      question_text = {this.props.options_list}
    />;
    var options_addition = <OptionAddition
      options_addition = { this.handleOptionsChange }
      options_text = { this.props.options_text }
      options_length = { this.props.options_length }
    />;
    var options_list = <OptionsDisplay
      options_list = {this.props.options_list}
      options_update = {this.handleOptionsUpdation}
      delete_options = {this.handleOptionDeletion}
      option_id = {this.handleChange}
    />
    var display_question = this.props.question_operation === 'Add' ?  question_addition : '';
    var display_options = this.props.options_operation === 'Add' ?  options_addition : '';
    var list_options = this.props.options_length === 0 ?  '' : options_list;
    return(
      <div>
        { display_question }
        { list_options }
        { display_options }
        <input
          type="button"
          value="Add"
          onClick={this.handleOptionsAddition}
        />
        <input
          type="button"
          value="Delete"
          onClick={this.handleSubmit}
          disabled
        />
      </div>
    );
  }  
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question_text: '',
      question_list: [],
      operation_heading: 0,
      question_operation: '',
      options_operation: '',
      options_text: '',
      options_length: 0,
      view_operation: '',
      view_index: 0,
      option_id: 0,
      question_length: 1

    };
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleOperationChange = this.handleOperationChange.bind(this);
    this.handleOptionsChange = this.handleOptionsChange.bind(this);
    this.handleOptionsAddition = this.handleOptionsAddition.bind(this);
    this.handleViewOperation = this.handleViewOperation.bind(this);
    this.handleQuestionUpdation = this.handleQuestionUpdation.bind(this);
    this.handleOptionsUpdation = this.handleOptionsUpdation.bind(this);
    this.handleOptionId = this.handleOptionId.bind(this);
    this.handleOptionDeletion = this.handleOptionDeletion.bind(this);
    this.handleQuestionDeletion = this.handleQuestionDeletion.bind(this);
  }

  handleOptionId(index){
    if(this.state.view_operation === 'off'){
      var current_question = this.state.question_text;
      var a = current_question.options;
    }else{
      var a = this.state.question_list[this.state.view_index].options;
    }
    for (var i = 0; i < a.length; i++) {
      if(a[i]['id'] === index){
        index = i;
        break;
      }
    }
    this.setState({option_id: index});
  }

  handleQuestionChange(question_text) {
    const newItem = {
      text: question_text,
      id: Date.now(),
      options: []
    };
    this.setState({question_text: newItem});
  }

  handleQuestionUpdation(question_text) {
    var question_update = this.state.question_list;
    question_update[this.state.view_index].text = question_text;
    this.setState({question_list: question_update});
  }

  handleOperationChange(operation_heading){
    this.setState({
      operation_heading: operation_heading,
      question_operation: operation_heading,
      options_operation: operation_heading
    });
    var question_length = this.state.question_length;
    if (this.state.question_text !== '' && this.state.question_operation !== 'view') {
      this.setState(prevState => ({
        question_list: prevState.question_list.concat(this.state.question_text)
      }));
      question_length = question_length + 1;
    }
    const newItem = {
      text: 'New Question ' + question_length,
      id: Date.now(),
      options: []
    };
    this.setState({question_text: newItem});
    this.setState({question_operation: 'Add', question_length: question_length});
    this.setState({options_operation: 'Add'});
    this.setState({view_operation: 'off'});
  }

  handleOptionsChange(options_text){
    this.setState({options_text: options_text});
  }

  handleViewOperation(index){
    var a = this.state.question_list;
    for (var i = 0; i < a.length; i++) {
      if(a[i]['id'] === index){
        index = i;
        break;
      }
    }
    this.setState({view_index: index});
    this.setState({view_operation: 'on'});
    this.setState({question_operation: 'view'});
    this.setState({options_operation: 'view'});
  }

  handleOptionsAddition(options_text) {
    var option_add = this.state.question_list;
    if(this.state.view_operation === 'off'){
      var options_update = this.state.question_text;
    }else{
      var options_update = option_add[this.state.view_index];
    }
    const newItem = {
      text: this.state.options_text,
      id: Date.now()
    };
    this.setState({view_operation: 'off'});
    options_update.options = options_update.options.concat(newItem);
    if(this.state.view_operation === 'off'){
      this.setState({question_text: options_update});
    }else{
      this.setState({question_list: option_add});
    }
    var options_length = this.state.options_length + 1;
    this.setState({options_length: options_length});
    this.setState({options_text: ''});
  }

  handleOptionsUpdation(options_text){
    if(this.state.view_operation === 'off'){
      var options_update = this.state.question_text.options;
      options_update[this.state.option_id].text = options_text;
    }else{
      var options_update = this.state.question_list[this.state.view_index].options;
      options_update[this.state.option_id].text = options_text;
      this.setState({question_text: options_update});
    }
    var options_length = this.state.options_length;
    this.setState({options_length: options_length});
    this.setState({options_text: ''});
  }

  handleOptionDeletion(index){
    var update = 0;
    if(this.state.view_operation === 'off'){
      var question_update = this.state.question_text;
      var options_update = question_update.options;
    }else{
      var question_update = this.state.question_list;
      var options_update = question_update[this.state.view_index].options;  
      update = 1;
    }
    for (var i = 0; i < options_update.length; i++) {
      if(options_update[i]['id'] === index){
        index = i;
        break;
      }
    }
    if(update === 1){
      options_update.splice(index, 1);
      this.setState({question_list: question_update});
    }else{
      options_update.splice(index, 1);
      this.setState({question_text: question_update});
    }
  }

  handleQuestionDeletion(index){
    var question_update = this.state.question_list;
    for (var i = 0; i < question_update.length; i++) {
      if(question_update[i]['id'] === index){
        index = i;
        break;
      }
    }
    var question_length = this.state.question_length;
    question_update.splice(index, 1);
    question_length = question_length - 1;
    this.setState({question_length: question_length});
    this.setState({question_list: question_update});
    this.setState({question_operation: 'view'});
    this.setState({options_operation: 'view'});
  }

  render() {
    var display_view_question = <ViewQuestionDesign
                                  operation_heading = { this.state.operation_heading }
                                  question_list = { this.state.question_list }
                                  operationChange = { this.handleQuestionChange }
                                  option_change = { this.handleOptionsChange }
                                  options_addition = { this.handleOptionsAddition }
                                  question_operation = { this.state.question_operation }
                                  options_operation = { this.state.options_operation }
                                  options_list = { this.state.question_list[this.state.view_index] } 
                                  options_text = { this.state.options_text }
                                  options_length = { this.state.options_length }
                                  question_update = { this.handleQuestionUpdation }
                                  options_update = { this.handleOptionsUpdation }
                                  option_id = {this.handleOptionId}
                                  delete_options = {this.handleOptionDeletion}
                                />;

    var display_question = <QuestionDesign
                              operation_heading = { this.state.operation_heading }
                              question_list = { this.state.question_list }
                              operationChange = { this.handleQuestionChange }
                              option_change = { this.handleOptionsChange }
                              options_addition = { this.handleOptionsAddition }
                              question_operation = { this.state.question_operation }
                              options_operation = { this.state.options_operation }
                              options_list = { this.state.question_text } 
                              options_text = { this.state.options_text }
                              options_length = { this.state.options_length }
                              options_update = { this.handleOptionsUpdation }
                              option_id = {this.handleOptionId}
                              delete_options = {this.handleOptionDeletion}
                            />;
    var view_question = this.state.view_operation === 'on' ?  display_view_question : display_question;
    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row-fluid">
            <div className="span4">
              <TodoApp 
                operation_heading = { this.state.operation_heading }
                question_list = { this.state.question_list }
                operationChange = { this.handleOperationChange }
                view_question = { this.handleViewOperation }
                delete_question = { this.handleQuestionDeletion }
              />
            </div>
            <div className="span8">
              {view_question}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
