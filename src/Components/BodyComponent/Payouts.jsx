import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import { CircularProgress, Typography } from "@material-ui/core";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const Payouts = () => {
  const [payments, setPayments] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isShopLoading, setIsShopLoading] = React.useState(true);
  const [shop, setShop] = React.useState([]);

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
      "& .MuiTableCell-root": {
        borderLeft: "2px solid black",
      },
    },
  });

  useEffect(() => {
    const getShops = async () => {
      const res = await fetch("http://launderup-backend-env.eba-2vri5ph3.ap-south-1.elasticbeanstalk.com/api/fetchShops");
      const result = await res.json();
      if (result.length > 0) setIsShopLoading(false);
      //console.log(result.data[0]);
      setShop(result);
      // console.log(shop[1].shid);
    };
    const getData = async () => {
      const res = await fetch("http://launderup-backend-env.eba-2vri5ph3.ap-south-1.elasticbeanstalk.com/api/fetchPayments");
      const result = await res.json();
      if (result.length > 0) setIsLoading(false);

      setPayments(result);
      //console.log(payments);
    };
    getData();
    getShops();
  }, []);

  function refreshPage() {
    window.location.reload(false);
  }

  const classes = useStyles();

  return (
    <>
      {!isLoading && !isShopLoading ? (
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650 }}
            size="small"
            aria-label="a dense table"
            stickyHeader
            className={classes.table}
          >
            <TableHead>
              <TableRow sx={{ borderBottom: "2px solid black" }}>
                <TableCell align="left">SHOP NAME</TableCell>
                <TableCell align="left">UNIQUE TRANSACTION ID</TableCell>
                <TableCell align="left">PAYOUT ID</TableCell>
                <TableCell align="left">TOTAL AMOUNT</TableCell>
                <TableCell align="left">PAYMENT STATUS</TableCell>
                <TableCell align="left">PAYMENT DATE</TableCell>
                <TableCell align="left">
                  <Button onClick={refreshPage}>
                    <RefreshIcon></RefreshIcon>
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            {Array.isArray(payments)
              ? payments.map((pobj) => {
                return (
                  <TableBody>
                    <TableRow
                      key={pobj?.shid}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 1 },
                      }}
                      hover
                    >
                      <TableCell align="left">
                        {Array.isArray(shop)
                          ? shop.map((sobj) => {
                            return sobj.shid === pobj.shid
                              ? sobj.shop_name
                              : null;
                          })
                          : null}
                      </TableCell>
                      <TableCell align="left">{pobj?.razorpay_utr}</TableCell>
                      <TableCell align="left">
                        {pobj?.razorpay_payout_id}
                      </TableCell>
                      <TableCell align="left">{pobj?.total_amount}</TableCell>
                      <TableCell align="left">{pobj?.status}</TableCell>
                      <TableCell align="left">{pobj?.created_at}</TableCell>
                    </TableRow>
                  </TableBody>
                );
              })
              : null}
          </Table>
        </TableContainer>
      ) : (
        <Typography component="p" align="center" style={{ width: "100%" }}>
          <CircularProgress color="primary" />
        </Typography>
      )}
    </>
  );
};

export default Payouts;
