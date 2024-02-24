import React, { useState } from "react";
import ProfileForm from "./components/ProfileForm";
import "./CryptowalletStyles.css";

const Profile = () =>{
  //update info
  const handleSubmit = (fullName, address1, address2, city, state, zipCode) =>{
    // update the variables
  }
  return(
    <div className="card">
      {" "}
      {/* Wrap the ProfileForm inside a div with the 'card' class */}
      <h1>Your Profile</h1>
      <ProfileForm
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

export default Profile;

/*- Full Name (50 characters, required)
	- Address 1 (100 characters, required)
	- Address 2 (100 characters, optional)
	- City (100 characters, required)
	- State (Drop Down, selection required) DB will store 2 character state code
	- Zipcode (9 characters, at least 5 character code required)*/