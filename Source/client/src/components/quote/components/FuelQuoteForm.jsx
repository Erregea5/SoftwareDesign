import React, { useState } from "react";
import DatePicker from "react-datepicker"; // Import the datepicker component
import "react-datepicker/dist/react-datepicker.css"; // Import datepicker styles
import QuoteResult from "./QuoteResult";
import "../Quote.css";

const FuelQuoteForm = ({ deliveryAddress, handleSubmit }) => {
  const [gallonsRequested, setGallonsRequested] = useState("");
  const [deliveryDate, setDeliveryDate] = useState(new Date()); // Initialize deliveryDate state with current date
  const [suggestedPrice, setSuggestedPrice] = useState(-1);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false); // State to control visibility of the calendar

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (gallonsRequested && deliveryDate) {
      handleSubmit(gallonsRequested, deliveryDate);
      setSuggestedPrice(3 * gallonsRequested); // Mock price, change as needed
      setFormSubmitted(true);
    }
  };

  const handleResetForm = () => {
    setGallonsRequested("");
    setDeliveryDate(new Date()); // Reset deliveryDate to current date
    setSuggestedPrice(-1);
    setFormSubmitted(false);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar); // Toggle the visibility of the calendar
  };

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
          <button className="submit-button" onClick={handleResetForm}>
            Start Over
          </button>
        </div>
      )}
    </>
  );
};

export default FuelQuoteForm;
