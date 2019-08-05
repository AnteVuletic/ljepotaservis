import React, { Component } from "react";

class ServicePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedItems: []
    };
  }

  handleChange = async (event, service) => {
    if (event.target.checked) {
      await this.setState(state => ({
        checkedItems: [...state.checkedItems, service]
      }));
    } else {
      await this.setState(state => ({
        checkedItems: state.checkedItems.filter(item => item.id !== service.id)
      }));
    }

    this.props.onChange(this.state.checkedItems);
  };

  render() {
    return (
      <form>
        <h5>Odaberite usluge:</h5>
        {this.props.services.map(service => (
          <div key={service.id}>
            <input
              type="checkbox"
              onChange={event => this.handleChange(event, service)}
            />
            <label>{service.name}</label>
          </div>
        ))}
      </form>
    );
  }
}

export default ServicePicker;
