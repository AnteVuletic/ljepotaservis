import React, { Component } from "react";
import ServicePicker from "./ServicePicker";
import EmployeePicker from "./EmployeePicker";
import DatePicker from "./DatePicker";
import ReservatiomSummary from "./ReservationSummary";

class Store extends Component {
  constructor(props) {
    super(props);

    this.state = {
      store: {
        id: null,
        name: "",
        address: "",
        openingTime: 8,
        closingTime: 14
      },
      employees: [],
      services: [],
      reservation: {
        services: [],
        employee: null,
        date: new Date()
      },
      currentStep: "Service pick"
    };
  }

  componentDidMount() {
    const storeId = this.props.match.params.id;
    //store, employees, services (storeDto) fetch by id ode
    const storeDto = {
      store: {
        id: this.props.match.params.id,
        name: "Store1",
        address: "store address 1",
        openingTime: 8,
        closingTime: 14
      },
      employees: [
        { id: 1, firstName: "teta", lastName: "Marija" },
        { id: 2, firstName: "teta", lastName: "Dubravka" }
      ],
      services: [
        {
          id: 1,
          name: "Brijanje",
          price: 120,
          duration: 15
        },
        {
          id: 2,
          name: "Sisanje",
          price: 150,
          duration: 60
        }
      ]
    };

    this.setState({
      store: { ...storeDto.store },
      employees: [...storeDto.employees],
      services: [...storeDto.services]
    });
  }

  handleServiceChange = selectedServices => {
    this.setState(state => ({
      reservation: { ...state.reservation, services: selectedServices }
    }));
  };

  handleEmployeeChange = selectedEmployee => {
    this.setState(state => ({
      reservation: { ...state.reservation, employee: selectedEmployee }
    }));
  };

  handleDateChange = selectedDate => {
    this.setState(state => ({
      reservation: { ...state.reservation, date: selectedDate }
    }));
  };

  handleNextStep = () => {
    const { currentStep, reservation } = this.state;
    switch (currentStep) {
      case "Service pick":
        if (reservation.services.length < 1) {
          alert("Odaberi barem jednu uslugu");
          break;
        }
        this.setState({ currentStep: "Employee pick" });
        break;
      case "Employee pick":
        if (reservation.employee === null) {
          alert("Odaberi zaposlenika");
          break;
        }
        this.setState({ currentStep: "Date pick" });
        break;
      case "Date pick":
        this.setState({ currentStep: "Summary" });
        break;
      case "Summary":
        console.log("the end");
        break;
    }
  };

  render() {
    const { store, employees, services, currentStep } = this.state;

    return (
      <div>
        <h1>Ime {store.name}</h1>
        <h3>Adresa {store.address}</h3>
        <h3>
          Radno vrijeme: {store.openingTime}-{store.closingTime}
        </h3>
        {currentStep === "Service pick" && (
          <ServicePicker
            services={services}
            onChange={this.handleServiceChange}
          />
        )}
        {currentStep === "Employee pick" && (
          <EmployeePicker
            employees={employees}
            onClick={this.handleEmployeeChange}
          />
        )}
        {currentStep === "Date pick" && (
          <DatePicker
            date={this.state.reservation.date}
            employee={this.state.reservation.employee}
            onChange={this.handleDateChange}
          />
        )}
        {currentStep === "Summary" && (
          <ReservatiomSummary
            reservation={this.state.reservation}
            store={this.state.store}
          />
        )}
        <button onClick={this.handleNextStep}>Sljedeći korak</button>
      </div>
    );
  }
}

export default Store;
