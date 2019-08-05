import React, { Component } from "react";
import StoreList from "./StoreList";
import ServiceTypePicker from "./ServiceTypePicker";
import Calendar from "./Calendar";
import { userService } from "../../../services/userServices";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: [],
      searchBar: "",
      selectedServiceType: null,
      dateTime: new Date(),
      filtersAreOpen: false
    };
  }

  componentDidMount(){
    this.loadFilteredStores();
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
    const { dateTime, selectedServiceType, searchBar } = this.state;
    const filter = {
      dateOfReservation: dateTime,
      storeType: selectedServiceType,
      name: searchBar
    }
    this.loadFilteredStores(filter);
  };

  loadFilteredStores = (filters) => {
    userService.searchStores(filters)
      .then(stores => {
        this.setState({
          stores
        });
      });
  }

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
