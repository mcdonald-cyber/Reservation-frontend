import React from "react";
import { Redirect, Route, Switch} from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import CreateReservation from "../reservation/createReservation";
import EditReservation from "../reservation/editReservation";
import CreateTable from "../tables/createTable";
import Search from "../reservation/search";
import Seat from "../Seat/seat";
import NotFound from "./NotFound";


/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */

function Routes() {
  
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations/new">
        <CreateReservation />
      </Route>
      <Route exact={true} path="/reservations/:reservation_id/edit">
        <EditReservation />
      </Route>
      <Route exact={true} path="/reservations/:reservation_id/seat">
        <Seat />
      </Route>
      <Route path="/dashboard">
        <Dashboard/>
      </Route>
      <Route exact={true} path={"/search"}>
        <Search /*mobileNumber={mobileNumber}*/ />
      </Route>
      <Route exact={true} path="/Tables/new">
        <CreateTable />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
