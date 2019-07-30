import React, { Component } from "react";
import DatePicker from "react-datepicker";

class AddStore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      address: "",
      openingTime: new Date(),
      closingTime: new Date()
    };
  }

  handleChange = async event => {
    await this.setState({ [event.target.name]: event.target.value });
    this.props.onChange({ store: { ...this.state } });
  };

  handleOpeningTimeChange = async openingTime => {
    await this.setState({ openingTime });
    this.props.onChange({ store: { ...this.state } });
  };

  handleClosingTimeChange = async closingTime => {
    await this.setState({ closingTime });
    this.props.onChange({ store: { ...this.state } });
  };

  render() {
    const { name, address, openingTime, closingTime } = this.state;

    return (
      <div>
        <h3>Dodaj salon</h3>
        <input
          name="name"
          type="text"
          value={name}
          onChange={this.handleChange}
          placeholder="Ime salona"
        />
        <input
          name="address"
          type="text"
          value={address}
          onChange={this.handleChange}
          placeholder="Adresa"
        />
        <DatePicker
          selected={openingTime}
          onChange={this.handleOpeningTimeChange}
          showTimeSelect
          showTimeSelectOnly
          timeFormat="HH:mm"
          timeIntervals={30}
          dateFormat="HH:mm"
          timeCaption="Od"
          minTime={new Date().setHours(5)}
          maxTime={closingTime}
        />
        <DatePicker
          selected={closingTime}
          onChange={this.handleClosingTimeChange}
          showTimeSelect
          showTimeSelectOnly
          timeFormat="HH:mm"
          timeIntervals={30}
          dateFormat="HH:mm"
          timeCaption="Do"
          minTime={openingTime}
          maxTime={new Date().setHours(23)}
        />
      </div>
    );
  }
}

export default AddStore;