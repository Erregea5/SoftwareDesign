import React from "react";
import FuelQuoteForm from "./components/FuelQuoteForm";
import "./Quote.css"; // Import CSS stylesheet

import { predictRateOfFuel } from "../../communication";

const Quote = () => {
  const handleSubmit = (
    gallonsRequested,
    deliveryDate,
    companyProfitMargin
  ) => {
    console.log("Form submitted with gallonsRequested:", gallonsRequested);
    console.log("Delivery date:", deliveryDate);
    console.log("Company profit margin:", companyProfitMargin);

    predictRateOfFuel(
      parseInt(gallonsRequested),
      parseInt(companyProfitMargin)
    ).then((data) => {
      console.log(data);
    });
  };

  return (
    <div className="card-container">
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
