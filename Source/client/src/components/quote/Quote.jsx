import React, { useState } from "react";
import FuelQuoteForm from "./components/FuelQuoteForm";
import "./Quote.css"; // Import CSS stylesheet

import { predictRateOfFuel } from "../../communication";

const Quote = () => {
  const [suggestedPrice, setSuggestedPrice] = useState(-1);
  const [gallonsRequested, setGallonsRequested] = useState("");

  const handleSubmit = (gallonsRequested, deliveryDate) => {
    console.log("Form submitted with gallonsRequested:", gallonsRequested);
    console.log("Delivery date:", deliveryDate);

    predictRateOfFuel(parseFloat(gallonsRequested), 0.1).then((data) => {
      console.log("Data: ", data);

      setSuggestedPrice(data.quote.rate);
      setGallonsRequested(data.quote.gallonsRequested);
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
          suggestedPrice={suggestedPrice} // Pass suggestedPrice here
          gallonsRequested={gallonsRequested}
          setGallonsRequested={setGallonsRequested}
        />
      </div>
    </div>
  );
};

export default Quote;
