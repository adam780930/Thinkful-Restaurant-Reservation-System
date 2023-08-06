import React from "react";
import { useHistory } from "react-router-dom";

function ReservationForm({reservation, changeHandler}) {
  return (
    <div>
      <form onSubmit={1}>
        <fieldset>
          <div>
            <label htmlFor="first_name">First Name:</label>
            <input
              name="first_name"
              id="first_name"
              type="text"
              required={true}
              value={reservation.first_name}
              maxLength="100"
              onChange={changeHandler}
            />
          </div>
          <div>
            <label htmlFor="last_name">Last Name:</label>
            <input
              name="last_name"
              id="last_name"
              type="text"
              required={true}
              value={reservation.last_name}
              maxLength="100"
              onChange={changeHandler}
            />
          </div>
          <div>
            <label htmlFor="mobile_number">Mobile Number:</label>
            <input
              name="mobile_number"
              id="mobile_number"
              type="text"
              required={true}
              value={reservation.mobile_number}
              maxLength="100"
              onChange={changeHandler}
            />
          </div>
          <div>
            <label htmlFor="reservation_date">Reservation Date:</label>
            <input
              name="reservation_date"
              id="reservation_date"
              type="date"
              placeholder="YYYY-MM-DD"
              pattern="\d{4}-\d{2}-\d{2}"
              required={true}
              value={reservation.reservation_date}
              maxLength="100"
              onChange={changeHandler}
            />
          </div>
          <div>
            <label htmlFor="reservation_time">Reservation Time:</label>
            <input
              name="reservation_time"
              id="reservation_time"
              type="time"
              placeholder="HH:MM"
              pattern="[0-9]{2}:[0-9]{2}"
              required={true}
              value={reservation.reservation_time}
              maxLength="100"
              onChange={changeHandler}
            />
          </div>
          <div>
            <label htmlFor="people">Number of People:</label>
            <input
              name="people"
              id="people"
              type="number"
              required={true}
              value={reservation.people}
              min={1}
              onChange={changeHandler}
            />
          </div>
          <div className="group-row">
            <button className="btn-dark" type="button">
              Cancel
            </button>
            <button className="btn-dark" type="submit">
              Submit
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default ReservationForm;
