import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import axios from "axios";
import "./DriverSignUp.css";

function DriverSignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carColor, setCarColor] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/driver/", {
        firstName: firstName,
        lastName: lastName,
        carModel: carModel,
        carColor: carColor,
        licensePlate: licensePlate,
      });
      navigate("/AccountInfo");
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div className="driver-signup-container">
      <h1>Add A Few More Details Here</h1>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="model"
        placeholder="Car Model"
        value={carModel}
        onChange={(e) => setCarModel(e.target.value)}
      />
      <input
        type="car_color"
        placeholder="Car Color"
        value={carColor}
        onChange={(e) => setCarColor(e.target.value)}
      />
      <input
        type="license plate"
        placeholder="License Plate"
        value={licensePlate}
        onChange={(e) => setLicensePlate(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default DriverSignUp;
