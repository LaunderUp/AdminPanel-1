import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { CircularProgress, Typography } from "@material-ui/core";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    "& .MuiTableCell-root": {
      borderLeft: "2px solid black",
    },
  },
});
//export default function ListSecondary(){
const StatIndividual = (props) => {
  const [shopOrder, setShopOrder] = useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  //const [isLoadingowner, setIsLoadingowner] = React.useState(true);
  const theme = useTheme();
  const location = useLocation();
  const { state } = location;
  //console.log(state.from);
  //const shid = state.from;
  const recData = {
    sid: state.sid,
    sname: state.sname,
  };

  React.useEffect(() => {
    const shopOrderFetch = async () => {
      const res = await fetch(
        `http://100.25.104.108:80/api/orderFetchList/${recData.sid}`
      );
      const result = await res.json();
      if (result.length > 0) {
        setIsLoading(false);
      }
      setShopOrder(result);
      //console.log(shopOrder);
    };
    shopOrderFetch();
  }, []);
  //console.log(recData.sid);
  //console.log(recData.sname);
  //console.log(recData.saddr);
  const classes = useStyles();
  return (
    <>
      {!isLoading ? (
        <>
          {Array.isArray(shopOrder) && shopOrder.length > 0 ? (
            <>
              <TextField
                id="standard-read-only-input"
                defaultValue={`SHOP NAME => ${recData.sname}`}
                fullWidth="true"
                variant="standard"
                InputProps={{
                  readOnly: true,
                }}
                style={{ margin: "20px" }}
              />
              <TextField
                id="standard-read-only-input"
                defaultValue={`TOTAL ORDERS => ${shopOrder.length}`}
                fullWidth="true"
                variant="standard"
                InputProps={{
                  readOnly: true,
                }}
                style={{ margin: "20px" }}
              />
              <br></br>
              <TableContainer component={Paper}>
                <Table
                  size="small"
                  aria-label="sticky-header"
                  stickyHeader
                  sx={{ borderBottom: "2px solid black", minWidth: 650 }}
                  className={classes.table}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>ORDER ID</TableCell>
                      <TableCell align="left">PICKUP DATE</TableCell>
                      <TableCell align="left">DELIVERY DATE</TableCell>
                      <TableCell align="left">ADDRESS</TableCell>
                      <TableCell align="left">SERVICE TYPE</TableCell>
                      <TableCell align="left">TOTAL COST</TableCell>
                      <TableCell align="left">STATUS</TableCell>
                      <TableCell align="left">EXPRESS</TableCell>
                    </TableRow>
                  </TableHead>

                  {Array.isArray(shopOrder)
                    ? shopOrder.map((obj) => {
                      return (
                        <TableBody>
                          <TableRow
                            key={obj?.oid}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 1,
                              },
                            }}
                          >
                            {/* <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell> */}
                            <TableCell align="left">
                              {obj?.order_id}
                            </TableCell>
                            <TableCell align="left">
                              {obj?.pickup_dt}
                            </TableCell>
                            <TableCell align="left">
                              {obj?.delivery_dt}
                            </TableCell>
                            <TableCell align="left">{obj?.address}</TableCell>
                            <TableCell align="left">
                              {obj?.service_type}
                            </TableCell>
                            <TableCell align="left">
                              {obj?.total_cost}
                            </TableCell>
                            <TableCell align="left">{obj?.status}</TableCell>
                            <TableCell align="left">
                              {obj.express === 0 ? `No` : `Yes`}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      );
                    })
                    : null}
                </Table>
              </TableContainer>
            </>
          ) : null}
        </>
      ) : (
        <Typography component="p" align="center" style={{ width: "100%" }}>
          <CircularProgress color="primary" />
        </Typography>
      )}
    </>
  );
};

export default StatIndividual;
