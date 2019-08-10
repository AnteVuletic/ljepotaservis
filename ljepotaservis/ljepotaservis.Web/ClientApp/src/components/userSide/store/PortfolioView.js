import React, { Component } from "react";
import PortfolioModal from "./PortfolioModal";
import "../../../styling/store/portfolio.css";

class PortfolioView extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      portfolios: this.props.portfolios,
      currentPortfolio: null,
      isModalView: false
    };
  }

  closeModal = () => {
    this.setState({
      isModalView: false
    });
  }

  openModal = (portfolio) => {
    this.setState({
      currentPortfolio: portfolio,
      isModalView: true
    });
    
  }

  render() {
    return (
      <main className="portfolios__wrapper">
        {
          this.state.currentPortfolio ? 
          <PortfolioModal 
            portfolio={this.state.currentPortfolio} 
            isVisible={this.state.isModalView} 
            onChange={this.closeModal}
            portfolios={this.state.portfolios}
          /> : null
        }
        {
          this.state.portfolios.map(portfolio => 
            <div
              key={portfolio.id}
              onClick={() => this.openModal(portfolio)}
              className="aspect__ratio">
              <img src={`https://ljepotaservisweb.azurewebsites.net/images/${portfolio.imageName}`} alt="Slika alt" />
            </div>
          )
        }
      </main>
    );
  }
}

export default PortfolioView;
