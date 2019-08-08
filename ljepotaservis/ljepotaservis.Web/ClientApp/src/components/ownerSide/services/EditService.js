import React, { Component } from "react";
import "../../../styling/owner/forms.css";
import DatePicker from "react-datepicker";

export default class EditService extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props.service
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.onAddService({ ...this.state });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleDurationChange = duration => {
    this.setState({ duration });
  };

  render() {
    const { name, price } = this.state;
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <h3>Uredi {name}</h3>
        <input
          type="text"
          name="name"
          value={name}
          placeholder="ime"
          onChange={this.handleChange}
        />
        <input
          type="number"
          name="price"
          value={price}
          placeholder="Cijena"
          onChange={this.handleChange}
          min="0"
        />
        <DatePicker
          selected={new Date(0, 0, 0, 0, 15)}
          onChange={this.handleDurationChange}
          showTimeSelect
          showTimeSelectOnly
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="HH:mm"
          timeCaption="Do"
          minTime={new Date(0, 0, 0, 0, 15)}
          maxTime={new Date(0, 0, 0, 5, 0)}
        />
        <button type="submit">Potvrdi</button>
        <button onClick={this.props.onEditClose}>Odustani</button>
      </form>
    );
  }
}
