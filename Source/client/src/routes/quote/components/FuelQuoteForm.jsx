// import React, { useState } from "react";
// import QuoteResult from "./QuoteResult";

// const FuelQuoteForm = ({ deliveryAddress, handleSubmit }) => {
//   const [gallonsRequested, setGallonsRequested] = useState("");
//   const [deliveryDate, setDeliveryDate] = useState("");
//   const [suggestedPrice, setSuggestedPrice] = useState(-1);
//   const [formSubmitted, setFormSubmitted] = useState(false);

//   // Function to handle form submission
//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     if (gallonsRequested && deliveryDate) {
//       handleSubmit(gallonsRequested, deliveryDate);
//       // mock price --------------- change when pricing module is made!!!
//       setSuggestedPrice(3 * gallonsRequested);
//       setFormSubmitted(true);
//     }
//   };

//   // Function to reset form fields
//   const handleResetForm = () => {
//     setGallonsRequested("");
//     setDeliveryDate("");
//     setSuggestedPrice(-1);
//     setFormSubmitted(false);
//   };

//   return (
//     <>
//       {formSubmitted ? (
//         <>
//           <QuoteResult price={suggestedPrice} numGal={gallonsRequested} />
//           <button onClick={handleResetForm}>Start Over</button>
//         </>
//       ) : (
//         <form onSubmit={handleFormSubmit}>
//           <label>
//             Gallons Requested:
//             <input
//               type="number"
//               value={gallonsRequested}
//               onChange={(e) => setGallonsRequested(e.target.value)}
//               required
//             />
//           </label>
//           <br />
//           <label>
//             Delivery Address:
//             <input type="text" value={deliveryAddress} readOnly />
//           </label>
//           <br />
//           <label>
//             Delivery Date:
//             <input
//               type="date"
//               value={deliveryDate}
//               onChange={(e) => setDeliveryDate(e.target.value)}
//               required
//             />
//           </label>
//           <br />
//           <button type="submit">Get Quote</button>
//         </form>
//       )}
//     </>
//   );
// };

// export default FuelQuoteForm;

// FuelQuoteForm.jsx
import React, { useState } from "react";
import QuoteResult from "./QuoteResult";
import "../Quote.css";

const FuelQuoteForm = ({ deliveryAddress, handleSubmit }) => {
  const [gallonsRequested, setGallonsRequested] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [suggestedPrice, setSuggestedPrice] = useState(-1);
  const [formSubmitted, setFormSubmitted] = useState(false);

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
    setDeliveryDate("");
    setSuggestedPrice(-1);
    setFormSubmitted(false);
  };

  return (
    <>
      {formSubmitted ? (
        <div className="form-result">
          <QuoteResult price={suggestedPrice} numGal={gallonsRequested} />
          <button className="submit-button" onClick={handleResetForm}>
            Start Over
          </button>
        </div>
      ) : (
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
            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              required
              className="input"
            />
          </div>
          <button type="submit" className="submit-button">
            Get Quote
          </button>
        </form>
      )}
    </>
  );
};

export default FuelQuoteForm;
