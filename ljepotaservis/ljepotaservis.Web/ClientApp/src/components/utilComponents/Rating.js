import React, { Component } from "react";

class Rating extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hoverScore: this.props.score,
      selectScore: this.props.score
    };
  }

  handleClick = score => {
    this.setState({ selectScore: score });
    if (this.props.onChange) {
      this.props.onChange(score);
    }
  };

  getScore = score => {
    let scoreElement = [];
    for (let itterator = 0; itterator < 5; itterator++) {
      parseInt(score, 10) <= itterator
        ? scoreElement.push(
            <i
              key={itterator}
              className={`fa fa-star empty ${this.props.colorClass}`}
              onMouseEnter={() => {
                this.setState({ hoverScore: itterator + 1 });
              }}
              onClick={() => this.handleClick(itterator + 1)}
            />
          )
        : scoreElement.push(
            <i
              key={itterator}
              className={`fa fa-star ${this.props.colorClass}`}
              onMouseEnter={() => this.setState({ hoverScore: itterator + 1 })}
              onClick={() => this.handleClick(itterator + 1)}
            />
          );
    }
    return scoreElement;
  };

  setScore() {
    return this.getScore(this.state.hoverScore);
  }

  render() {
    if (!this.props.onChange) {
      return <div>{this.getScore(this.props.score)}</div>;
    }

    return (
      <div
        onMouseLeave={() => {
          this.setState(state => ({ hoverScore: state.selectScore }));
        }}
      >
        {this.setScore()}
      </div>
    );
  }
}

export default Rating;
