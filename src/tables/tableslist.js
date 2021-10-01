import React from "react"
// import { useHistory } from "react-router-dom";

function TableList({tables, onFinish}) {
// const history = useHistory();
  
  
    return tables.map((table) => {
      
     let finishbutton;
      if (table.reservation_id){
        finishbutton = (
        <button className="btn btn-dark m-1 p-2 me-md-2" data-table-id-finish={table.table_id} onClick={() => finishHandler()}> <b>Finish </b></button>)
      }

        function finishHandler() {
        const result = window.confirm(
          'Is this table ready to seat new guests? This cannot be undone.'
        );
        if (result) {
          onFinish(table.table_id)
        }    
        return;
      }
    
      return (
        <div className="card mb-2" >
        <div className="card-body"> {finishbutton}    
            <h4 className="card-title">{table.table_name} </h4>                 
            <p className="card-text" data-table-id-status={table.table_id} > <b>Status: </b>{table.reservation_id ? "occupied" : "free"}</p>
           <b>Seating:</b> &nbsp;{table.capacity}
           </div>
        </div>
      )
    })
  };

export default TableList;