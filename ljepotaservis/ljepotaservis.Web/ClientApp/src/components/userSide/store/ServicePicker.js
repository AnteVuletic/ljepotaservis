import React, { Component } from "react";
import "../../../styling/store/servicepicker.css";

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
      <form className="servicepicker">
        <h5 className="servicepicker__header">Odaberite usluge</h5>
        <table className="servicepicker__service__container">
          <thead>
            <tr>
              <th>
                Naziv
              </th>
              <th>
                Cijena
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.services.map(service => (
              <tr 
                key={service.id} 
                className={this.state.checkedItems.find(srv => srv.id == service.id) != undefined ? 'service__item service__item--selected' : "service__item"}
              >
                <td>
                  <span className="servicepicker__service__name">
                    {service.name}
                  </span>
                  <span className="servicepicker__service__duration">
                    {service.duration.slice(0,5)} hh:min
                  </span>
                </td>
                <td>
                  {service.price} kn
                </td>
                <td>
                  <input
                      type="checkbox"
                      id="toggle"
                      onChange={event => this.handleChange(event, service)}
                    />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    );
  }
}

export default ServicePicker;
