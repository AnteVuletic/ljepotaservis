import React, { Component } from "react";
import Rating from "../../utilComponents/Rating";

class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: this.props.defaultScore
    };
  }

  handleLeaveReview = () => {
    // http post leave review (ima this.props.reservation)
    //tribat ce nakon post requesta se pobrniti da komponenta iznad opet fetcha sve da ne ostane ova rezervacija kao da nema recenziju i nakon ostavljanja
  };

  render() {
    return (
      <React.Fragment>
        <Rating
          colorClass={"star-pink"}
          score={this.state.rating}
          onChange={rating => this.setState({ rating })}
        />
        <button onClick={this.handleLeaveReview}>Objavi recenziju</button>
      </React.Fragment>
    );
  }
}

export default Review;
