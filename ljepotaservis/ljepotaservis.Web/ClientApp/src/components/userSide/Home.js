import React, { Component } from "react";
import { Well, Collapse, Button } from "react-bootstrap";
import ReactLoading from "react-loading";
import Filters from "../userSide/Filters";
import StoreList from "../userSide/StoreList";
import { getAllStores } from "../../services/userServices";

// Temporary
const serviceOptions = [
  "Sve",
  "Žensko šišanje",
  "Nokti",
  "Šminkanje",
  "Muško šišanje"
];

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: [],
      loading: true,
      searchBar: "",
      selectedService: "Sve",
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
    const {
      searchBar,
      selectedService,
      dateTime,
      stores,
      filtersAreOpen,
      loading
    } = this.state;
    return (
      <div>
        <div style={{ margin: "5px", padding: "15px" }}>
          <input
            type="text"
            name="searchBar"
            value={searchBar}
            onChange={this.handleChange}
            placeholder="Pretraži"
            style={{ width: "100%", height: "50px" }}
          />
          <div style={{ margin: "5px 0px", width: "100%" }}>
            <Button
              onClick={() => this.setState({ filtersAreOpen: !filtersAreOpen })}
              bsStyle="success"
              bsSize="large"
              block
            >
              Filteri
            </Button>
          </div>
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
            <ReactLoading
              type="bars"
              color="#4cae4c"
              height={"50px"}
              width={"50px"}
            />
          ) : (
            <StoreList stores={stores} filter={`${searchBar}`} />
          )}
        </div>
      </div>
    );
  }
}

export default Home;
