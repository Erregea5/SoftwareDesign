import React from "react";
import FuelQuoteForm from "./components/FuelQuoteForm";
import "./Quote.css"; // Import CSS stylesheet

import { predictRateOfFuel } from "../../communication";

const Quote = () => {
  const handleSubmit = (gallonsRequested, deliveryDate) => {
    console.log("Form submitted with gallonsRequested:", gallonsRequested);
    console.log("Delivery date:", deliveryDate);

    // TODO
    const companyProfitMargin = 0.1;

    predictRateOfFuel(gallonsRequested, companyProfitMargin).then((data) => {
      console.log(data);
    });
  };

  return (
    <div className="card-container">
      <a className="back-button" href="./">
        Home
      </a>
      <div className="card">
        <FuelQuoteForm
          deliveryAddress="123 Main St, City, State, ZIP"
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Quote;
