import React, { Component } from "react";
import calendar from "calendar-js";

class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      year: this.props.selected.getFullYear(),
      month: this.props.selected.getMonth()
    };
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
    }).of(this.state.year, this.state.month);
    const today = new Date();

    return (
      <div>
        <h3>
          {date.month} {date.year}.
        </h3>
        {this.state.month === today.getMonth() ? null : (
          <button onClick={this.handlePreviousMonth}>{"<"}</button>
        )}
        <button onClick={this.handleNextMonth}>{">"}</button>
        {date.weekdaysAbbr.map((day, index) => (
          <span key={index}>{day}</span>
        ))}
        {date.calendar.map((week, weekIndex) => (
          <div key={weekIndex}>
            {week.map((day, dayIndex) => {
              if (day === 0) {
                return <button key={dayIndex} />;
              }

              if (
                day < today.getDate() &&
                this.state.month === today.getMonth()
              ) {
                return (
                  <button disabled key={dayIndex}>
                    {day}
                  </button>
                );
              }

              return (
                <button
                  onClick={() =>
                    this.props.onChange(
                      new Date(this.state.year, this.state.month, day)
                    )
                  }
                  key={dayIndex}
                >
                  {day}
                </button>
              );
            })}
          </div>
        ))}
        <button onClick={this.props.onSave}>Spremi</button>
      </div>
    );
  }
}

export default Calendar;
