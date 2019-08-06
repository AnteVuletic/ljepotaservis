import React, { Component } from "react";
import Calendar from "../../utilComponents/Calendar";
import availableAppointmentCalculator from "../../../utils/availableAppointmentCalculator";

class DatePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: this.props.date,
      availabeAppointments: availableAppointmentCalculator(
        this.props.date,
        this.props.employee,
        this.props.duration
      )
    };
  }

  onDateChange = selectedDate => {
    this.setState({
      date: selectedDate,
      selectedDate: availableAppointmentCalculator(
        selectedDate,
        this.props.employee,
        this.props.duration
      )
    });
  };

  render() {
    return (
      <React.Fragment>
        <Calendar selected={this.state.date} onChange={this.onDateChange} />
        {this.state.availabeAppointments.map(appointment => {
          const appointmentToDate = new Date(appointment);
          return (
            <button
              key={appointment}
              onClick={() => this.props.onChange(appointmentToDate)}
            >
              {appointmentToDate.getHours()}:{appointmentToDate.getMinutes()}
            </button>
          );
        })}
      </React.Fragment>
    );
  }
}

export default DatePicker;
