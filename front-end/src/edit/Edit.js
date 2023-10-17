import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import ReservationForm from "../reservations/ReservationForm";
import { readReservation, updateReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function Edit() {
  const initialResState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 1,
  };

  const { reservation_id } = useParams();
  const [reservation, setReservation] = useState({...initialResState});
  const [error, setError] = useState(null);
  const history = useHistory();

  function loadReservation(){
    const abortController = new AbortController();
    setError(null);
    readReservation(reservation_id, abortController.signal)
    .then(setReservation)
    .catch(setError);

    return () => abortController.abort();
  }

  useEffect(loadReservation, [reservation_id])

  const changeHandler = (e) => {
    if (e.target.name === "mobile_number") {
      if(!isNaN(e.target.value)){
        setReservation({
          ...reservation,
          [e.target.name]: e.target.value,
        })}
    } else {
      setReservation({
        ...reservation,
        [e.target.name]: e.target.value,
      });
    }
  };

  const changePeopleHandler = (e) => {
    e.preventDefault();
    setReservation({
      ...reservation,
        [e.target.name]: Number(e.target.value),
      });
    }

  const submitHandler = (e) => {
    e.preventDefault();
    const abortController = new AbortController();
    updateReservation(reservation, abortController.signal)
      .then(() => history.push(`/dashboard?date=${reservation.reservation_date}`))
      .catch(setError);
    return () => abortController.abort();
  };

  const cancelHandler = (e) => {
    e.preventDefault();
    const abortController = new AbortController();
    history.push("/");
    return () => abortController.abort();
  };

  return (
    <section>
      <h2>Edit Reservation:</h2>
      <ErrorAlert error={error} />
      <ReservationForm
        changeHandler={changeHandler}
        reservation={reservation}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
        changePeopleHandler={changePeopleHandler}
      />
    </section>
  );
}

export default Edit;
