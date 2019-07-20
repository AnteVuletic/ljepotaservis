import React, { Component } from "react";
import { Well, Collapse, Button } from "react-bootstrap";
import Filters from "./Filters";
import StoreList from "./StoreList";

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
      stores: [
        {
          id: 1,
          name: "Linea",
          score: 4,
          address: "Tavelićeva 7",
          workingHours: "08-20"
        },
        {
          id: 2,
          name: "Linea2",
          score: 4.5,
          address: "Tavelićeva 22",
          workingHours: "08-21"
        },
        {
          id: 3,
          name: "Linea3",
          score: 4,
          address: "Tavelićeva 7",
          workingHours: "08-24"
        },
        {
          id: 4,
          name: "Linea4",
          score: 4,
          address: "Tavelićeva 7",
          workingHours: "08-24"
        }
      ],
      searchBar: "",
      selectedService: "All",
      dateTime: null,
      filtersAreOpen: false
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: [e.target.value] });
  };

  handleSelect = eventKey => {
    this.setState({ selectedService: serviceOptions[eventKey] });
  };

  handleDateChange = dateTime => {
    const minutes = dateTime.getMinutes();
    switch (true) {
      case minutes >= 0 && minutes <= 14:
        dateTime.setMinutes(0);
        break;
      case minutes > 14 && minutes <= 44:
        dateTime.setMinutes(30);
        break;
      case minutes > 44 && minutes <= 59:
        dateTime.setHours(dateTime.getHours() + 1);
        dateTime.setMinutes(0);
        break;
      default:
        return;
    }

    this.setState({ dateTime });
  };

  render() {
    const {
      searchBar,
      selectedService,
      dateTime,
      stores,
      filtersAreOpen
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

        <StoreList stores={stores} />
      </div>
    );
  }
}
