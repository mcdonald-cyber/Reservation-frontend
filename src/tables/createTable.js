import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { createTable } from "../utils/api";

function CreateTable() {
  const [tablesError, setTablesError] = useState(null)
  const [newTable, setNewTable] = useState({});
  const history = useHistory();

  const handleFormTableChange = ({ target }) => {
    setNewTable({
      ...newTable,
      [target.name]: target.value,
    });
  };

  async function handleFormTableSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    createTable({ ...newTable, capacity: newTable.capacity }, abortController.signal)
    .then(() => history.push(`/dashboard/tables/new`))
    .catch(setTablesError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>New Table</h1>
      <ErrorAlert error={tablesError}/>
      <div className="container-fluid mt-2">
        <form onSubmit={handleFormTableSubmit}>
          <div>
            <label htmlFor="table_name">Table Name</label>
            <input
              type="text"
              className="form-control form-control-lg"
              name="table_name"
              placeholder="Enter table name"
              onChange={handleFormTableChange}
              required
              value={newTable.table_name}
            ></input>
          </div>

          <div>
            <label htmlFor="capacity">Capacity</label>
            <input
              className="form-control form-control-lg"
              name="capacity"
              type="number"
              placeholder="0"
              onChange={handleFormTableChange}
              required
              value={newTable.capacity}
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
    </main>
  );
}

export default CreateTable;
