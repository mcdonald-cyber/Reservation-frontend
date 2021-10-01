import React, { useState } from "react";
import ReservationList from "../reservation/reservationCard";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function Search() {
  const [search, setSearch] = useState("");
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  const handleSearchChange = ({ target }) => {
    setSearch({
      ...search,
      [target.name]: target.value,
    });
  };

  const abortController = new AbortController();
  async function handleSearch(event) {
    event.preventDefault();
    listReservations(search, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Search</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Enter a customer's mobile number:</h4>
      </div>
      <form onSubmit={handleSearch}>
        <div className="input-group mb-3">
          <input
            name="mobile_number"
            className="form-control form-control-lg "
            type="tel"
            placeholder="Search"
            onChange={handleSearchChange}
            value={search.mobile_number}
            aria-describedby="searchButton"
          />
          <button type="submit" id="searchButton" className="btn btn-dark  p-3">
            <span className="bi bi-search"></span>
          </button>
        </div>
      </form>

      <ErrorAlert error={reservationsError} />

      <div className="reservation">
        <p>Search results shown below.</p>
        {reservations.length > 0 ?
        <ReservationList reservations={reservations} reservationsError={reservationsError} page="search" />
        :
        `No reservations found for ${search.mobile_number}.` }
      </div>
    </main>
  );
}
export default Search;
