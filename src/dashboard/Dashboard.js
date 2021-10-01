import ReservationList from "../reservation/reservationCard";
import TableList from "../tables/tableslist";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { next, previous, today} from "../utils/date-time";
import useQuery from "../utils/useQuery";
import ErrorAlert from "../layout/ErrorAlert";
import {listReservations, listTables, finishTable, updateStatus} from "../utils/api";


/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard() {
  const history = useHistory();
  const query = useQuery();
  const date = query.get("date") ? query.get("date") : today();

  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables({})
      .then(setTables)
      .then(setTablesError);
    return () => abortController.abort();
  }

function onFinish(table_id) {
  const tableId = table_id;
      const abortController = new AbortController();
      finishTable(tableId, abortController.signal)
          .then(() => loadDashboard())
          return () => abortController.abort();
}

function handleDelete(reservation) {
  const abortController = new AbortController();
  let status = "cancelled";
  updateStatus(
    status,
    reservation.reservation_id,
    abortController.signal
  )
  .then(() => history.push(`/reservations?date=${reservation.reservation_date}`))
  return () => abortController.abort();;
}

  function nextDate(event) {
    event.preventDefault();

    history.push(`?date=${next(date)}`);
  }
  function previousDate(event) {
    event.preventDefault();

    history.push(`?date=${previous(date)}`);
  }

  return (
    <main>
      <h1>Dashboard</h1>
        <h4 className="mb-0">Reservations for {date}</h4>
        {/* ______ Buttons to Navigate Date __________ */}
      <button
        className="bi bi-chevron-double-left btn btn-dark m-1 p-3"
        style={{ fontsize: 2 }}
        alt="Previous Day"
        onClick={previousDate}
      >
        {" "}
      </button>

      <button
        className="btn btn-dark m-1 p-3"
        alt="Today's Date"
        onClick={() => history.push(`/?date=${today()}`)}
      >
        {" "}
        Today{" "}
      </button>

      <button
        className="bi bi-chevron-double-right btn btn-dark m-1 p-3"
        style={{ fontsize: 2 }}
        alt="Next Day"
        onClick={nextDate}
      >
        {" "}
      </button>

      {/* ______ Date Reservations Listing __________ */}

      <ErrorAlert error={reservationsError} tablesError={tablesError} />

      <div className="card-group">
        <ReservationList 
        reservations={reservations}
        handleDelete={handleDelete}
        />
      </div>
        <h4 className="mb-0">Tables</h4>
       <div className="card-group">
        <TableList 
        tables={tables}
        setTables={setTables}
        onFinish={onFinish}
        />
      </div>
    </main>
  );
}

export default Dashboard;
