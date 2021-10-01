import React from "react";
import { useHistory } from "react-router-dom";

function ReservationList({ reservations, handleDelete }) {
  const history = useHistory();

  return reservations.map((reservation) => {
    function onDelete() {
      const result = window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      );
      if (result) {
        handleDelete(reservation);
      }
      return;
    }

    function seatLink(event) {
      event.preventDefault();
      history.push(`/reservations/${reservation.reservation_id}/seat`);
    }
    function editLink(event) {
      event.preventDefault();
      history.push(`/reservations/${reservation.reservation_id}/edit`);
    }
    let seatbutton;
    if (reservation.status === "booked") {
      seatbutton = (
          <button
            type="button"
            className="btn btn-dark m-1 p-2 me-md-2"
            href={`/reservations/${reservation.reservation_id}/seat`}
            onClick={seatLink}
          >
            <span className="bi bi-person-check"></span> Seat
          </button>
        
      );
    }
    return (
      <div className="card mb-2" key={reservation.reservation_id}>
        <div className="card-body">
          <div className="row justify-content-between">
            <h4 className="card-title">
              {reservation.first_name} {reservation.last_name}
            </h4>
            <p
              className="text text-secondary"
              data-reservation-id-status={reservation.reservation_id}
            >
              {" "}
              <b>Status:</b> {reservation.status}{" "}
            </p>

            <p className="card-text">
              <b>Date: </b>
              {reservation.reservation_date}
              <b>Mobile:</b> &nbsp;{reservation.mobile_number}
              <b>Time:</b> &nbsp;{reservation.reservation_time}
              <b>Group Size:</b> &nbsp;{reservation.people}
            </p>
            {seatbutton}
            <button
              className="btn btn-dark m-1 p-2 me-md-2 text-light"
              href={`/reservations/${reservation.reservation_id}/edit`}
              onClick={editLink}
            >
              {" "}
              Edit
            </button>
            <button
              data-reservation-id-cancel={reservation.reservation_id}
              id={reservation.reservation_id}
              className="btn btn-dark m-1 p-2 me-md-2 text-light"
              onClick={() => onDelete()}
            >
              {" "}
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  });
}

export default ReservationList;
