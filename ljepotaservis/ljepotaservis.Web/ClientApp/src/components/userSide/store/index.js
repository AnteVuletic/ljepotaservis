import React, { Component } from "react";
import ServicePicker from "./ServicePicker";
import {
  getStoreDetailById,
  makeReservation
} from "../../../services/storeService";
import EmployeePicker from "./EmployeePicker";
import DatePicker from "./DatePicker";
import PortfolioView from "./PortfolioView";
import ReservatiomSummary from "./ReservationSummary";
import "../../../styling/store/storedetail.css";
import Rating from "../../utilComponents/Rating";
import Popout from "../../popout/Popout";
import { connect } from "react-redux";

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
        date: new Date(),
        user: this.props.user.user
      },
      portfolios: [],
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
        };
      });
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
      reservation: { ...state.reservation, date: new Date(selectedDate) }
    }));
  };

  getServiceDurations = services => {
    const durations = services.map(service => {
      return service.duration;
    });
    return durations;
  };

  handleNextStep = () => {
    const { currentStep, reservation } = this.state;

    if (!this.props.user.loggedIn) {
      this.setState({
        read: false,
        message: "Za rezerviranje treba biti prijavljen"
      });
      return;
    }

    switch (currentStep) {
      case "Service pick":
        if (reservation.services.length < 1) {
          this.setState({
            read: false,
            message: "Odaberi barem jednu uslugu"
          });
          break;
        }
        this.setState({ currentStep: "Employee pick" });
        break;
      case "Employee pick":
        if (reservation.employee === null) {
          this.setState({
            read: false,
            message: "Odaberi zaposlenika"
          });
          break;
        }
        this.setState({ currentStep: "Date pick" });
        break;
      case "Date pick":
        this.setState({ currentStep: "Summary" });
        break;
      case "Summary":
        makeReservation({ ...this.state.reservation, storeId: this.state.id })
          .then(response => {
            response.ok ? 
            this.setState({
              currentStep: "Reservation complete",
              read: false,
              message: "Rezervacija završena"
            }) :
            this.setState({
              currentStep: "Reservation complete",
              read: false,
              message: "Problem prilikom rezervacije pokušajte ponovno kasnije"
            });
          }
          );
        break;
      case "Reservation complete":
        this.setState({
          currentStep: "Service pick" ,
          reservation: {
            services: [],
            employee: null,
            date: new Date(),
            user: this.props.user.user
          },
          read: false
        });
        break;
      default:
        break;
    }
  };

  handleAppoitmentPick = () => {
    this.setState({ currentStep: "Summary" });
  };

  render() {
    const {
      name,
      openCloseTime,
      services,
      address,
      employeeDetails,
      currentStep,
      imageName,
      score,
      message,
      read
    } = this.state;

    return (
      <main className="storedetail">
        <Popout
          read={read}
          message={message}
          closePopout={() => {
            currentStep === "Reservation complete" ? 
            this.handleNextStep():
            this.setState({ read: true });
          }}
        />
        <header
          className={
            currentStep === "Date pick"
              ? "storedetail__header--inivsible"
              : "storedetail__header"
          }
        >
          <div className="aspect__ratio">
            <div className="storedetail__header__content">
              <h1>Beauty salon {name}</h1>
              <h3>Adresa {address}</h3>
              <h3>Radno vrijeme: {openCloseTime}</h3>
              <Rating score={score} colorClass={"star-white"} />
            </div>
            <img
              src={`https://ljepotaservisweb.azurewebsites.net/images/${imageName}`}
              alt="Salon"
            />
          </div>
        </header>
        <div className={currentStep === "Service pick" || currentStep === "Portfolios" ? 'storedetail__navigation' : 'storedetail__navigation storedetail__navigation--invisible'}>
          <button className={currentStep === "Service pick" ? "storedetail__navigation--active" : ""} 
                  onClick={() => this.setState({ currentStep: "Service pick" })}>
            Rezerviranje
          </button>
          <button className={currentStep === "Portfolios" ? "storedetail__navigation--active" : ""}  
                  onClick={() => this.setState({ currentStep: "Portfolios" })}>
            Galerija
          </button>
        </div>
        {currentStep === "Portfolios" && <PortfolioView portfolios={this.state.portfolios} />}
        {currentStep === "Service pick" && (
          <ServicePicker
            services={services}
            onChange={this.handleServiceChange}
          />
        )}
        {currentStep === "Employee pick" && (
          <EmployeePicker
            employees={employeeDetails}
            currentEmployee={this.state.reservation.employee}
            onClick={this.handleEmployeeChange}
          />
        )}
        {currentStep === "Date pick" && (
          <DatePicker
            durations={this.getServiceDurations(
              this.state.reservation.services
            )}
            date={this.state.reservation.date}
            employee={this.state.reservation.employee}
            onChange={this.handleDateChange}
            onAppoitmentPicked={this.handleAppoitmentPick}
          />
        )}
        {currentStep === "Summary" && (
          <ReservatiomSummary
            reservation={this.state.reservation}
            employees={this.state.employeeDetails}
            store={this.state.store}
          />
        )}
        {currentStep === "Date pick" || currentStep === "Portfolios" ? null : (
          <button className="storedetail__next" onClick={this.handleNextStep}>
            {currentStep === "Summary" ? (
              "Rezerviraj"
            ) : (
              <span>
                Rezerviraj <i className="fas fa-arrow-right" />
              </span>
            )}
          </button>
        )}
      </main>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authentication
});

export default connect(mapStateToProps)(Store);
