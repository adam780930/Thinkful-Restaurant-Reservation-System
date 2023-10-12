import React, { useEffect, useState  } from "react";
import { listReservations, listTables } from "../utils/api";
import { useHistory, useParams } from "react-router-dom";
import { previous, next } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationList from "../reservations/ReservationList"
import TableList from "../tables/TableList"
import { today } from "../utils/date-time";
import useQuery from "../utils/useQuery";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

function Dashboard({ date }) {
  // const {date} = useParams();
  // console.log(date)
  // var reservationDate = date;
  // if (!reservationDate){
  //   reservationDate = today();
  // }
  let query = useQuery();
  date = query.get("date") || date;

  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  // const [currentDate, setCurrentDate] = useState(reservationDate);
  const [currentDate, setCurrentDate] = useState(date);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const history = useHistory();

  

  useEffect(loadDashboard, [currentDate]);

  function loadDashboard() {
    
    const abortController = new AbortController();
    setReservationsError(null); //List reservations
    listReservations({ date: currentDate }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
      setTablesError(null);  //List tables
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
    console.log(previous(date))
  };

  const nextDayHandler = () => {
    setCurrentDate(next(currentDate));
    history.push(`/dashboard?date=${next(currentDate)}`);
    console.log(currentDate)
  };

  const todayHandler = () => {
    setCurrentDate(today());
    history.push(`/dashboard`);
    console.log(currentDate)
  };

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
      <ReservationList reservations={reservations} />
      <ErrorAlert error={reservationsError} />
      <TableList tables={tables} />
      <ErrorAlert error={tablesError} />
      {/* {JSON.stringify(reservations)} */}
    </main>
  );
}

export default Dashboard;
