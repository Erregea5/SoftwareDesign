import React from "react";
import "../Quote.css";

const QuoteResult = ({ price, numGal }) => {
  // Convert price and numGal to numbers
  const pricePerGallon = parseFloat(price);
  const gallons = parseFloat(numGal);
  console.log("pricePerGallon: ", pricePerGallon);
  console.log("gallons: ", gallons);

  // Calculate total amount due
  const totalAmountDue = pricePerGallon * gallons;

  return (
    <div>
      <h2>Suggested Price: ${pricePerGallon.toFixed(2)}/gal</h2>
      <h2>Total Amount Due: ${totalAmountDue.toFixed(2)}</h2>
      <br />
    </div>
  );
};

export default QuoteResult;
