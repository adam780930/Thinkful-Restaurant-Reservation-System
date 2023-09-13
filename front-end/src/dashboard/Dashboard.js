import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import { useHistory } from "react-router-dom";
import { previous, next } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [currentDate, setCurrentDate] = useState(date);

  const history = useHistory();

  useEffect(loadDashboard, [currentDate]);
  
  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date: currentDate }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  // function loadReservations(reservations) {
  //   console.log(JSON.stringify(reservations))
  //   setReservations(reservations);
  // }

  //Date changes
  const previousDayHandler = () => {
    setCurrentDate(previous(currentDate));
    history.push(`/dashboard?date=${previous(currentDate)}`);
  }

  const nextDayHandler = () => {
    setCurrentDate(next(currentDate));
    history.push(`/dashboard?date=${next(currentDate)}`)
  }

  const todayHandler = () => {
    setCurrentDate(date)
    history.push(`/dashboard?date=${date}`);
  }


  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {currentDate}</h4>
      </div>
      <table className="table">
      <thead>
        <tr>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Mobile Number</th>
          <th scope="col">Reservation Date</th>
          <th scope="col">Reservation Time</th>
          <th scope="col">Number of People</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
    <table className="table">
      <thead>
        <tr>
          <th scope="col">{reservations.first_name}</th>
          <th scope="col">{reservations.last_name}</th>
          <th scope="col">{reservations.mobile_number}</th>
          <th scope="col">{reservations.reservation_date}</th>
          <th scope="col">{reservations.reservation_time}</th>
          <th scope="col">{reservations.people}</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
      <ErrorAlert error={reservationsError} />
      {JSON.stringify(reservations)}
      <div className="item centered">
        <div className="group-row">
          <button className="btn-dark" onClick={previousDayHandler}>
            Previous
          </button>
          <button className="btn-dark" onClick={todayHandler}>
            Today
          </button>
          <button className="btn-dark" onClick={nextDayHandler}>
            Next
          </button>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
