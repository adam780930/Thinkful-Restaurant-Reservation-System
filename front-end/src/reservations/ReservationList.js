import { useHistory } from "react-router-dom";

function ReservationList({ reservations }) {
  const history = useHistory();

  // List of reservation that matches currentDate
  const resList = reservations.map((reservation) => {
    return (
      <tr key={reservation.reservation_id}>
        <td>{reservation.first_name}</td>
        <td>{reservation.last_name}</td>
        <td>{reservation.mobile_number}</td>
        <td>{reservation.reservation_date}</td>
        <td>{reservation.reservation_time}</td>
        <td>{reservation.people}</td>
        <td>{reservation.status}</td>
        <td>
          {reservation.status === "booked" ? (
            <div>
              <a href={`/reservations/${reservation.reservation_id}/seat`}>
                <button className="btn-dark">Seat</button>
              </a>
              <a href={`/reservations/${reservation.reservation_id}/edit`}>
                <button className="btn-dark">Edit</button>
              </a>
              <button className="btn-dark">Cancel</button>
            </div>
          ) : null}
        </td>
      </tr>
    );
  });

  return (
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
      <tbody>{resList}</tbody>
    </table>
  );
}

export default ReservationList;
