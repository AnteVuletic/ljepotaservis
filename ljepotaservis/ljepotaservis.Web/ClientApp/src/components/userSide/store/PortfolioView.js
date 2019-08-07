import React, { Component } from "react";

class PortfolioView extends Component {
  constructor(props) {
    super(props);

    this.state = { portfolios: [] };
  }

  componentDidMount() {
    // portfolio get here
    this.setState({
      portfolios: [
        { id: 1, description: "Frizura" },
        { id: 2, description: "Jos jedna rizura" }
      ]
    });
  }

  render() {
    return (
      <ul>
        {this.state.portfolios.map(portfolio => (
          <li key={portfolio.id}>{portfolio.description}</li>
        ))}
      </ul>
    );
  }
}

export default PortfolioView;
