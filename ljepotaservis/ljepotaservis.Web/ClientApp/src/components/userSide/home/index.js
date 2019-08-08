import React, { Component } from "react";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import StoreList from "./StoreList";
import ServiceTypePicker from "./ServiceTypePicker";
import Calendar from "../../utilComponents/Calendar";
import { userService } from "../../../services/userServices";
import "../../../styling/filter/main.css";

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

  componentDidMount() {
    this.loadFilteredStores();
  }

  handleChange = e => {
    this.setState({ [e.target.name]: [e.target.value] });

    const debouncedFilterRequest = AwesomeDebouncePromise(
      this.handleFilter,
      1000
    );
    debouncedFilterRequest();
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
    };
    this.loadFilteredStores(filter);
  };

  loadFilteredStores = filters => {
    userService.searchStores(filters).then(stores => {
      this.setState({
        stores
      });
    });
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
      <React.Fragment>
        <input
          type="text"
          name="searchBar"
          value={searchBar}
          onChange={this.handleChange}
          placeholder="Pretraži"
          className="filter__input"
        />
        <header className="filter__group">
          <button
            onClick={() => {
              this.setState({ selectedServiceType: false });
            }}
            className={
              selectedServiceType ? "btn-base btn-has-value" : "btn-base"
            }
          >
            Usluge
          </button>
          <button
            onClick={() => this.setState({ filtersAreOpen: !filtersAreOpen })}
            className={
              this.state.dateTime === new Date()
                ? "btn-base btn-has-value"
                : "btn-base"
            }
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
        </header>
        <StoreList stores={stores} />
      </React.Fragment>
    );
  }
}

export default Home;
