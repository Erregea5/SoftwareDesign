// YourComponent.jsx
import React from "react";
import "react-datepicker/dist/react-datepicker.css"; // Import default styles
import "./Quote.css";
import DatePicker from "react-datepicker"; // Import the datepicker component

const MyDatePicker = () => {
  const [startDate, setStartDate] = React.useState(null);

  return (
    <div>
      <h1>Select a Date:</h1>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        dateFormat="MM/dd/yyyy"
        placeholderText="Select date"
      />
    </div>
  );
};

export default MyDatePicker;
