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
      dateTime: null,
      calendarIsOpen: false,
      storeLocation: "Sve"
    };
  }

  componentDidMount() {
    this.loadFilteredStores();
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.handleFilter();
  };

  handleTextChange = event => {
    this.setState({ [event.target.name]: event.target.value });

    const debouncedFilterRequest = AwesomeDebouncePromise(
      this.handleFilter,
      1000
    );
    debouncedFilterRequest();
  };

  handleDateChange = dateTime => {
    this.setState({ dateTime });
    this.handleFilter();
  };

  handleServiceTypeChange = selectedServiceType => {
    this.setState({ selectedServiceType });

    this.handleFilter();
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

  getStoreLocations = () => {
    // request types
    // na promjenu lokacije se okida get po filterima samo sta u filtere jos nisam dodava lokaciju tako da ne filtrira ovo po lokaciji jos, trebamo se i dogovorit kako cemo handelat lokaciju "Sve" to bi trebalo bit isto ko da nema filter po lokaciji
    return ["Sve", "Gripe", "ST3", "Manuš"];
  };

  render() {
    const {
      searchBar,
      dateTime,
      stores,
      calendarIsOpen,
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
          onChange={this.handleTextChange}
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
            onClick={() => this.setState({ calendarIsOpen: !calendarIsOpen })}
            className={
              this.state.dateTime ? "btn-base btn-has-value" : "btn-base"
            }
          >
            Datum
          </button>
          <select
            name="storeLocation"
            value={this.state.storeLocation}
            onChange={this.handleChange}
            className={
              this.state.storeLocation !== "Sve"
                ? "btn-base btn-has-value"
                : "btn-base"
            }
          >
            {this.getStoreLocations().map(location => (
              <option key={location}>{location}</option>
            ))}
          </select>
        </header>
        {calendarIsOpen ? (
          <Calendar
            selected={dateTime ? dateTime : new Date()}
            onChange={this.handleDateChange}
          />
        ) : null}
        <StoreList stores={stores} />
      </React.Fragment>
    );
  }
}

export default Home;
