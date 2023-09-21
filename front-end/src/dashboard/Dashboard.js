import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
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
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  const history = useHistory();

  useEffect(loadDashboard, [currentDate]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date: currentDate }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
      setTablesError(null);
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  // function logTables(json) {
  //   console.log(JSON.stringify(json))
  //   setTables(json)
  // }

  // function loadReservations(reservations) {
  //   console.log(JSON.stringify(reservations))
  //   setReservations(reservations);
  // }

  //Date changes
  const previousDayHandler = () => {
    setCurrentDate(previous(currentDate));
    history.push(`/dashboard?date=${previous(currentDate)}`);
  };

  const nextDayHandler = () => {
    setCurrentDate(next(currentDate));
    history.push(`/dashboard?date=${next(currentDate)}`);
  };

  const todayHandler = () => {
    setCurrentDate(date);
    history.push(`/dashboard`);
  };

  // List of reservation that matches currentDate
  const resList = reservations.map((reservation) => {
    return (
      <tr key={reservation.reservation_id}>
        <th scope="col">{reservation.first_name}</th>
        <th scope="col">{reservation.last_name}</th>
        <th scope="col">{reservation.mobile_number}</th>
        <th scope="col">{reservation.reservation_date}</th>
        <th scope="col">{reservation.reservation_time}</th>
        <th scope="col">{reservation.people}</th>
        <th scope="col">{reservation.status}</th>
      </tr>
    );
  });

  const tableList = tables.map((table) => {
    return (
      <tr key={table.table_id}>
        <th scope="col">{table.table_name}</th>
        <th scope="col">{table.capacity}</th>
        <th scope="col">{table.status}</th>
      </tr>
    );
  });

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {currentDate}</h4>
      </div>
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
          {resList}
        </thead>
        <tbody></tbody>
      </table>
      <ErrorAlert error={reservationsError} />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Table Name</th>
            <th scope="col">Capacity</th>
            <th scope="col">Status</th>
          </tr>
          {tableList}
        </thead>
        <tbody></tbody>
      </table>
      <ErrorAlert error={tablesError} />
      {/* {JSON.stringify(reservations)} */}
    </main>
  );
}

export default Dashboard;
