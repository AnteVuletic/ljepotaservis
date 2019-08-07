import React, { Component } from "react";
import "../../../styling/owner/forms.css";
import DatePicker from "react-datepicker";

export default class NewService extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      price: 0,
      duration: 0
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.props.onAddService({ ...this.state });
    await this.setState({ name: "", price: 0, duration: 0, imageName: "" });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleImageName = imageName => {
    this.setState({ imageName });
  };

  handleDurationChange = duration => {
    this.setState({ duration });
  };

  render() {
    const { name, price, duration } = this.state;
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Ime usluge"
          onChange={this.handleChange}
        />
        <label>
          Cijena
        </label>
        <input
          type="number"
          name="price"
          value={price}
          placeholder="Cijena"
          onChange={this.handleChange}
          min="0"
        />
        <label>
          Trajanje
        </label>
        <DatePicker
          selected={duration}
          onChange={this.handleDurationChange}
          showTimeSelect
          showTimeSelectOnly
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="HH:mm"
          timeCaption="Do"
          minTime={new Date(0, 0, 0, 0, 15)}
          maxTime={new Date(0, 0 , 0, 5, 0)}
        />
        <button type="submit">Dodaj uslugu</button>
      </form>
    );
  }
}
