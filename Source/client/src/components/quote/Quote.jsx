import React, { useState, useEffect } from "react";
import FuelQuoteForm from "./components/FuelQuoteForm";
import "./Quote.css";
import { predictRateOfFuel, manageProfile } from "../../communication";

const Quote = () => {
  const [suggestedPrice, setSuggestedPrice] = useState(-1);
  const [gallonsRequested, setGallonsRequested] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState(""); // State to hold delivery address

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await manageProfile({});
        console.log("Profile data: ", data.clientLocation);
        // Update delivery address based on clientLocation
        if (data && data.clientLocation !== undefined) {
          const location = data.clientLocation === 0 ? "Texas" : "Out of State";
          console.log(location);
          setDeliveryAddress(location);
        }
      } catch (error) {
        console.error("Error fetching profile data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (gallonsRequested, deliveryDate) => {
    console.log("Form submitted with gallonsRequested:", gallonsRequested);
    console.log("Delivery date:", deliveryDate);

    predictRateOfFuel(parseFloat(gallonsRequested)).then((data) => {
      console.log("Data: ", data);

      setSuggestedPrice(data.quote.rate);
      setGallonsRequested(data.quote.gallonsRequested);
    });
  };

  return (
    <div className="card-container">
      <div className="card">
        <FuelQuoteForm
          deliveryAddress={deliveryAddress} // Pass deliveryAddress here
          handleSubmit={handleSubmit}
          suggestedPrice={suggestedPrice}
          gallonsRequested={gallonsRequested}
          setGallonsRequested={setGallonsRequested}
        />
      </div>
    </div>
  );
};

export default Quote;
