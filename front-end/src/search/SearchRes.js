import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { listReservations } from "../utils/api";

function SearchRes() {
  const [mobile_number, setMobile_number] = useState("");
  const [reservations, setReservations] = useState(null);
  const history = useHistory();

  const changeHandler = (e) => {
    e.preventDefault();
    const num = e.target.value;
    if (!isNaN(num)) {
      setMobile_number(num);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const controller = new AbortController();
    listReservations({ mobile_number }, controller.signal)
      .then((res) => {
        setReservations(res);
        history.push("/search");
      })
    return () => controller.abort();
  };

  return (
    <div className="mb-3">
      <h1> Search Reservation </h1>

      <form className="form-group mb-3">
        <input
          type="text"
          name="mobile_number"
          className="form-control rounded mb-2"
          placeholder="Enter a phone number"
          onChange={changeHandler}
          value={mobile_number}
        />
        <div>
          <button type="submit" className="btn btn-dark btn-md" onClick={submitHandler}>
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
        <p> No reservations found</p>
      )}
    </div>
  );
}

export default SearchRes;
