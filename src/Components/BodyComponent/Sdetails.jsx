import { Avatar } from "@material-ui/core";
import React from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { CircularProgress, Typography } from "@material-ui/core";
import VerifiedIcon from "@mui/icons-material/Verified";
import Popover from "@mui/material/Popover";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { Link } from "react-router-dom";

//export default function ListSecondary(){
const Sdetails = () => {
  const [shopData, setShopData] = useState([]);
  const [shopOwnerData, setShopOwnerData] = useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isVerified, setIsVerified] = React.useState(false);
  const [isPaid, setIsPaid] = React.useState(false);
  const [shopOrder, setShopOrder] = useState([]);
  //const [isLoadingowner, setIsLoadingowner] = React.useState(true);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [payoutData, setPayoutData] = React.useState([]);
  const [utr, setUtr] = React.useState([]);
  const [payments, setPayments] = React.useState([]);

  const [openDialog, setOpenDialog] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const close = (event) => {
    event.currentTarget.disabled = true;
  };

  const handlePopClose = () => {
    setAnchorEl(null);
  };

  const openpop = Boolean(anchorEl);
  const id = openpop ? "Transaction" : undefined;

  const [open2, setOpen2] = React.useState(false);
  const [amt_to_pay, setAmtTP] = React.useState(0);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const location = useLocation();
  const { state } = location;
  //console.log(state.from);
  //const shid = state.from;
  const recData = {
    sname: state.sname,
    saddr: state.saddr,
    sid: state.sid,
    smob: state.smob,
    shour: state.shour,
    isexp: state.isexp,
    sdays: state.sdays,
    simg: state.simg,
  };
  // console.log(recData.sid);
  // console.log(recData.sname);
  // console.log(recData.saddr);

  const verifyShop = () => {
    // let a = 0,
    //   b = 0;
    fetch(`http://100.25.104.108:80/api/updateVerification`, {
      method: "POST",
      body: JSON.stringify({
        shid: `${recData.sid}`,
      }),
      headers: {
        "Content-type": "application/json",
        Accept: "appilcation/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        // if (data.result) {
        //   b = 1;
        // }
      })
      .catch((err) => {
        console.log(err.message);
      });

    fetch(`http://100.25.104.108:80/api/updateVerificationCred`, {
      method: "POST",
      body: JSON.stringify({
        shid: `${recData.sid}`,
      }),
      headers: {
        "Content-type": "application/json",
        Accept: "appilcation/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log(data.result);
        // if (data.result) {
        //   a = 1;
        // }
        // Handle data
      })
      .catch((err) => {
        console.log(err.message);
      });

    setIsVerified(true);
  };

  const settlePayments = (sownerObj, shopobj) => {
    fetch(`http://100.25.104.108:80/api/makePayout`, {
      method: "POST",
      body: JSON.stringify({
        name: `${sownerObj.owner_name}`,
        mobno: `${sownerObj.owner_phone}`,
        accno: `${shopobj.bank_account_number}`,
        ifsc: `${shopobj.ifsc_code}`,
        amount: `${(amt_to_pay - (payments / 100.0)) * 100}`,
      }),
      headers: {
        "Content-type": "application/json",
        Accept: "appilcation/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        //console.log(shopobj.ifsc_code);
        setPayoutData(data);
        //console.log(payoutData.id);
        // Handle data
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const getPaymentStatus = () => {
    fetch(`http://100.25.104.108:80/api/fetchUtr/${payoutData.id}`)
      .then((response) => response.json())
      .then((data) => {
        //console.log(shopobj.ifsc_code);
        if (data.utr !== utr.utr) {
          setUtr(data);
        }
        //console.log(data.utr);
        // Handle data
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  React.useEffect(() => {
    const shopDocsFetch = async () => {
      const res = await fetch(
        `http://100.25.104.108:80/api/fetchShopDocs/${recData.sid}`
      );
      const result = await res.json();
      while (result.length === 0) { }
      if (result.length > 0) {
        setIsLoading(false);
      }
      setShopData(result);
    };
    shopDocsFetch();
  }, [isVerified]);

  React.useEffect(() => {
    const shopOwnerFetch = async () => {
      const res = await fetch(
        `http://100.25.104.108:80/api/getOwnerDetails/${recData.sid}`
      );
      const result = await res.json();
      while (result.length === 0) { }
      setShopOwnerData(result);
    };

    const shopOrderFetch = async () => {
      const res = await fetch(
        `http://100.25.104.108:80/api/getInvoiceShop/${recData.sid}`
      );
      const result = await res.json();
      setShopOrder(result);
      //console.log(shopOrder);
    };

    const getPayments = async () => {
      const res = await fetch(
        `http://100.25.104.108:80/api/fetchPayments/${recData.sid}`
      );
      const result = await res.json();
      //console.log(result.data[0]);
      setPayments(result);
      //console.log(payments);
      //console.log(typeof payments);
    };

    shopOwnerFetch();
    shopOrderFetch();
    getPayments();
  }, []);

  React.useEffect(() => {
    const createInstance = () => {
      fetch(`http://100.25.104.108:80/api/createPayout`, {
        method: "POST",
        body: JSON.stringify({
          shid: `${recData.sid}`,
          pid: `${payoutData.id}`,
          amount: `${payoutData.amount}`,
          status: `${payoutData.status}`,
        }),
        headers: {
          "Content-type": "application/json",
          Accept: "appilcation/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          //console.log(data);
          //console.log(shopobj.ifsc_code);
          // Handle data
        })
        .catch((err) => {
          //console.log(err.message);
        });
    };
    createInstance();
  }, [payoutData]);

  React.useEffect(() => {
    const updateInstance = () => {
      fetch(`http://100.25.104.108:80/api/updatePayout`, {
        method: "POST",
        body: JSON.stringify({
          shid: `${recData.sid}`,
          pid: `${utr.id}`,
          utr: `${utr.utr}`,
          status: `${utr.status}`,
        }),
        headers: {
          "Content-type": "application/json",
          Accept: "appilcation/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          //console.log(data);
          //console.log(shopobj.ifsc_code);
          // Handle data
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    if (utr.length === 0) {
    } else updateInstance();
  }, [utr]);

  React.useEffect(() => {
    shopOrder.forEach((obj) => {
      setAmtTP(amt_to_pay + ((obj.total_amount / 100.0) / 1.38) + ((obj.total_amount * 0.2 / 100.0) / 2.0));
    })
  }, shopOrder)

  // const styles = {
  //   position: "absolute",
  //   top: "50%",
  //   left: "50%",
  //   transform: "translate(-50%, -50%)",
  //   width: 400,
  //   bgcolor: "white",
  //   border: "2px solid #000",
  //   boxShadow: 24,
  //   p: 4,
  // };

  return (
    <>
      {!isLoading ? (
        <>
          {Array.isArray(shopData)
            ? shopData.map((shopobj) => {
              return (
                <>
                  <Avatar alt={`Avatar`} src={`${recData.simg}`} />
                  <TextField
                    id="standard-read-only-input"
                    defaultValue={`SHOP NAME => ${recData.sname}`}
                    fullWidth
                    variant="standard"
                    InputProps={{
                      readOnly: true,
                    }}
                    style={{ margin: "20px" }}
                  />
                  <TextField
                    id="standard-read-only-input"
                    defaultValue={`SHOP ADDRESS => ${recData.saddr}`}
                    fullWidth
                    multiline
                    variant="standard"
                    InputProps={{
                      readOnly: true,
                    }}
                    style={{ margin: "20px" }}
                  />
                  <TextField
                    id="standard-read-only-input"
                    defaultValue={`SHOP MOBILE NUMBER => ${recData.smob}`}
                    fullWidth
                    variant="standard"
                    InputProps={{
                      readOnly: true,
                    }}
                    style={{ margin: "20px" }}
                  />
                  <TextField
                    id="standard-read-only-input"
                    defaultValue={`OPERATINAL HOURS => ${recData.shour}`}
                    fullWidth
                    variant="standard"
                    InputProps={{
                      readOnly: true,
                    }}
                    style={{ margin: "20px" }}
                  />
                  <TextField
                    id="standard-read-only-input"
                    defaultValue={
                      recData.isexp === 0
                        ? `EXPRESS STATUS => Not Express`
                        : `EXPRESS STATUS => Express Shop`
                    }
                    fullWidth
                    variant="standard"
                    InputProps={{
                      readOnly: true,
                    }}
                    style={{ margin: "20px" }}
                  />
                  <TextField
                    id="standard-read-only-input"
                    defaultValue={`OPERATIONAL DAYS => ${recData.sdays}`}
                    fullWidth
                    variant="standard"
                    InputProps={{
                      readOnly: true,
                    }}
                    style={{ margin: "20px" }}
                  />
                  <TextField
                    id="standard-read-only-input"
                    defaultValue={`GST NUMBER => ${shopobj.gst_number}`}
                    fullWidth
                    variant="standard"
                    InputProps={{
                      readOnly: true,
                    }}
                    style={{ margin: "20px" }}
                  />
                  <TextField
                    id="standard-read-only-input"
                    defaultValue={`PAN => ${shopobj.pan_number}`}
                    fullWidth
                    variant="standard"
                    InputProps={{
                      readOnly: true,
                    }}
                    style={{ margin: "20px" }}
                  />
                  <TextField
                    id="standard-read-only-input"
                    defaultValue={`LEGAL ENTITY NAME & ADDRESS => ${shopobj.entity_name}, ${shopobj.address_legal_entity}`}
                    fullWidth
                    multiline
                    variant="standard"
                    InputProps={{
                      readOnly: true,
                    }}
                    style={{ margin: "20px" }}
                  />
                  <TextField
                    id="standard-read-only-input"
                    defaultValue={`SHOP LICENSE NUMBER => ${shopobj.shop_license_number}`}
                    fullWidth
                    multiline
                    variant="standard"
                    InputProps={{
                      readOnly: true,
                    }}
                    style={{ margin: "20px" }}
                  />
                  <TextField
                    id="standard-read-only-input"
                    defaultValue={`VERIFICATION STATUS => ${shopobj.verified_at
                      ? shopobj.verified_at
                      : `Not Verified`
                      }`}
                    fullWidth
                    multiline
                    variant="standard"
                    InputProps={{
                      readOnly: true,
                    }}
                    style={{ margin: "20px" }}
                  />
                  {console.log(shopobj.shop_license_image_url)}
                  <Button style={{ margin: "20px" }} onClick={handleOpen}>
                    <b>CLICK TO VIEW PAN CARD</b>
                  </Button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <img
                      style={{ width: "50%", height: "90%" }}
                      src={`${shopobj.pan_image_url}`}
                      alt="image"
                    />
                    {/* <Button onClick={handleClose}>CLOSE</Button> */}
                  </Modal>

                  <Button style={{ margin: "20px" }} onClick={handleOpen2}>
                    <b>CLICK TO VIEW SHOP LICENSE</b>
                  </Button>
                  <Modal
                    open={open2}
                    onClose={handleClose2}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <img
                      style={{ width: "50%", height: "90%" }}
                      src={`${shopobj.shop_license_image_url}`}
                      // src=""
                      alt="image"
                    />
                    {/* <Button onClick={handleClose}>CLOSE</Button> */}
                  </Modal>
                  <Link
                    to={{
                      pathname: "/shopStat",
                      state: {
                        sid: recData.sid,
                        sname: recData.sname,
                      },
                    }}
                    underline='none'
                    style={{
                      marginRight: "1.5rem",
                      color: "blue",
                    }}
                    className="cross-fade"
                  >
                    {`Shop Stats`}
                  </Link>

                  <br></br>
                  {shopOwnerData.map((sownerObj) => {
                    return (
                      <>
                        <Button
                          variant="contained"
                          endIcon={<AccountBalanceIcon />}
                          onClick={(e) => {
                            e.preventDefault();
                            if (amt_to_pay !== 0 && amt_to_pay > (payments / 100.0)) {
                              settlePayments(sownerObj, shopobj);
                              // setIsPaid(true);
                              handleClick(e);
                              //close(e);
                            } else {
                              alert("No transaction to process");
                              //close(e);
                            }
                          }}
                          style={{ margin: "20px" }}
                        >
                          Settle Payments
                        </Button>
                        <Popover
                          id={id}
                          open={openpop}
                          anchorEl={anchorEl}
                          onClose={handlePopClose}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                        >
                          <Typography sx={{ p: 2 }}>
                            {`Your Transaction is being processed.
                              Transaction ID: ${payoutData.id}
                              DO NOT REFRESH THE PAGE OR CLOSE THE WINDOW UNTIL TRANSACTION IS PROCESSED
                              Click on VIEW STATUS to check the latest status`}
                          </Typography>
                        </Popover>

                        <Button
                          variant="contained"
                          endIcon={<ReceiptIcon />}
                          onClick={(e) => {
                            e.preventDefault();
                            getPaymentStatus();
                            handleClickOpenDialog(e);
                          }}
                          style={{ margin: "20px" }}
                        >
                          View Payment Status
                        </Button>
                        <Dialog
                          fullScreen={fullScreen}
                          open={openDialog}
                          onClose={handleCloseDialog}
                          aria-labelledby="responsive-dialog-title"
                        >
                          <DialogTitle id="responsive-dialog-title">
                            {"LAST TRANSACTION DETAILS"}
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText>
                              {`TRANSACTION STATUS: ${utr.status}`}
                              <br></br>
                              {`RAZORPAY PAYOUT ID: ${utr.id}`}
                              <br></br>
                              {`UNIQUE TRANSACTION NUMBER: ${utr.utr}`}
                              <br></br>
                              {`TRANSACTION AMOUNT: Rs.${utr.amount / 100.0}`}
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleCloseDialog} autoFocus>
                              OKAY
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </>
                    );
                  })}
                  {!shopobj.verified_at && !isVerified ? (
                    <Button
                      variant="contained"
                      endIcon={<VerifiedIcon />}
                      onClick={(e) => {
                        e.preventDefault();
                        verifyShop();
                        // verifyShopCred();
                      }}
                      style={{ margin: "20px" }}
                    >
                      VERIFY SHOP
                    </Button>
                  ) : (
                    <Button
                      disabled
                      variant="contained"
                      endIcon={<VerifiedIcon />}
                      style={{ margin: "20px" }}
                    >
                      ALREADY VERIFIED
                    </Button>
                  )}
                </>
              );
            })
            : null}
        </>
      ) : (
        <Typography component="p" align="center" style={{ width: "100%" }}>
          <CircularProgress color="primary" />
        </Typography>
      )}
    </>
  );
};

export default Sdetails;
