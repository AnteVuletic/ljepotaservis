import React, { Component } from 'react';
import "../../../styling/store/portfolio.css";

class PortfolioModal extends Component {
    constructor(props){
        super(props);

        this.state = {
            portfolios: this.props.portfolios,
            portfolioIndex: this.props.portfolios.findIndex(port => port.id === this.props.portfolio.id)
        }
    }

    portfolioNext = () => {
        this.setState(prevState => {
            return {
                portfolioIndex: ++prevState.portfolioIndex
            };
        });
    }

    portfolioPrevious = () => {
        this.setState(prevState => {
            return {
                portfolioIndex: --prevState.portfolioIndex
            };
        });
    }

    render(){
        const portfolio = this.state.portfolios[this.state.portfolioIndex];
        return (
        <div 
            className={this.props.isVisible ? "modal__container--visible" : "modal__container--invisible"} 
            onClick={this.props.onChange}
        >
            <div className="portfolio__tile" onClick={(event) => event.stopPropagation()}>
                <div onClick={this.portfolioPrevious} className={this.state.portfolioIndex === 0 ? 'cheveron--invisible' : 'cheveron__wrapper--left'}>
                    <i className="fas fa-chevron-left"></i>
                </div>
                <div className="aspect__ratio">
                    <img src={`https://localhost:44349/images/${portfolio.imageName}`} alt="Svi smo mi duje" />
                </div>
                <div className="portfolio__tile__description">
                    {portfolio.description}
                </div>
                <div onClick={this.portfolioNext} className={this.state.portfolios.length - 1 === this.state.portfolioIndex ? 'cheveron--invisible' : 'cheveron__wrapper--right'}>
                    <i className="fas fa-chevron-right"></i>
                </div>
            </div>
        </div>);
    }
    
}
export default PortfolioModal;