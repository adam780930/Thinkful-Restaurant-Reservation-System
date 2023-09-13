import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ReservationForm from "./ReservationForm";

function ReservationNew() {
  const history = useHistory();

  const initialResState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 1,
  };

  const [reservation, setReservation] = useState({
    ...initialResState,
  });

  const changeHandler = (e) => {
    if (e.target.name === "people") {
      setReservation({
        ...reservation,
        [e.target.name]: Number(e.target.value),
      });
    } else {
      setReservation({
        ...reservation,
        [e.target.name]: e.target.value,
      });
    }
  };

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   const 
  // };

  return (
    <section>
      <h2>New Reservation:</h2>
      <ReservationForm
        changeHandler={changeHandler}
        reservation={reservation}
      />
    </section>
  );
}

export default ReservationNew;
