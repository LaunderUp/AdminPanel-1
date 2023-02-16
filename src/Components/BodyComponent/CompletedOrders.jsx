import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";
import { PageHeader } from "../../Common/Components";
import CallIcon from "@mui/icons-material/Call";

export default function CompletedOrders() {
  const [Posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [shop, setShop] = React.useState([]);

  const getData = async () => {
    const res = await fetch("http://100.25.104.108:80/api/fetchShops");
    const result = await res.json();
    if (result.length > 0) setIsLoading(false);
    setShop(result);
  };

  const getOrders = async () => {
    const res = await fetch(
      `http://100.25.104.108:80/api/orderFetchListCompleted`
    );
    const result = await res.json();
    if (result.length > 0) {
      setIsLoading(false);
    }
    setPosts(result);
    //console.log(result.length);
  };
  useEffect(() => {
    getOrders();
    //console.log(Posts);
    getData();
  }, []);
  return (
    <Box mt={2}>
      <PageHeader label="Orders" title="Placed Orders" />
      <Grid container spacing={1}>
        {Posts.length <= 0 && Array.isArray(Posts) && isLoading ? (
          <Typography component="p" align="center" style={{ width: "100%" }}>
            <CircularProgress color="primary" />
          </Typography>
        ) : (
          Posts.map((item) => {
            return (
              <Grid
                key={``}
                item
                xs={12}
                sm={4}
                style={{
                  maxWidth: "400px",
                  margin: "10px auto",
                }}
              >
                <Card>
                  <CardHeader
                    title={`${item.service_type.charAt(0).toUpperCase() +
                      item.service_type.slice(1)
                      }`}
                  />
                  <CardContent>
                    <Typography variant="body2" component="p">
                      {`SHOP NAME => ${Array.isArray(shop)
                          ? shop.map((shopObj) => {
                            if (shopObj.shid === item.shid)
                              return shopObj.shop_name;
                            else return null;
                          })
                          : null
                        }`}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {`PICKUP DATE => ${item.pickup_dt}`}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {`DELIVERY DATE => ${item.delivery_dt}`}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {`ADDRESS => ${item.address}`}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {`EXPRESS => ${item.express === 0 ? `No` : `Yes`}`}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {`TOTAL AMOUNT => Rs.${item.total_cost}`}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      startIcon={<CallIcon color="secondary" />}
                      size="small"
                      color="secondary"
                      href={`tel:${Array.isArray(shop)
                          ? shop.map((shopObj) => {
                            if (shopObj.shid === item.shid)
                              return shopObj.shop_phone_no;
                            else return null;
                          })
                          : null
                        }`}
                    >
                      {`CONTACT SHOP`}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })
        )}
      </Grid>
    </Box>
  );
}
