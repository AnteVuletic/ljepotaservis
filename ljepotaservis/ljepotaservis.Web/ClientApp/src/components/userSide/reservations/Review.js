import React, { Component } from "react";
import Rating from "../../utilComponents/Rating";
import { setReservationRating } from "../../../services/userServices";

class Review extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.defaultScore)
    this.state = {
      rating: this.props.defaultScore,
      isSubmitted: false
    };
  }

  handleLeaveReview = () => {
    setReservationRating({ reservation: this.props.reservation, rating: this.state.rating})
    .then(response => {
      this.setState({
        isSubmitted: true
      });
    });
  };

  render() {
    return (
      <React.Fragment>
        {
          this.state.isSubmitted ? 
          <Rating
            colorClass={"star-pink"}
            score={this.state.rating}
          /> :
          <React.Fragment>
          <Rating
            colorClass={"star-pink"}
            score={this.state.rating}
            onChange={rating => this.setState({ rating })}
          />
          <button className="btn-base" onClick={this.handleLeaveReview}>Objavi recenziju</button>
          </React.Fragment>
        }
      </React.Fragment>
    );
  }
}

export default Review;
