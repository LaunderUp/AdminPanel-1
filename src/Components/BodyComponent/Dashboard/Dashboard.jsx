import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
import { useStyles } from "../BodyStyles";
import { PageHeader } from "../../../Common/Components";

export default function Dashboard() {
  const classes = useStyles();
  // const [hasFetched, setHasFetched] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [shop, setShop] = React.useState([]);
  const [Posts, setPosts] = useState([]);
  const [PostsComp, setPostsComp] = useState([]);
  const [user, setUser] = React.useState([]);

  const getOrders = async () => {
    const res = await fetch(`http://107.21.130.185:80/api/orderFetchList`);
    const result = await res.json();
    //while (result.length == 0) {}
    if (result.length > 0) {
      setIsLoading(false);
    }
    setPosts(result);
    //console.log(result.length);
  };

  const getOrdersCompleted = async () => {
    const res = await fetch(
      `http://107.21.130.185:80/api/orderFetchListCompleted`
    );
    const result = await res.json();
    //while (result.length == 0) {}
    if (result.length > 0) {
      setIsLoading(false);
    }
    setPostsComp(result);
    //console.log(result.length);
  };

  const getData = async () => {
    const res = await fetch("http://107.21.130.185:80/api/fetchShops");
    const result = await res.json();
    if (result.length > 0) setIsLoading(false);
    //console.log(result.data[0]);
    setShop(result);
    // console.log(shop[1].shid);
  };

  const getUser = async () => {
    const res = await fetch("http://107.21.130.185:80/api/userFetch");
    const result = await res.json();
    if (result.length !== 0) setIsLoading(false);
    //console.log(result.data[0]);
    setUser(result);
    //console.log(user);
  };
  React.useEffect(() => {
    getOrders();
    getOrdersCompleted();
    getData();
    getUser();
  }, []);

  const DisplayData = [
    {
      label: "Orders",
      value: `${Posts.length}`,
    },
    {
      label: "Placed",
      value: `${PostsComp.length}`,
    },
    {
      label: "Cancelled",
      value: `${shop.length}`,
    },
    {
      label: "Total Users",
      value: `${user.length}`,
    },
  ];

  //updating the graph

  return (
    <Box mt={2}>
      {/* //title section  */}
      <PageHeader label="Dashboard" title="Admin Dashboard" />
      {Array.isArray(Posts) && Posts.length > 0}
      <Grid container spacing={1} className={classes.section}>
        {DisplayData.map((item, i) => (
          <Grid key={i} item xs={6} sm={3} md={3}>
            <Card>
              <CardContent className={classes.displayCard}>
                <canvas
                  id={item.label}
                  className={classes.displayCardGraph}
                ></canvas>
                <Box className={classes.cardDataContent}>
                  <Typography
                    variant="subtitle2"
                    className={classes.cardLabel}
                    gutterBottom={true}
                  >
                    {item.label}
                  </Typography>
                  <Typography
                    variant="h4"
                    component="h2"
                    className={classes.cardHeader}
                  >
                    {item.value}
                  </Typography>
                  <Box className={classes.ratio}>
                    <Button
                      startIcon={item.icon}
                      size="small"
                      style={{
                        color: item.label[0] === "P" ? green[700] : red[400],
                        fontSize: "1.1rem",
                      }}
                    >
                      {item.iconLabel}
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* section blog graph  */}

      {/* <Section3 /> */}
    </Box>
  );
}
