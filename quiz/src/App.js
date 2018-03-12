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
    var heading = this.props.operation_heading === 0 ? <h4> Add your questions </h4> : <h4> Select your questions </h4>;
    var display_question_list = this.props.question_list.length === 0 ? '' : <QuestionList question_list={this.props.question_list} view_question={this.handleViewOperation} delete_question={this.handleRemove} />;
    var disable_question_addition = true;
    if(this.props.first_question){
      disable_question_addition = false;
    }else{
      if(this.props.enable_ques_addition){
        disable_question_addition = false;
        if(this.props.question_list[this.props.view_index].options.length >= 2){
          disable_question_addition = false;
        }else{
          disable_question_addition = true;
        }
      }else if(this.props.options_length >= 2){
        disable_question_addition = false;
      }else{
        disable_question_addition = true;
      }
    }
    return (
      <div>
        { heading }
        { display_question_list }
        <input
          type="button"
          value="Add"
          onClick={this.handleSubmit}
          disabled = {disable_question_addition}
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
    this.handleFileAddition = this.handleFileAddition.bind(this);
    this.handleImageDisplay = this.handleImageDisplay.bind(this);
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

  handleFileAddition(file){
    this.props.file_addition(file);
  }

  handleImageDisplay(e){
    this.props.display_image(e);
  }

  render(){
    var question_addition = <QuestionAddition
      operation_heading = { this.props.operation_heading }
      question_number = { this.props.question_list.length + 1 }
      question_creation = { this.handleOperationChange }
      question_text = {this.props.options_list}
      file_addition = {this.handleFileAddition}
      display_image = {this.handleImageDisplay}
      show_image = {this.props.show_image}
      display_no_image= {this.props.display_no_image}
      toggle_display_no_image = {this.props.toggle_display_no_image}
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
    var disable_option_addition = this.props.options_length === 6 ? 'disabled' : 'show'
    var disabled = false;
    var disable_option_first = this.props.disable_option_addition;
    if(disable_option_addition === 'disabled'){
      disabled = true;
    }else{
      disabled = false;
      if(disable_option_first) disabled = true;
    }
    return(
      <div>
        { display_question }
        { list_options }
        { display_options }
        <input
          type="button"
          value="Add"
          id="Option"
          onClick={this.handleOptionsAddition}
          disabled={disabled}
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
      question_length: 1,
      disable_option_addition: true,
      first_question: true,
      enable_ques_addition: false,
      display_image: true,
      display_no_image: true
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
    this.handleFileAddition = this.handleFileAddition.bind(this);
    this.handleImageDisplay = this.handleImageDisplay.bind(this);
    this.toggle_display_no_image = this.toggle_display_no_image.bind(this);
  }

  toggle_display_no_image(){
    this.setState({display_no_image: false});
  }

  handleOptionId(index){
    var a = '';
    if(this.state.view_operation === 'off'){
      var current_question = this.state.question_text;
      a = current_question.options;
    }else{
      a = this.state.question_list[this.state.view_index].options;
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
      options: [],
      image: []
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
      options: [],
      image: []
    };
    this.setState({question_text: newItem});
    this.setState({question_operation: 'Add', question_length: question_length});
    this.setState({options_operation: 'Add', display_no_image: true});
    this.setState({view_operation: 'off', disable_option_addition: false, options_length: 0, first_question: false, enable_ques_addition: false});
    if(this.state.first_question === false){
      if(this.state.view_operation === 'off' && this.state.display_image === false){
        document.getElementById('file_preview').removeAttribute('src');
      } 
    }
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
    this.setState({options_operation: 'view', enable_ques_addition: true});
    if(this.state.display_image === false){
      document.getElementById('file_preview').removeAttribute('src');
    }
  }

  handleImageDisplay(e){
    this.setState({display_image: true});
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

  handleFileAddition(file){
    var option_add = this.state.question_list;
    if(this.state.view_operation === 'off'){
      var options_update = this.state.question_text;
    }else{
      var options_update = option_add[this.state.view_index];
    }
    let reader = new FileReader();

    const newItem = {
      file: file
    };
    options_update.image = newItem;

    if(this.state.view_operation === 'off'){
      this.setState({question_text: options_update});
    }else{
      this.setState({question_list: option_add});
    }
    if(typeof file == 'undefined'){
      this.setState({display_no_image: true});
      if(this.state.view_operation === 'on'){
        document.getElementById('file_preview').removeAttribute('src');
      }
    }
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
      this.state.options_length--;
      this.setState({question_list: question_update});
    }else{
      options_update.splice(index, 1);
      this.state.options_length--;
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
    this.setState({view_index: 0});
    var question_length = this.state.question_length;
    question_update.splice(index, 1);
    question_length = question_length - 1;
    this.setState({question_length: question_length});
    this.setState({question_list: question_update});
    this.setState({question_operation: 'view'});
    this.setState({options_operation: 'view'});
    this.setState({view_operation: 'on'});
    if(this.state.question_list.length === 0){
      this.setState({first_question: true, disable_option_addition: true});
    }
  }

  render() {
    if(this.state.question_list.length > 0){
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
                                    question_update = { this.handleQuestionUpdation }
                                    options_update = { this.handleOptionsUpdation }
                                    option_id = {this.handleOptionId}
                                    delete_options = {this.handleOptionDeletion}
                                    file_addition = {this.handleFileAddition}
                                    display_image = {this.handleImageDisplay}
                                    toggle_display_no_image = {this.toggle_display_no_image}
                                  />;
    }
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
                              disable_option_addition = {this.state.disable_option_addition}
                              file_addition = {this.handleFileAddition}
                              display_image = {this.handleImageDisplay}
                              show_image = {this.state.display_image}
                              display_no_image= {this.state.display_no_image}
                              toggle_display_no_image = {this.toggle_display_no_image}
                            />;
    var view_question = this.state.view_operation === 'on' ?  display_view_question : display_question;
    return (
      <div className="App">
        <table align="center">
          <tr>
              <td id="col1">
                <div>
                  <TodoApp 
                    operation_heading = { this.state.operation_heading }
                    question_list = { this.state.question_list }
                    operationChange = { this.handleOperationChange }
                    view_question = { this.handleViewOperation }
                    delete_question = { this.handleQuestionDeletion }
                    options_length = { this.state.options_length }
                    first_question = { this.state.first_question }
                    enable_ques_addition = { this.state.enable_ques_addition }
                    view_index = {this.state.view_index}
                  />
                </div>
              </td>
              <td id="col2">
                <div>
                  {view_question}
                </div>
              </td>
            </tr>
        </table>
      </div>
    );
  }
}

export default App;
