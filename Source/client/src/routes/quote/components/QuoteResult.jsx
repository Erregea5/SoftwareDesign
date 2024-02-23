import React from "react";

const QuoteResult = ({ price, numGal }) => {
  return (
    <div>
      <h2>Suggested Price / Gallon: {price}</h2>
      <br />
      <h2>Total Amount Due: {price * numGal}</h2>
    </div>
  );
};

export default QuoteResult;
