import React, { Fragment } from "react";
import { Box } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import { useStyles } from "./HeaderStyle";
import NavbarComponent from "./NavbarComponent";
import Sidenav from "./Sidenav";
import CompletedOrders from "../BodyComponent/CompletedOrders";
import Dashboard from "../BodyComponent/Dashboard/Dashboard";
import Users from "../BodyComponent/User";
import Shop from "../BodyComponent/Shop";
import PendingOrders from "../BodyComponent/PendingOrders";
import Sdetails from "../BodyComponent/Sdetails";
import Payouts from "../BodyComponent/Payouts";
import Shopstat from "../BodyComponent/Shopstat";
import StatIndividual from "../BodyComponent/StatIndividual";

export default function HearderComponent() {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleDrawerClose = () => {
    setMobileOpen(false);
  };
  return (
    <Fragment>
      <NavbarComponent handleDrawerToggle={handleDrawerToggle} />
      <Sidenav
        mobileOpen={mobileOpen}
        handleDrawerClose={handleDrawerClose}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box className={classes.wrapper}>
        <Switch>
          <Route exact path="/" render={() => <Dashboard />} />
          <Route exact path="/completed" render={() => <CompletedOrders />} />
          <Route exact path="/pending" render={() => <PendingOrders />} />
          <Route exact path="/user" render={() => <Users />} />
          <Route exact path="/shop" render={() => <Shop />} />
          <Route
            exact
            path="/shopdetails"
            render={() => <Sdetails data={"test"} />}
          />
          <Route exact path="/stats" render={() => <Shopstat />} />
          <Route exact path="/shopStat" render={() => <StatIndividual />} />
          <Route exact path="/payouts" render={() => <Payouts />} />
        </Switch>
      </Box>
    </Fragment>
  );
}
