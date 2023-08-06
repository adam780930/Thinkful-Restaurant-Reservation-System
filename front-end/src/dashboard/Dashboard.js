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
  

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  //Data changes
  const previousDayHandler = (e) => {
    e.preventDefault();
    history.push('/dashboard');
    setCurrentDate(previous(currentDate));
  }

  const nextDayHandler = (e) => {
    e.preventDefault();
    history.push('/dashboard');
    setCurrentDate(next(currentDate));
  }

  const todayHandler = (e) => {
    e.preventDefault();
    history.push('/dashboard');
    setCurrentDate(date)
    console.log(reservations);
  }


  return (
    <main>
      <h1>test</h1>
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
          <th scope="col">Status</th>
          <th scope="col">Options</th>
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
          <th scope="col">test</th>
          <th scope="col">test</th>
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
