import React, { useState } from "react";
import QuoteResult from "./QuoteResult";
import "../CryptowalletStyles.css";

const FuelQuoteForm = ({ deliveryAddress, handleSubmit }) => {
  const [gallonsRequested, setGallonsRequested] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [suggestedPrice, setSuggestedPrice] = useState(-1);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Function to handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (gallonsRequested && deliveryDate) {
      handleSubmit(gallonsRequested, deliveryDate);
      // mock price --------------- change when pricing module is made!!!
      setSuggestedPrice(3 * gallonsRequested);
      setFormSubmitted(true);
    }
  };

  // Function to reset form fields
  const handleResetForm = () => {
    setGallonsRequested("");
    setDeliveryDate("");
    setSuggestedPrice(-1);
    setFormSubmitted(false);
  };

  return (
    <>
      {formSubmitted ? (
        <>
          <QuoteResult price={suggestedPrice} numGal={gallonsRequested} />
          <button onClick={handleResetForm}>Start Over</button>
        </>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <label>
            Gallons Requested:
            <input
              type="number"
              value={gallonsRequested}
              onChange={(e) => setGallonsRequested(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Delivery Address:
            <input type="text" value={deliveryAddress} readOnly />
          </label>
          <br />
          <label>
            Delivery Date:
            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              required
            />
          </label>
          <br />
          <button type="submit">Get Quote</button>
        </form>
      )}
    </>
  );
};

export default FuelQuoteForm;
