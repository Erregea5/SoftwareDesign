// import React, { useState } from "react";
// import FuelQuoteForm from "./components/FuelQuoteForm";

// const Quote = () => {
//   // Define handleSubmit function
//   const handleSubmit = (gallonsRequested, deliveryDate) => {
//     // Perform form submission logic here
//     console.log("Form submitted with gallonsRequested:", gallonsRequested);
//     console.log("Delivery date:", deliveryDate);
//     // can perform additional actions here, such as calling an API or updating state
//   };

//   return (
//     <div className="card">
//       {" "}
//       {/* Wrap the FuelQuoteForm inside a div with the 'card' class */}
//       <h1>Fuel Quote Form</h1>
//       <FuelQuoteForm
//         deliveryAddress="123 Main St, City, State, ZIP"
//         handleSubmit={handleSubmit}
//       />
//     </div>
//   );
// };

// export default Quote;



// Quote.jsx
import React, { useState } from "react";
import FuelQuoteForm from "./components/FuelQuoteForm";
import "./Quote.css"; // Import CSS stylesheet

const Quote = () => {
  const handleSubmit = (gallonsRequested, deliveryDate) => {
    console.log("Form submitted with gallonsRequested:", gallonsRequested);
    console.log("Delivery date:", deliveryDate);
  };

  return (
    <div className="card-container">
      <div className="card">
        <h1>Fuel Quote Form</h1>
        <FuelQuoteForm
          deliveryAddress="123 Main St, City, State, ZIP"
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Quote;

