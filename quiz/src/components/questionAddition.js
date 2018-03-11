import React, { Component } from 'react';
import ImageUpload from './imageUpload';

class QuestionAddition extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleFileAddition = this.handleFileAddition.bind(this);
    this.handleDisplayImage = this.handleDisplayImage.bind(this);
  }

  handleChange(e) {
    this.props.question_creation(e.target.value);
  }

  handleFileAddition(file){
    this.props.file_addition(file);
  }

  handleDisplayImage(e) {
    this.props.display_image(e);
  }

  render() {
  	if(this.props.operation_heading === 0){
  		return '';
  	}
    return (
      <div> 
        <table>
          <tbody>
            <tr>
              <td>
                Question : <input type="text" key={this.props.question_text.id} defaultValue={this.props.question_text.text} onBlur={ this.handleChange } />  
              </td>
            </tr>
            <tr>
              <ImageUpload 
                file_addition={this.handleFileAddition}
                file_preview={this.props.question_text}
                display_image={this.handleDisplayImage}
                show_image={this.props.show_image}
                display_no_image={this.props.display_no_image}
                toggle_display_no_image = {this.props.toggle_display_no_image}
              />
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default QuestionAddition;