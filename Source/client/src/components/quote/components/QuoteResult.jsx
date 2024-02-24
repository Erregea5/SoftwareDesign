import React from "react";
import "../Quote.css";

const QuoteResult = ({ price, numGal }) => {
  return (
    <div>
      <h2>Suggested Price / Gallon: {price}</h2>
      <h2>Total Amount Due: {price * numGal}</h2>
      <br/>
    </div>
  );
};

export default QuoteResult;
