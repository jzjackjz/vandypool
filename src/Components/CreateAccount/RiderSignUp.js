import React from "react";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import axios from "axios";
import "./RiderSignUp.css";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function RiderSignUp() {
  const [error, setError] = useState("");
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleGoogleRegister = async (response) => {
    if (response.error) {
      setError(`Google registration error: ${response.error}`);
      return;
    }

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/auth/google-register",
        {
          token: response.credential,
        }
      );
      if (res.data.sessionToken) {
        localStorage.setItem("sessionToken", res.data.sessionToken);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Token ${res.data.sessionToken}`;
        setIsAuthenticated(true);
        navigate("/");
      } else {
        setError("Registration failed: No session token returned from backend");
      }
    } catch (error) {
      setError(
        `Error during Google registration: ${error.response.data.message}`
      );
    }
  };

  return (
    <div className="rider-signup-container">
      <h1>Rider Registration</h1>
      <p>Please use your Vanderbilt associated email</p>
      <GoogleLogin
        clientId={clientId}
        onSuccess={handleGoogleRegister}
        onFailure={handleGoogleRegister}
        text="Sign Up With Google"
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default RiderSignUp;
