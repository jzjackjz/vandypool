import "./AccountInfo.css";
import React, { useEffect, useState } from "react";
import userImage from "./DefaultProfile.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AccountInfo() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    profilePictureUrl: userImage,
  });
  const [driverInfo, setDriverInfo] = useState([]);
  const username = localStorage.getItem("username");

  const handleSubmit = () => {
    navigate("/DriverInfo");
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/users/?username=${username}`
        );
        const length = response.data.length;
        if (length >= 1) {
          const index = length - 1;
          setUserInfo({
            firstName: response.data[index].first_name,
            lastName: response.data[index].last_name,
            email: response.data[index].user,
            phoneNumber: response.data[index].phone_number,
            profilePictureUrl:
              response.data[index].profile_picture_url || userImage,
          });
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    async function driverCheck() {
      try {
        const driverResponse = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/driver/?username=${username}`
        );
        const length = driverResponse.data.length;
        if (length >= 1) {
          const index = length - 1;
          setDriverInfo(driverResponse.data[index]);
        }
      } catch (error) {
        console.log(error);
      }
    }
    driverCheck();
  }, []);

  return (
    <div className="account_info_container">
      <div className="header-container">
        <h1>Account Information</h1>
        <Link
          to="/EditBasicInfo"
          style={{ color: "white", marginLeft: "30px" }}
        >
          <span>Edit</span>
        </Link>
      </div>

      <bigbox>
        <subtitle>Basic Information</subtitle>
        <field>
          <field-name>Profile Picture</field-name>
          <field-value>
            <img
              src={userInfo.profilePictureUrl}
              alt="User Profile"
              className="profile-picture"
            />
          </field-value>
        </field>
        <field>
          <field-name>Name</field-name>
          <field-value>{`${userInfo?.firstName} ${userInfo?.lastName}`}</field-value>
        </field>
      </bigbox>

      <bigbox>
        <subtitle>Contact Information</subtitle>
        <field>
          <field-name>Email</field-name>
          <field-value>{userInfo?.email}</field-value>
        </field>
        <field>
          <field-name>Phone Number</field-name>
          <field-value>{userInfo?.phoneNumber}</field-value>
        </field>
      </bigbox>

      {driverInfo.length !== 0 && (
        <bigbox>
          <subtitle>Driver Information</subtitle>
          <field>
            <field-name>Car Model</field-name>
            <field-value>{driverInfo.carModel}</field-value>
          </field>
          <field>
            <field-name>Car Color</field-name>
            <field-value>{driverInfo.carColor}</field-value>
          </field>
          <field>
            <field-name>License Plate</field-name>
            <field-value>{driverInfo.licensePlate}</field-value>
          </field>
        </bigbox>
      )}

      {driverInfo.length === 0 && (
        <button onClick={handleSubmit}>Register to Drive</button>
      )}
    </div>
  );
}

export default AccountInfo;
