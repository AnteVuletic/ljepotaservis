import React, { Component } from "react";
import StoreList from "./StoreList";
import ServiceTypePicker from "./ServiceTypePicker";
import Calendar from "./Calendar";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: [{ id: 1, name: "Linea", score: 4, workingHours: "08-21" }],
      searchBar: "",
      selectedServiceType: null,
      dateTime: new Date(),
      filtersAreOpen: false
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: [e.target.value] });
  };

  handleDateChange = dateTime => {
    this.setState({ dateTime });
  };

  handleServiceTypeChange = selectedServiceType => {
    this.setState({ selectedServiceType });
  };

  handleFilter = () => {
    const { dateTime, selectedServiceType } = this.state;
    console.log({ dateTime, selectedServiceType });
    // request ode i puni state.stores
  };

  render() {
    const {
      searchBar,
      dateTime,
      stores,
      filtersAreOpen,
      selectedServiceType
    } = this.state;

    if (!selectedServiceType) {
      return (
        <ServiceTypePicker onServiceTypeChange={this.handleServiceTypeChange} />
      );
    }

    return (
      <div>
        <input
          type="text"
          name="searchBar"
          value={searchBar}
          onChange={this.handleChange}
          placeholder="Pretraži"
        />
        <div>
          <button
            onClick={() => this.setState({ filtersAreOpen: !filtersAreOpen })}
          >
            Datum
          </button>
          {filtersAreOpen ? (
            <Calendar
              selected={dateTime}
              onChange={this.handleDateChange}
              onSave={this.handleFilter}
            />
          ) : null}
        </div>
        <StoreList stores={stores} filter={this.state.searchBar} />
      </div>
    );
  }
}

export default Home;
