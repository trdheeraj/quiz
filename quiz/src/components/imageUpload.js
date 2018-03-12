import React, { Component } from 'react';

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this._handleImageChange = this._handleImageChange.bind(this);
  }

  _handleImageChange(e) {
    e.preventDefault();
    let file = e.target.files[0];
    var reader = new FileReader();
    var output = '';
    reader.onload = function(){
      output = document.getElementById('file_preview');
      output.src = URL.createObjectURL(file);
    };
    if(typeof file !== 'undefined'){
      this.props.toggle_display_no_image();
      reader.readAsDataURL(file)
    }else{
      this.props.display_image();
    }
    this.props.file_addition(file);
  }

  render() {
    var display_image = this.props.show_image && this.props.display_no_image === false ? <img id='file_preview' alt="Not Selected" /> : ''
    return (
      <table>
        <tbody>
          <tr>
            <td>
              <div className="fileUpload btn btn-success">
                Add Image <input type="file" className="upload" accept=".png, .jpg, .jpeg" onChange={this._handleImageChange} />
              </div>
            </td>
          </tr>
          <tr>
            {display_image}
          </tr>
        </tbody>
      </table>
    )
  }

}

export default ImageUpload;