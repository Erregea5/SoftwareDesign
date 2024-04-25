import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker"; // Import the datepicker component
import "react-datepicker/dist/react-datepicker.css"; // Import datepicker styles
import QuoteResult from "./QuoteResult";
import "../Quote.css";
import { fullfillPurchase } from "../../../communication"

const FuelQuoteForm = ({
  deliveryAddress,
  handleSubmit,
  suggestedPrice,
  gallonsRequested,
  setGallonsRequested,
}) => {
  const [deliveryDate, setDeliveryDate] = useState(new Date()); // Initialize deliveryDate state with current date
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false); // State to control visibility of the calendar
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!gallonsRequested) {
      alert("Please make sure to input the amount of gallons requested.");
      return;
    } else if (deliveryDate && deliveryDate.getTime() < (new Date()).getTime()) {
      alert("Please make sure the delivery date is in the future.");
      return;
    }
    
    handleSubmit(gallonsRequested, deliveryDate);
    setFormSubmitted(true);
  };

  const handleResetForm = () => {
    setGallonsRequested("");
    setDeliveryDate(new Date()); // Reset deliveryDate to current date
    setFormSubmitted(false);
  };

  const handleBuyNow = () => {
    fullfillPurchase().then(() => {
        alert("Purchase successful! You will now be redirected to your quote history page.");
        navigate("/history");
      }
    )
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar); // Toggle the visibility of the calendar
  };

  useEffect(() => {
    // Update gallonsRequested when suggestedPrice changes
    if (suggestedPrice !== -1 && gallonsRequested === "") {
      setGallonsRequested("1"); // Set a default value for gallonsRequested if it's empty
    }
  }, [suggestedPrice, gallonsRequested, setGallonsRequested]);

  return (
    <>
      <h1>Fuel Quote Form</h1>
      {!showCalendar && !formSubmitted && (
        <form onSubmit={handleFormSubmit} className="form">
          <div className="input-container">
            <label className="label">Gallons Requested:</label>
            <input
              type="number"
              value={gallonsRequested}
              onChange={(e) => setGallonsRequested(e.target.value)}
              required
              className="input"
              min="1"
            />
          </div>
          <div className="input-container">
            <label className="label">Delivery Address:</label>
            <input
              type="text"
              value={deliveryAddress}
              readOnly
              className="input"
            />
          </div>
          <div className="input-container">
            <label className="label">Delivery Date:</label>
            <button
              className="input datepicker-toggle" // Apply input styles to the datepicker toggle button
              onClick={toggleCalendar}
            >
              {deliveryDate.toLocaleDateString()}
            </button>
          </div>
          <button type="submit" className="submit-button">
            Get Quote
          </button>
        </form>
      )}
      {showCalendar && (
        <div className="calendar-container">
          <DatePicker
            selected={deliveryDate}
            onChange={(date) => {
              setDeliveryDate(date);
              toggleCalendar(); // Hide the calendar after a date is selected
            }}
            className="datepicker"
            inline
          />
        </div>
      )}
      {formSubmitted && (
        <div className="form-result">
          <QuoteResult price={suggestedPrice} numGal={gallonsRequested} />
          <button className="start-over" onClick={handleResetForm}>
            Start Over
          </button>
          <button className="buy-now" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      )}
    </>
  );
};

export default FuelQuoteForm;
