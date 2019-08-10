import React, { Component } from "react";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import StoreList from "./StoreList";
import ServiceTypePicker from "./ServiceTypePicker";
import { userService } from "../../../services/userServices";
import "../../../styling/filter/main.css";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: [],
      searchBar: "",
      selectedServiceType: "",
      neighborhood: "Sve",
      neighborhoods: []
    };
  }

  componentDidMount() {
    this.getStoreLocations();
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

  handleServiceTypeChange = async selectedServiceType => {
    await this.setState({ selectedServiceType });

    this.handleFilter();
  };

  handleFilter = () => {
    const { neighborhood, selectedServiceType, searchBar } = this.state;
    const filter = {
      storeType: selectedServiceType,
      name: searchBar,
      neighborhood
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
    userService.getStoreNeighborhoods().then(neighborhoods => {
      this.setState({
        neighborhoods
      });
    });
  };

  render() {
    const {
      searchBar,
      stores,
      selectedServiceType
    } = this.state;

    if (selectedServiceType === "") {
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
              this.setState({ selectedServiceType: "" });
            }}
            className={
              selectedServiceType ? "btn-base btn-has-value" : "btn-base"
            }
          >
            Usluge
          </button>
          <select
            name="neighborhood"
            value={this.state.neighborhood}
            onChange={this.handleChange}
            className={
              this.state.neighborhood !== "Sve"
                ? "btn-base btn-has-value"
                : "btn-base"
            }
          >
            <option value="Sve">Sve</option>
            {this.state.neighborhoods.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </header>
        <StoreList stores={stores} />
      </React.Fragment>
    );
  }
}

export default Home;
