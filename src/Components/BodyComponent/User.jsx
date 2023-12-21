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
import { Button } from "@mui/material";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    "& .MuiTableCell-root": {
      borderLeft: "2px solid black",
    },
  },
});

function refreshPage() {
  window.location.reload(false);
}
export default function CheckboxListSecondary() {
  const classes = useStyles();
  const [user, setUser] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const getData = async () => {
    const res = await fetch("http://launderup-backend-env.eba-2vri5ph3.ap-south-1.elasticbeanstalk.com/api/userFetch");
    const result = await res.json();
    if (result.length !== 0) setIsLoading(false);
    //console.log(result.data[0]);
    setUser(result);
  };

  useEffect(() => {
    getData();
  }, []);

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
                <TableCell>NAME</TableCell>
                <TableCell align="left">PHONE NO.</TableCell>
                <TableCell align="left">EMAIL</TableCell>
                <TableCell align="left">CITY</TableCell>
                <TableCell align="center">
                  <Button onClick={refreshPage}>
                    <RefreshIcon></RefreshIcon>
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>

            {Array.isArray(user)
              ? user.map((obj) => {
                return (
                  <TableBody>
                    <TableRow
                      key={obj?.uid}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 1 },
                      }}
                    >
                      {/* <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell> */}
                      <TableCell align="left">{obj?.name}</TableCell>
                      <TableCell align="left">{obj?.phone}</TableCell>
                      <TableCell align="left">{obj?.email}</TableCell>
                      <TableCell align="left">{obj?.city}</TableCell>
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
