import React, { useState } from "react";
import "./Profile.css";

import { manageProfile } from "../../communication";

const Profile = () => {
  const [fullName, setFullName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  // Define the list of states
  const statesList = [
    { value: "", label: "Select State" },
    { value: "AL", label: "Alabama" },
    { value: "AK", label: "Alaska" },
    { value: "AZ", label: "Arizona" },
    { value: "AR", label: "Arkansas" },
    { value: "CA", label: "California" },
    { value: "CO", label: "Colorado" },
    { value: "CT", label: "Connecticut" },
    { value: "DE", label: "Delaware" },
    { value: "FL", label: "Florida" },
    { value: "GA", label: "Georgia" },
    { value: "HI", label: "Hawaii" },
    { value: "ID", label: "Idaho" },
    { value: "IL", label: "Illinois" },
    { value: "IN", label: "Indiana" },
    { value: "IA", label: "Iowa" },
    { value: "KS", label: "Kansas" },
    { value: "KY", label: "Kentucky" },
    { value: "LA", label: "Louisiana" },
    { value: "ME", label: "Maine" },
    { value: "MD", label: "Maryland" },
    { value: "MA", label: "Massachusetts" },
    { value: "MI", label: "Michigan" },
    { value: "MN", label: "Minnesota" },
    { value: "MS", label: "Mississippi" },
    { value: "MO", label: "Missouri" },
    { value: "MT", label: "Montana" },
    { value: "NE", label: "Nebraska" },
    { value: "NV", label: "Nevada" },
    { value: "NH", label: "New Hampshire" },
    { value: "NJ", label: "New Jersey" },
    { value: "NM", label: "New Mexico" },
    { value: "NY", label: "New York" },
    { value: "NC", label: "North Carolina" },
    { value: "ND", label: "North Dakota" },
    { value: "OH", label: "Ohio" },
    { value: "OK", label: "Oklahoma" },
    { value: "OR", label: "Oregon" },
    { value: "PA", label: "Pennsylvania" },
    { value: "RI", label: "Rhode Island" },
    { value: "SC", label: "South Carolina" },
    { value: "SD", label: "South Dakota" },
    { value: "TN", label: "Tennessee" },
    { value: "TX", label: "Texas" },
    { value: "UT", label: "Utah" },
    { value: "VT", label: "Vermont" },
    { value: "VA", label: "Virginia" },
    { value: "WA", label: "Washington" },
    { value: "WV", label: "West Virginia" },
    { value: "WI", label: "Wisconsin" },
    { value: "WY", label: "Wyoming" },
  ];

  const validateZipcode = (zipcode) => {
    return /^\d{5}(-\d{4})?$/.test(zipcode);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    let hasError = false;

    if (!fullName.trim()) {
      errors.fullName = "Full Name is required";
      hasError = true;
    }

    if (!address1.trim()) {
      errors.address1 = "Address 1 is required";
      hasError = true;
    }

    if (!city.trim()) {
      errors.city = "City is required";
      hasError = true;
    }

    if (!state) {
      errors.state = "State is required";
      hasError = true;
    }

    if (!zipcode.trim() || !validateZipcode(zipcode)) {
      errors.zipcode = "Valid Zipcode is required";
      hasError = true;
    }

    if (hasError) {
      return setErrors(errors);
    }

    manageProfile({
      fullName,
      address1,
      address2,
      city,
      state,
      zipcode,
    }).then((data) => {
      if (data.error) alert(data.error);
      else {
        console.log(data);
        setFormSubmitted(true);
      }
    });
  };

  const handleResetForm = () => {
    setFullName("");
    setAddress1("");
    setAddress2("");
    setCity("");
    setState("");
    setZipcode("");
    setFormSubmitted(false);
    setErrors({});
  };

  return (
    <div className="card-container">
      <div className="card">
        <h1>Profile Management</h1>
        {!formSubmitted && (
          <form onSubmit={handleFormSubmit} className="form">
            <div className="input-container">
              <label className="label">Full Name:</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="input"
                maxLength={50}
              />
              {errors.fullName && <p className="error">{errors.fullName}</p>}
            </div>
            <div className="input-container">
              <label className="label">Address 1:</label>
              <input
                type="text"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                required
                className="input"
                maxLength={100}
              />
              {errors.address1 && <p className="error">{errors.address1}</p>}
            </div>
            <div className="input-container">
              <label className="label">Address 2:</label>
              <input
                type="text"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                className="input"
                maxLength={100}
              />
            </div>
            <div className="input-container">
              <label className="label">City:</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className="input"
                maxLength={100}
              />
              {errors.city && <p className="error">{errors.city}</p>}
            </div>
            <div className="input-container">
              <label className="label">State:</label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                className="input"
              >
                {statesList.map((state) => (
                  <option key={state.value} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </select>
              {errors.state && <p className="error">{errors.state}</p>}
            </div>
            <div className="input-container">
              <label className="label">Zipcode:</label>
              <input
                type="text"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                required
                className="input"
                minLength={5}
                maxLength={9}
              />
              {errors.zipcode && <p className="error">{errors.zipcode}</p>}
            </div>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        )}
        {formSubmitted && (
          <div className="form-result">
            <p>Success! Your profile has been changed.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
