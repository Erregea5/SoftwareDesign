import React, { useState } from "react";
import "../CryptowalletStyles.css";

const ProfileForm =({handlesubmit})=>{
    const [fullName, setName]= useState("");
    const [address1, setAddress1]= useState("");
    const [address2, setAddress2]= useState("");
    const [city, setCity]= useState("");
    const [state, setState]= useState("");
    const [zipCode, setZipCode]= useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleFormSubmit = (e)=>{
        e.preventDefault();
        if(fullName && address1 && city && state && zipCode){
            //handlesubmit(fullName, address1, address2, city, state, zipCode);
            setFormSubmitted(true);
        }
    }

    return(
        <form onSubmit={handleFormSubmit}>
          <label>
            Full name:
            <input
              type="text"
              placeholder="help" 
              value={fullName}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Address 1:
            <input type="text" value={address1}
            onChange={(e) => setAddress1(e.target.value)}
            required />
          </label>
          <br />
          <label>
            Address 2:
            <input type="text" value={address2}
            onChange={(e) => setAddress2(e.target.value)}/>
          </label>
          <br />
          <label>
            City:
            <input type="text" value={city}
            onChange={(e) => setCity(e.target.value)}
            required />
          </label>
          <br />
          <label>
            State:
            <input type="text" value={state}
            onChange={(e) => setState(e.target.value)}
            required />
          </label>
          <br />
          <label>
            Zip Code:
            <input type="text" value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            required />
          </label>
          <br />
          <button type="submit">Update Profile</button>
        </form>
    )
}

export default ProfileForm;