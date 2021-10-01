import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { seatReservation, readReservation, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function Seat() {
  const [seatError, setSeatError] = useState(null);
  const { reservation_id } = useParams();
  const [reservation, setReservation] = useState({});

  const history = useHistory();
  const [tables, setTables] = useState([]);
  const [tableId, setTableId] = useState("");

  useEffect(() => {
    readReservation(reservation_id).then(setReservation);
  }, [reservation_id]);

  useEffect(() => {
    listTables({}).then(setTables);
  }, []);

  const handleFormSeatChange = ({ target: { value } }) => {
    setTableId(value);
  };

  async function handleFormSeatSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    const abortController = new AbortController();
    setSeatError(null);
    seatReservation(reservation.reservation_id, tableId, abortController.signal)
      .then(() =>
        history.push(`/dashboard?date=${reservation.reservation_date}`)
      )
      .catch(setSeatError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Seat</h1>
      <div>
        <ErrorAlert error={seatError} />
      </div>
      <div className="container-fluid mt-2">
        <form onSubmit={handleFormSeatSubmit}>
          <label htmlFor="table_name">Table Name</label>
          <select
            className="form-control form-control-lg"
            name="table_id"
            placeholder="Pick table name"
            onChange={handleFormSeatChange}
            required
            value={tableId}
          >
            <option defaultValue>Open this select menu</option>
            {tables.map((table) => {
              return (
                <option key={table.table_id} value={table.table_id}>
                  {table.table_name} - {table.capacity}
                </option>
              );
            })}
          </select>
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
    </main>
  );
}

export default Seat;
