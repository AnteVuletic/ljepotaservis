import React, { Component } from "react";
import { Well, Collapse, Button } from "react-bootstrap";
import Filters from "./Filters";
import StoreList from "./StoreList";
import { getAllStores } from "../../services/userServices";

const serviceOptions = [
  "All",
  "Female haircut",
  "Nails",
  "Make up",
  "Male haircut"
];

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: [],
      loading: true,
      searchBar: "",
      selectedService: "All",
      dateTime: null,
      filtersAreOpen: false
    };
  }

  componentDidMount() {
    getAllStores().then(stores => this.setState({ stores, loading: false }));
  }

  handleChange = e => {
    this.setState({ [e.target.name]: [e.target.value] });
  };

  handleSelect = eventKey => {
    this.setState({ selectedService: serviceOptions[eventKey] });
  };

  handleDateChange = dateTime => {
    this.setState({ dateTime });
  };

  render() {
    console.log(this.state);
    const {
      searchBar,
      selectedService,
      dateTime,
      stores,
      filtersAreOpen,
      loading
    } = this.state;

    return (
      <div style={{ margin: "5px", padding: "15px" }}>
        <input
          type="text"
          name="searchBar"
          value={searchBar}
          onChange={this.handleChange}
          placeholder="Search"
          style={{ width: "100%", height: "50px" }}
        />
        <br />
        <div style={{ margin: "5px 0px", width: "100%" }}>
          <Button
            onClick={() => this.setState({ filtersAreOpen: !filtersAreOpen })}
            bsStyle="success"
            bsSize="large"
            block
          >
            Filters
          </Button>
        </div>
        <br />
        <Collapse in={filtersAreOpen}>
          <div>
            <Well>
              <Filters
                selectedService={selectedService}
                onSelect={this.handleSelect}
                dateTime={dateTime}
                onDateChange={this.handleDateChange}
                serviceOptions={serviceOptions}
              />
            </Well>
          </div>
        </Collapse>
        {loading ? (
          <h3>Loading...</h3>
        ) : (
          <StoreList stores={stores} filter={`${searchBar}`} />
        )}
      </div>
    );
  }
}
