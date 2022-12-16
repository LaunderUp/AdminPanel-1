import React from "react";
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { useStyles } from "./HeaderStyle";

import DashboardIcon from "@material-ui/icons/Dashboard";
// import BookIcon from "@material-ui/icons/Book";
import PostAddIcon from "@material-ui/icons/PostAdd";
// import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

export default function SidenavData({ handleDrawerClose }) {
  const classes = useStyles();
  const listItemData = [
    { label: "Dashboard", link: "/", icon: <DashboardIcon /> },
    {
      label: "Completed Orders",
      link: "/completed",
      icon: <ShoppingCartIcon />,
    },
    {
      label: "Pending Orders",
      link: "/pending",
      icon: <AddShoppingCartIcon />,
    },
    { label: "Users", link: "/user", icon: <PostAddIcon /> },
    { label: "Shops", link: "/shop", icon: <PostAddIcon /> },
    { label: "Payouts", link: "/payouts", icon: <ExitToAppIcon /> },
    { label: "Shop Stats", link: "/stats", icon: <QueryStatsIcon /> },
  ];

  return (
    <List>
      {listItemData.map((item, i) => (
        <Button
          size="small"
          onClick={() => handleDrawerClose()}
          className={classes.navButton}
        >
          <ListItem
            exact
            key={i}
            component={NavLink}
            to={item.link}
            className={classes.navlink}
            activeClassName={classes.selectedNav}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.label}</ListItemText>
          </ListItem>
        </Button>
      ))}
    </List>
  );
}
