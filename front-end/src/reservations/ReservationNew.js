import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ReservationForm from "./ReservationForm";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function ReservationNew() {
  const history = useHistory();

  const initialResState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };

  const [reservation, setReservation] = useState({
    ...initialResState,
  });
  const [createResError, setResError] = useState(null);

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
    const controller = new AbortController();
    Object.assign(reservation, {userTime: (new Date).valueOf()});
    createReservation(reservation, controller.signal)
      .then(() => history.push(`/dashboard?date=${reservation.reservation_date}`))
      .catch(setResError);
    return () => controller.abort();
  };

  const cancelHandler = (e) => {
    e.preventDefault();
    const controller = new AbortController();
    history.push("/");
    return () => controller.abort();
  };

  return (
    <section>
      <h2>New Reservation:</h2>
      <ErrorAlert error={createResError} />
      <ReservationForm
        changeHandler={changeHandler}
        changePeopleHandler={changePeopleHandler}
        reservation={reservation}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
      />
    </section>
  );
}

export default ReservationNew;
