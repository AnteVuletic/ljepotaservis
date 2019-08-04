import React, { Component } from "react";
import { logout } from "../../store/actions/authActions";
import { connect } from "react-redux";
import "../../styling/navbar/navbar.css";

class NavbarTemplet extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      isClosed: true
    }
  }

  handleToggle = (event) => {
    event.preventDefault();
    this.setState(prevState => {
      return { isClosed: !prevState.isClosed}
    })
  }
  
  preventPropagation = (event) => {
    event.stopPropagation();
  }

  render(){
    const { isClosed } = this.state;
    const { role, navigation, logout } = this.props;

    return (
      <React.Fragment>
      <div className="navigation__wrapper">
        <button className="navigation__toggle" onClick={this.handleToggle}>
          <span></span>
        </button> 
      </div>
      <nav 
        className={isClosed ? 'navigation__wrapper--closed' : "navigation__wrapper--open"}
        onClick={this.handleToggle}
        >
        <div className="navigation__content" onClick={this.preventPropagation}>
          <a href={navigation.homePath}>Ljepota servis logo</a>
            {navigation.items.map((item, index) => (
              <a
                className="navigation__item"
                key={index} 
                href={item.path}
                >
                {item.text}
              </a>
            ))}
          <button 
          className="navigation__logout"
          onClick={logout}>
              <a href="/">Odjavi se</a>
          </button>
        </div>
      </nav>
      </React.Fragment>
    );
  }
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavbarTemplet);
