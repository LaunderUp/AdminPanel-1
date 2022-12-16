import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    "& .MuiTableCell-root": {
      borderLeft: "2px solid black",
    },
  },
});

export default function CheckboxListSecondary() {
  // const [checked, setChecked] = React.useState([1]);
  const [shop, setShop] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  function refreshPage() {
    window.location.reload(false);
  }

  const getData = async () => {
    const res = await fetch("http://107.21.130.185:80/api/fetchShops");
    const result = await res.json();
    if (result.length > 0) setIsLoading(false);
    //console.log(result.data[0]);
    setShop(result);
    // console.log(shop[1].shid);
  };

  useEffect(() => {
    getData();
  }, []);

  function refreshPage() {
    window.location.reload(false);
  }
  const classes = useStyles();

  return (
    <>
      {!isLoading ? (
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
                <TableCell>SHOP NAME</TableCell>
                <TableCell align="left">ADDRESS</TableCell>
                <TableCell align="left">MOBILE NUMEBR</TableCell>
                <TableCell align="left">
                  <Button onClick={refreshPage}>
                    <RefreshIcon></RefreshIcon>
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>

            {Array.isArray(shop)
              ? shop.map((shopObj) => {
                  return (
                    <TableBody>
                      <TableRow
                        key={shopObj?.shid}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 1 },
                        }}
                      >
                        {/* <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell> */}
                        <TableCell align="left">{shopObj?.shop_name}</TableCell>
                        <TableCell align="left">
                          {shopObj?.shop_address}
                        </TableCell>
                        <TableCell align="left">
                          {shopObj?.shop_phone_no}
                        </TableCell>
                        <TableCell align="left">
                          <Link
                            to={{
                              pathname: "/shopStat",
                              state: {
                                sid: shopObj.shid,
                                sname: shopObj.shop_name,
                              },
                            }}
                            underline="hover"
                            style={{
                              marginRight: "1.5rem",
                              color: "blue",
                            }}
                            // state={{ from: `1234f` }}
                          >
                            {"More"}
                          </Link>
                        </TableCell>
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
}
