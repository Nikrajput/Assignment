import React, { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  Popover,
  makeStyles,
  useTheme,
  Button,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Link as MLink,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import DrawerComponent from "./Drawer";


import { auth } from "../firebase/firebase";
import  SignOutButton  from "../auth/SignOut";

const useStyles = makeStyles((theme) => ({
  header: {
    boxShadow: "none",
    background: "#48b1bf",
    backdropFilter: "blur(8px)",
  },
  navbar: {
    margin: "0 60px",
    boxShadow: "none",
    [theme.breakpoints.down("md")]: {
      margin: "0 5px",
    },
  },
  navlinks: {
    marginLeft: theme.spacing(5),
    display: "flex",
    alignItems: "center",

    [theme.breakpoints.down("md")]: {
      marginLeft: theme.spacing(2),
    },
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  logoImg: {
    height: "65px",

    [theme.breakpoints.down("sm")]: {
      height: "40px",
    },
  },
  link: {
    textDecoration: "none",
    color: "black",
    fontSize: "18px",
    fontWeight: "bold",
    marginLeft: theme.spacing(5),
    "&:hover": {
      color: 'white',
      textDecoration: "none",
    },

    [theme.breakpoints.down("md")]: {
      fontSize: "14px",
    },
  },
  popoverLink: {
    textDecoration: "none",
    color: "black",
    fontSize: "18px",
    fontWeight: 800,
    "&:hover": {
      color: theme.palette.primary.dark,
      textDecoration: "none",
    },

    [theme.breakpoints.down("md")]: {
      fontSize: "14px",
    },
  },
  talkBtn: {
    borderRadius: 50,
    background: theme.palette.secondary.main,
    padding: "6px 20px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    textTransform: "inherit",
    gap: 10,

    "& > span": {
      display: "flex",
      gap: 10,
    },

    "&:hover": {
      background: theme.palette.secondary.dark,
    },

    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(1, 2),
      fontSize: "12px",
    },
  },
  btnLink: {
    marginLeft: theme.spacing(5),
    "&:hover": {
      textDecoration: "none",
    },
  },
  resourcesPopover: {
    padding: "10px",
  },
  popoverStyle: {
    background: "rgba(255, 255, 255, 0.6)",
  },

  popoverLi: {
    transition: "0.3s ease-in-out",
    "&:hover": {
      background: "white",
    },
  },
}));

function Navbar() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isUser, setIsUser] = React.useState(false);

  useEffect(()=>{
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsUser(true);
      }
      else{
        setIsUser(false);
      }
    });
  },[])

  

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  // ** Waitlist form
  const [showWaitlist, setShowWaitlist] = React.useState(false)

  const handleWaitlistForm = () => {
    setShowWaitlist(!showWaitlist)
  }

  const handleCloseWaitlist = () => {
    setShowWaitlist(false)
  }

  return (
    <AppBar position="fixed" className={classes.header}>
      <Toolbar className={classes.navbar}>
        <div className={classes.logo}>
          <Link to="/">
            <img
              className={classes.logoImg}
              src="/favicon.ico"
              alt="OLX"
            />
          </Link>
        </div>
        {isMobile ? (
          <DrawerComponent />
        ) : (
          <div className={classes.navlinks}>
            <Link to="/onSaleItem" className={classes.link}>
              MyOnSaleItems
            </Link>
            <Link to="/purchasedItem" className={classes.link}>
              PurchasedItem
            </Link>
            <Link to="/itemSale" className={classes.link}>
              SaleYourItem
            </Link>
            {isUser ? (
              <div className={classes.btnLink}>
                <SignOutButton />
              </div>
            ) : (
              <MLink href="/signIn" className={classes.btnLink}>
                <Button
                  variant="contained"
                  disableElevation
                  className={classes.talkBtn}
                  
                >
                  SignIn
                </Button>
              </MLink>
            )}
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
