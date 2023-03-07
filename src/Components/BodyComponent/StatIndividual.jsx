import React, { useEffect } from "react";
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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from "@mui/material/styles";
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    "& .MuiTableCell-root": {
      borderLeft: "2px solid black",
    },
  },
});
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
//export default function ListSecondary(){
const StatIndividual = (props) => {
  const [shopOrder, setShopOrder] = useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [stat, setStat] = React.useState([]);
  const [value, setValue] = React.useState("year");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue)
  };
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
  const getStat = async (prop) => {
    if (value === 0) {
      const res = await fetch(`http://100.25.104.108:80/api/stats/${recData.sid}/year`);
      const result = await res.json();
      console.log(result);
      setStat(result);
    }
    else if (value === 1) {
      const res = await fetch(`http://100.25.104.108:80/api/stats/${recData.sid}/month`);
      const result = await res.json();
      console.log(result);
      setStat(result);
    }
    else if (value === 2) {
      const res = await fetch(`http://100.25.104.108:80/api/stats/${recData.sid}/week`);
      const result = await res.json();
      console.log(result);
      setStat(result);
    }


  }

  useEffect(() => {
    getStat();
  }, [value])
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
              <h3>SALES INFORMATION</h3>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Yearly Sales" {...a11yProps(5)} />
                    <Tab label="Monthly Sales (last 30 days)" {...a11yProps(1)} />
                    <Tab label="Weekly sales (last 7 days)" {...a11yProps(2)} />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  Total Orders: {stat.order}<br></br>
                  Total Earnings: {stat.earning}
                </TabPanel>
                <TabPanel value={value} index={1}>
                  Total Orders: {stat.order}<br></br>
                  Total Earnings: {stat.earning}
                </TabPanel>
                <TabPanel value={value} index={2}>
                  Total Orders: {stat.order}<br></br>
                  Total Earnings: {stat.earning}
                </TabPanel>
              </Box>
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
