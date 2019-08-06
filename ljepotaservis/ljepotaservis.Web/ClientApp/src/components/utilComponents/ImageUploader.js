import React, { Component } from "react";
import { postImage } from "../../services/uploadService";

class ImageUploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    postImage(this.state.file).then(response =>
      this.props.onImageUploaded(response.newFileName)
    );
  };

  onFileChange = event => {
    this.setState({ file: event.target.files[0] });
  };

  render() {
    return (
      <div>
        <input type="file" className="custom-file-input" onChange={this.onFileChange} />
        <button onClick={this.handleSubmit} className="btn-default">Upload</button>
      </div>
    );
  }
}

export default ImageUploader;
