import "./DriverTimeslots.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Trash } from "react-bootstrap-icons";

function DriverTimeslots() {
  const [timeslots, setTimeslots] = useState([]);
  const username = localStorage.getItem("username");

  async function fetchTimeslots() {
    try {
      const searchResponse = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/timeslot/?username=${username}`
      );
      setTimeslots(searchResponse.data);
    } catch (error) {
      alert(
        "Something went wrong when fetching the timeslots, please refresh page"
      );
    }
  }

  async function handleDelete(id) {
    try {
      const searchResponse = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/timeslot/` +
          id +
          `/?username=${username}`
      );
      window.location.reload();
    } catch (error) {
      console.log(
        "Something went wrong when deleting the timeslot, please try again"
      );
    }
  }

  useEffect(() => {
    fetchTimeslots();
  }, []);

  return (
    <div className="timeslots">
      <h1>Current Time Slots</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Space Available</th>
              <th>Delete Timeslot</th>
            </tr>
          </thead>
          <tbody>
            {timeslots.map((item) => (
              <tr key={item.id}>
                <td>{item.date}</td>
                <td>{item.time}</td>
                <td>{item.space_available}</td>
                <td>
                  {
                    <Trash
                      className="icon"
                      onClick={() => handleDelete(item.id)}
                      data-testid="delete-icon"
                    />
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="buttons">
        <button>
          <Link to="/NewTimeslot">+ New Timeslot</Link>
        </button>
      </div>
    </div>
  );
}
export default DriverTimeslots;
