import React, { Component } from "react";
import ImageUploader from "../../utilComponents/ImageUploader";
import "../../../styling/owner/forms.css";
import DatePicker from "react-datepicker";

export default class NewEmployee extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      imageName: "",
      startOfShift: new Date(),
      endOfShift: new Date()
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.onAddEmployee({ ...this.state });
    this.setState({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      imageName: "",
      startOfShift: new Date(),
      endOfShift: new Date()
    });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleImageName = imageName => {
    this.setState({ imageName });
  };

  handleStartOfShiftChange = startOfShift => {
    this.setState({ startOfShift });
  };

  handleEndOfShiftChange = endOfShift => {
    this.setState({ endOfShift })
  };

  render() {
    const { openTime, closeTime } = this.props;
    const { firstName, lastName, username, email, password, startOfShift, endOfShift } = this.state;
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="firstName"
          value={firstName}
          placeholder="Ime"
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="lastName"
          value={lastName}
          placeholder="Prezime"
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="username"
          value={username}
          placeholder="Korisničko ime"
          onChange={this.handleChange}
        />
        <input
          type="email"
          name="email"
          value={email}
          placeholder="E-mail"
          onChange={this.handleChange}
        />
        <label>Start of shift</label>
        <DatePicker
          selected={startOfShift}
          onChange={this.handleStartOfShiftChange}
          showTimeSelect
          showTimeSelectOnly
          timeFormat="HH:mm"
          timeIntervals={30}
          dateFormat="HH:mm"
          timeCaption="Do"
          minTime={openTime}
          maxTime={closeTime}
        />
        <label>End of shift</label>
        <DatePicker
          selected={endOfShift}
          onChange={this.handleEndOfShiftChange}
          showTimeSelect
          showTimeSelectOnly
          timeFormat="HH:mm"
          timeIntervals={30}
          dateFormat="HH:mm"
          timeCaption="Do"
          minTime={openTime}
          maxTime={closeTime}
        />
        <ImageUploader onImageUploaded={this.handleImageName} />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Lozinka"
          onChange={this.handleChange}
        />
        <button type="submit" className="btn-default">Dodaj zaposlenika</button>
      </form>
    );
  }
}
