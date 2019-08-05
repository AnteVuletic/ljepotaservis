import React, { Component } from "react";
import ServicePicker from "./ServicePicker";
import { getStoreDetailById } from "../../../services/storeService";
import EmployeePicker from "./EmployeePicker";
import DatePicker from "./DatePicker";
import ReservatiomSummary from "./ReservationSummary";
import "../../../styling/store/storedetail.css";
import Rating from "../../utilComponents/Rating";
import Popout from "../../popout/Popout";

class Store extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      name: "",
      address: "",
      openCloseTime: "",
      openTime: new Date(),
      closeTime: new Date(),
      score: 0,
      imageName: "",
      type: "",
      employeeDetails: [],
      services: [],
      reservation: {
        services: [],
        employee: null,
        date: new Date()
      },
      currentStep: "Service pick",
      message: "",
      read: true
    };
  }

  componentDidMount() {
    const storeId = this.props.match.params.id;
    getStoreDetailById(storeId).then(storeDetail => {
      this.setState(prevState => {
        return {
          ...prevState,
          ...storeDetail
        }
      })
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
          this.setState({
            read: false,
            message: "Odaberi barem jednu uslugu"
          })
          break;
        }
        this.setState({ currentStep: "Employee pick" });
        break;
      case "Employee pick":
        if (reservation.employee === null) {
          this.setState({
            read: false,
            message: "Odaberi zaposlenika" 
          })
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
    const { name, openCloseTime, services, address, employeeDetails, currentStep, imageName, score, message, read } = this.state;

    return (
      <main className="storedetail">
        <Popout read={read} message={message} closePopout={() => {this.setState({ read: true})}}></Popout>
        <header className="storedetail__header">
          <div className="aspect__ratio">
            <div className="storedetail__header__content">
              <h1>Beauty salon {name}</h1>
              <h3>Adresa {address}</h3>
              <h3>
                Radno vrijeme: {openCloseTime}
              </h3>
              <Rating score={score} colorClass={"star-white"}/>
            </div>
            <img src={`https://localhost:44349/images/${imageName}`}/>
          </div>
        </header>
        {currentStep === "Service pick" && (
          <ServicePicker
            services={services}
            onChange={this.handleServiceChange}
          />
        )}
        {currentStep === "Employee pick" && (
          <EmployeePicker
            employees={employeeDetails}
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
        <button className="storedetail__next" onClick={this.handleNextStep}>Sljedeći korak <i className="fas fa-arrow-right"></i></button>
      </main>
    );
  }
}

export default Store;
