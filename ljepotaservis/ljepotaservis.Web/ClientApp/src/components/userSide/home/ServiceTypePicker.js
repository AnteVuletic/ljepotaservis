import React from "react";
import "../../../styling/filter/filter.css";
import CosmeticImage from "../../../assets/images/filter__cosmetic.png";
import BarberImage from "../../../assets/images/filter__barber.png";

const ServiceTypePicker = props => (
  <div className="filter__container">
    <header className="filter__header">
      <h1>Odaberi vrstu usluge</h1>
    </header>
    <main className="filter__main">
      <article
        onClick={() => props.onServiceTypeChange("Hairdressing")}
        className="filter__main__barber"
      >
        <img src={BarberImage} alt="Frizerske" className="btn-base" />
        <h2>Firzerske usluge</h2>
      </article>
      <article
        onClick={() => props.onServiceTypeChange("Cosmetic")}
        className="filter__main__cosmetic"
      >
        <img src={CosmeticImage} alt="Kozmetičke" className="btn-base" />
        <h2>Kozmetičke usluge</h2>
      </article>
      <button
        className="filter__main__all btn-base"
        onClick={() => props.onServiceTypeChange("All")}
      >
        Pretraži sve salone
      </button>
    </main>
  </div>
);

export default ServiceTypePicker;
