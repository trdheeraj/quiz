import React, { Component } from 'react';
import OptionsDisplay from './optionsDisplay';
import OptionAddition from './optionAddition';
import QuestionUpdation from './questionUpdation';

// Module is to display the question and answer options for the selected question
class ViewQuestionDesign extends Component {
  constructor(props) {
    super(props);
    this.handleOptionsAddition = this.handleOptionsAddition.bind(this);
    this.handleOptionsChange = this.handleOptionsChange.bind(this);
    this.handleQuestionUpdate = this.handleQuestionUpdate.bind(this);
    this.handleOptionsUpdation = this.handleOptionsUpdation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOptionDeletion = this.handleOptionDeletion.bind(this);
  }

  handleOptionsAddition(e) {
    this.props.options_addition(e.target.value);
  }

  handleOptionsUpdation(options_text) {
    this.props.options_update(options_text);
  }

  handleOptionsChange(options_text){
    this.props.option_change(options_text);
  }

  handleQuestionUpdate(question_text){
    this.props.question_update(question_text);
  }

  handleChange(index){
    this.props.option_id(index);
  }

  handleOptionDeletion(index){
    this.props.delete_options(index);
  }

  render(){
    var question_addition = <QuestionUpdation
      operation_heading = { this.props.operation_heading }
      question_text = {this.props.options_list}
      question_update = {this.handleQuestionUpdate}
    />;
    var options_addition = <OptionAddition
      options_addition = { this.handleOptionsChange }
      options_text = { this.props.options_text }
      options_length = { this.props.options_list.options.length }
    />;
    var options_list = <OptionsDisplay
      options_list = {this.props.options_list}
      options_update = {this.handleOptionsUpdation}
      option_id = {this.handleChange}
      delete_options = {this.handleOptionDeletion}
    />
    if(this.props.question_list.length > 0){
      var display_question = this.props.question_operation === 'view' ?  question_addition : '';
      var display_options = this.props.options_operation === 'view' ?  options_addition : '';
      var list_options = this.props.options_list.options.length === 0 ?  '' : options_list;
    }
    var disable_option_addition = this.props.options_list.options.length === 6 ? 'disabled' : 'show'
    var disabled = false;
    if(disable_option_addition === 'disabled'){
      disabled = true;
    }else{
      disabled = false;
    }
    return(
      <div>
        { display_question }
        { list_options }
        { display_options }
        <input
          type="button"
          value="Add"
          onClick={this.handleOptionsAddition}
          disabled={disabled}
        />
      </div>
    );
  }  
}

export default ViewQuestionDesign;