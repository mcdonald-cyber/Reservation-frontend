import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readReservation, updateReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function EditReservation() {
  const initialState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 1,
  };

  const { reservation_id } = useParams();
  const [errorHandler, setErrorHandler] = useState(null);
  const [newReservation, setNewReservation] = useState({ ...initialState });
  const history = useHistory();

  const handleFormChange = ({ target }) => {
    setNewReservation({
      ...newReservation,
      [target.name]: target.value,
    });
  };
  useEffect(getRes, [reservation_id]);
  function getRes() {
    const abortController = new AbortController();
    readReservation(reservation_id, abortController.signal).then(
      setNewReservation
    );
    return () => abortController.abort();
  }

  function handleSubmit(event) {
    event.preventDefault();
    setErrorHandler(null);

    const abortController = new AbortController();
    updateReservation(
      { ...newReservation, people: Number(newReservation.people) },
      abortController.signal
    )
      .then(() => {
        history.push(`/dashboard/?date=${newReservation.reservation_date}`);
      })
      .catch(setErrorHandler);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1> Edit Reservation </h1>
      <ErrorAlert error={errorHandler} />
      <div>
        <div className="container-fluid mt-2">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                className="form-control form-control-lg"
                name="first_name"
                placeholder="Enter First name"
                onChange={handleFormChange}
                value={newReservation.first_name}
              ></input>
            </div>
            <div>
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                className="form-control form-control-lg"
                name="last_name"
                placeholder="Enter Last name"
                onChange={handleFormChange}
                value={newReservation.last_name}
              ></input>
            </div>
            <div>
              <label htmlFor="mobile_number">Mobile Number</label>
              <input
                className="form-control form-control-lg"
                name="mobile_number"
                type="tel"
                maxLength="12"
                placeholder="###-###-####"
                autoComplete="tel"
                onChange={handleFormChange}
                value={newReservation.mobile_number}
              ></input>
            </div>
            <div>
              <label htmlFor="reservation_date">Reservation Date</label>
              <input
                className="form-control form-control-lg"
                name="reservation_date"
                type="date"
                placeholder="YYYY-MM-DD"
                pattern="\d{4}-\d{2}-\d{2}"
                onChange={handleFormChange}
                value={newReservation.reservation_date}
              />
            </div>
            <div>
              <label htmlFor="reservation_time">Reservation Time</label>
              <input
                className="form-control form-control-lg"
                name="reservation_time"
                type="time"
                placeholder="HH:MM"
                pattern="[0-9]{2}:[0-9]{2}"
                onChange={handleFormChange}
                value={newReservation.reservation_time}
              />
            </div>
            <div>
              <label htmlFor="people">People</label>
              <input
                className="form-control form-control-lg"
                name="people"
                type="number"
                placeholder="1"
                min="1"
                onChange={handleFormChange}
                value={newReservation.people}
              />
            </div>
            <button
              type="button"
              onClick={() => history.goBack()}
              className="btn btn-dark m-1 p-3  text-light"
            >
              <span className="oi oi-x" />
              &nbsp;Cancel
            </button>
            <button type="submit" className="btn btn-dark m-1 p-3 text-light">
              <span className="oi oi-plus" />
              &nbsp;Submit
            </button>
          </form>
        </div>
      </div>{" "}
    </main>
  );
}

export default EditReservation;
