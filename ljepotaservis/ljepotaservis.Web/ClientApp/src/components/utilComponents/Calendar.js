import React, { Component } from "react";
import calendar from "calendar-js";
import "../../styling/calendar/calendar.css";

class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      year: this.props.selected.getFullYear(),
      month: this.props.selected.getMonth(),
      daySelected: this.props.selected.getDate()
    };
  }

  componentDidUpdate(previousProps) {
    if (
      previousProps.selected.getFullYear() !==
        this.props.selected.getFullYear() ||
      previousProps.selected.getMonth() !== this.props.selected.getMonth() ||
      previousProps.selected.getDate() !== this.props.selected.getDate()
    )
      this.setState({
        year: this.props.selected.getFullYear(),
        month: this.props.selected.getMonth(),
        daySelected: this.props.selected.getDate()
      });
  }

  handleNextMonth = () => {
    if (this.state.month === 11) {
      this.setState(state => ({ year: state.year + 1, month: 0 }));
      return;
    }
    this.setState(state => ({ month: state.month + 1 }));
  };

  handlePreviousMonth = () => {
    if (this.state.month === 0) {
      this.setState(state => ({ year: state.year - 1, month: 11 }));
      return;
    }
    this.setState(state => ({ month: state.month - 1 }));
  };

  render() {
    const { year, month, daySelected } = this.state;
    const date = calendar({
      months: [
        "Siječanj",
        "Veljača",
        "Ožujak",
        "Travanj",
        "Svibanj",
        "Lipanj",
        "Srpanj",
        "Kolovoz",
        "Rujan",
        "Listopad",
        "Studeni",
        "Prosinac"
      ],
      weekdays: [
        "Ponedjeljak",
        "Utorak",
        "Srijeda",
        "Četvrtak",
        "Petak",
        "Subota",
        "Nedjelja"
      ]
    }).of(year, month);
    const today = new Date();

    return (
      <div className="calendar__wrapper">
        <div className="calendar__header">
          {this.state.month === today.getMonth() ? (
            <span />
          ) : (
            <button onClick={this.handlePreviousMonth}>
              <i className="fas fa-chevron-left" />
            </button>
          )}
          <h3>
            {date.month} {date.year}.
          </h3>
          <button onClick={this.handleNextMonth}>
            <i className="fas fa-chevron-right" />
          </button>
        </div>
        <table className="calendar__main">
          <thead>
            <tr>
              {date.weekdaysAbbr.map((day, index) => (
                <th key={index}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {date.calendar.map((week, weekIndex) => (
              <tr key={weekIndex}>
                {week.map((day, dayIndex) => {
                  if (day === 0) {
                    return <td key={dayIndex} />;
                  }
                  if (
                    day < today.getDate() &&
                    this.state.month === today.getMonth()
                  ) {
                    return (
                      <td
                        disabled
                        key={dayIndex}
                        className="calendar__disabled__cell"
                      >
                        {day}
                      </td>
                    );
                  }
                  return (
                    <td
                      className={
                        day === daySelected &&
                        this.state.month === this.props.selected.getMonth() &&
                        this.state.year === this.props.selected.getFullYear()
                          ? "calendar__selected__cell"
                          : null
                      }
                      onClick={() =>
                        this.props.onChange(new Date(year, month, day))
                      }
                      key={dayIndex}
                    >
                      {day}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="calendar__footer">
          {this.props.onSave ? (
            <button onClick={this.props.onSave}>Spremi</button>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Calendar;
