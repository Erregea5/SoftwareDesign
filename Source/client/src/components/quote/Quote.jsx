import React from "react";
import FuelQuoteForm from "./components/FuelQuoteForm";
import "./Quote.css"; // Import CSS stylesheet

const Quote = () => {
  const handleSubmit = (gallonsRequested, deliveryDate) => {
    console.log("Form submitted with gallonsRequested:", gallonsRequested);
    console.log("Delivery date:", deliveryDate);
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

