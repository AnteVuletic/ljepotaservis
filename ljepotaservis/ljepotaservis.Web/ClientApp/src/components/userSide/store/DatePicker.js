import React, { Component } from "react";
import Calendar from "../../utilComponents/Calendar";
import "../../../styling/calendar/calendar.css";
import availableAppointmentCalculator from "../../../utils/availableAppointmentCalculator";

class DatePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(this.props.date),
      availabeAppointments: [...availableAppointmentCalculator(
        new Date(this.props.date),
        this.props.employee,
        this.props.durations
      )]
    };
  }

  onDateChange = selectedDate => {
    this.setState({
      date: new Date(selectedDate),
      availabeAppointments: availableAppointmentCalculator(
        new Date(selectedDate),
        this.props.employee,
        this.props.durations
      )
    });
  };

  render() {
    return (
      <React.Fragment>
      <header className="header__calendar">Odaberi datum</header>
        <Calendar selected={this.state.date} onChange={this.onDateChange} />
        <div className="appoitment__bottuns__wrapper">
          {this.state.availabeAppointments.map(appointment => {
            const appointmentToDate = new Date(appointment);
            return (
              <button
                className="btn-base"
                key={appointment}
                onClick={() => {
                  this.props.onChange(appointmentToDate);
                  this.props.onAppoitmentPicked();
                }}
              >
                {appointmentToDate.getHours()}:{appointmentToDate.getMinutes()}
              </button>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default DatePicker;
