import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { cancelReservation } from "../utils/api";

function ReservationList({ reservations }) {
  const [error, setError] = useState(null);
  const history = useHistory();

  // List of reservation that matches currentDate
  const resList = reservations.map(
    ({
      reservation_id,
      first_name,
      last_name,
      mobile_number,
      reservation_date,
      reservation_time,
      people,
      status,
    }) => {
      const cancelHandler = (e) => {
        e.preventDefault();
        const controller = new AbortController();
        const message = `Do you want to cancel this reservation? This cannot be undone.`;
        const clicked = window.confirm(message);
        setError(null);
        if (clicked) {
          cancelReservation(
            { status: "cancelled" },
            reservation_id,
            controller.signal
          ).then(() => history.push("/"));
        }
        return () => controller.abort();
      };

      if (status !== "finished") {
        return (
          <tr key={reservation_id}>
            <td>{first_name}</td>
            <td>{last_name}</td>
            <td>{mobile_number}</td>
            <td>{reservation_date}</td>
            <td>{reservation_time}</td>
            <td>{people}</td>
            <td data-reservation-id-status={reservation_id}>{status}</td>
            <td>
              {status === "booked" ? (
                <div>
                  <a href={`/reservations/${reservation_id}/seat`}>
                    <button className="btn-dark">Seat</button>
                  </a>
                  <a href={`/reservations/${reservation_id}/edit`}>
                    <button className="btn-dark">Edit</button>
                  </a>
                  <button
                    className="btn-dark"
                    data-reservation-id-cancel={reservation_id}
                    onClick={cancelHandler}
                  >
                    Cancel
                  </button>
                </div>
              ) : null}
            </td>
          </tr>
        );
      }
    }
  );

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Mobile Number</th>
          <th scope="col">Reservation Date</th>
          <th scope="col">Reservation Time</th>
          <th scope="col">Number of People</th>
          <th scope="col">Status</th>
          <th scope="col">Selections</th>
        </tr>
      </thead>
      <tbody>{resList}</tbody>
    </table>
  );
}

export default ReservationList;
