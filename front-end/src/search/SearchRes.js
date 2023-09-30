import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ReservationList from "../reservations/ReservationList";
import { listReservations } from "../utils/api";

function SearchRes() {
  const [mobile_number, setMobile_number] = useState("");
  const [reservations, setReservations] = useState(null);
  const [error, setError] = useState("No reservations found");
  const history = useHistory();

  const changeHandler = (e) => {
    e.preventDefault();
    setMobile_number(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const controller = new AbortController();
    listReservations({ mobile_number }, controller.signal)
      .then((res) => {
        setReservations(res);
        history.push("/search");
      })
      .catch(setError);
    return () => controller.abort();
  };
 

  return (
    <div className="mb-3">
      <h1> Search Reservation </h1>

      <form className="form-group mb-3">
        <input
          type="search"
          name="mobile_number"
          className="form-control rounded mb-2"
          placeholder="Enter a customer's phone number"
          onChange={changeHandler}
          value={mobile_number}
        />
        <div>
          <button type="submit" className="btn-dark" onClick={submitHandler}>
            Find
          </button>
        </div>
      </form>
      {reservations && reservations.length ? (
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
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => {
              return (
                <tr key={reservation.reservation_id}>
                  <td>{reservation.first_name}</td>
                  <td>{reservation.last_name}</td>
                  <td>{reservation.mobile_number}</td>
                  <td>{reservation.reservation_date}</td>
                  <td>{reservation.reservation_time}</td>
                  <td>{reservation.people}</td>
                  <td data-reservation-id-status={reservation.reservation_id}>
                    {reservation.status}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p> No reservation found</p>
      )}
    </div>
  );
}

export default SearchRes;
