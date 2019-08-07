import React, { Component } from "react";
import NewPortfolio from "./NewPortfolio";

class Portfolios extends Component {
  constructor(props) {
    super(props);

    this.setState = {
      portfolios: []
    };
  }

  componentDidMount() {
    // get portfolios and setState
  }

  handleAddPortfolio = portfolioToAdd => {
    // add portfolio service here
  };

  handleRemove = portfolio => {
    // remove service here
  };

  render() {
    return (
      <div>
        <h3>Portfolios</h3>
        <ul>
          {this.state.portfolios.map(portfolio => (
            <li key={portfolio.id}>
              <img src={portfolio.imageName} alt="Portfolio" />
              <p>Opis: {portfolio.description}</p>
              <button onClick={() => this.handleRemove(portfolio)}>
                Obriši portfolio
              </button>
            </li>
          ))}
        </ul>
        <NewPortfolio onAddPortfolio={this.handleAddPortfolio} />
      </div>
    );
  }
}

export default Portfolios;
