import React, { Component } from "react";
import NewPortfolio from "./NewPortfolio";
import { getAllPortfolios, addEditPortfolio } from "../../../services/ownerServices";
import EditPortfolio from "./EditPortfolio";
import "../../../styling/owner/portfolios.css";

class Portfolios extends Component {
  constructor(props) {
    super(props);

    this.state = {
      portfolios: [],
      portfolioBeingEdited: null
    };
  }

  componentDidMount() {
    this.loadPortfolio();
  }

  loadPortfolio = () => {
    getAllPortfolios()
    .then(portfolios => {
      this.setState({
        portfolios: [...portfolios]
      });
    });
  }

  handleAddPortfolio = portfolioToAdd => {
    const portfolios = [...this.state.portfolios, portfolioToAdd];

    addEditPortfolio(portfolios).then(() => {
      this.loadPortfolio();
    });
  };

  handleRemove = portfolio => {
    const portfolios = this.state.portfolios.filter(port => port.id !== portfolio.id);

    addEditPortfolio(portfolios).then(() => {
      this.loadPortfolio();
    });
  };

  render() {
    return (
      <div>
        <h3 className="header">Portfolios</h3>
        <table className="portfolio__overview">
          <thead>
            <tr>
              <th className="portfolio__image">
                Image
              </th>
              <th className="portfolio__description">
                Description
              </th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.portfolios.map(portfolio => (
              <tr key={portfolio.id}>
                <td className="portfolio__image">
                  <div className="aspect__ratio">
                    <img src={`https://localhost:44349/images/${portfolio.imageName}`} alt="Portfolio" />
                  </div>
                </td>
                <td className="portfolio__description">{portfolio.description}</td>
                <td>
                  <button onClick={() => this.handleRemove(portfolio)}>
                    <i className="fas fa-trash" aria-hidden="true"></i>
                  </button>
                </td>
                <td>
                  <button onClick={() => {this.setState({ portfolioBeingEdited: portfolio })}}>
                    <i className="fas fa-edit" aria-hidden="true"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <NewPortfolio onAddPortfolio={this.handleAddPortfolio} />
        {
          this.state.portfolioBeingEdited ? <EditPortfolio portfolio={this.state.portfolioBeingEdited} /> : null
        }
      </div>
    );
  }
}

export default Portfolios;
