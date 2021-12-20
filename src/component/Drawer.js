import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Button,
  Box,
  Collapse,
  Link as MLink,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";

import { auth } from "../firebase/firebase";

import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import CloseIcon from "@material-ui/icons/Close";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: "blue",
    fontSize: "20px",
  },
  icon: {
    color: "white",
  },
  talkBtn: {
    borderRadius: 50,
    background: theme.palette.secondary.main,
    // padding: "10px 20px",
    color: "#fff",
    fontSize: "9px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    textTransform: "inherit",
    gap: 10,

    "& > span": {
      display: "flex",
      gap: 5,
    },

    "&:hover": {
      background: theme.palette.secondary.dark,
    },
  },
  btnLink: {
    marginRight: theme.spacing(1),
    "&:hover": {
      textDecoration: "none",
    },
  },
  fullScreenDrawer: {
    width: "100%",
    height: "100%",
    background: "rgba(255, 255, 255, 0.7)",
  },
  drawerStyles: {
    height: "100%",
    width: "100%",
    display: "flex",
    // alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  link: {
    fontWeight: 800,
    fontSize: "18px",
    color: "black",
    fontFamily: "Nunito",

    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 20px",
    alignItems: "center",
  },
  talkButton: {
    padding: "10px 50px",
    fontFamily: "Manrope",
    borderRadius: 50,
    textTransform: "inherit",
    background: theme.palette.secondary.main,
    fontSize: "16px",
    fontWeight: 600,
    color: "white",

    "& > span": {
      display: "flex",
      gap: 10,
    },

    "&:hover": {
      background: theme.palette.secondary.dark,
    },
  },
}));

const DrawerComponent = () => {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [open, setOpen] = useState(false);

  const [isUser, setIsUser] = useState(false);

  auth.onAuthStateChanged((user) => {
    if (user) {
      setIsUser(true);
    }
  });

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <Drawer
        open={openDrawer}
        className={classes.drawerStyles}
        classes={{ paper: classes.fullScreenDrawer }}
        anchor="right"
        onClose={() => setOpenDrawer(false)}
      >
        <div className={classes.header}>
          <img src="/headerlogo.svg" alt="BeFinSavvy Logo" height="40" />
          <CloseIcon onClick={() => setOpenDrawer(false)} />
        </div>
        <div className={classes.drawerStyles}>
          <List className={classes.listStyle}>
            <ListItem onClick={() => setOpenDrawer(false)}>
              <ListItemText>
                <Link to="/about" className={classes.link}>
                  About
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem onClick={() => setOpenDrawer(false)}>
              <ListItemText>
                <Link to="/services" className={classes.link}>
                  Services
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem onClick={handleClick}>
              <ListItemText>
                <Link to="" className={classes.link}>
                  Resources
                </Link>
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemText>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem onClick={() => setOpenDrawer(false)}>
                  <ListItemText>
                    <Link to="/risk-profile" className={classes.link}>
                      Risk Profile
                    </Link>
                  </ListItemText>
                </ListItem>
                <ListItem onClick={() => setOpenDrawer(false)}>
                  <ListItemText>
                    <Link to="/financial-literacy" className={classes.link}>
                      Financial Literacy
                    </Link>
                  </ListItemText>
                </ListItem>
                <ListItem onClick={() => setOpenDrawer(false)}>
                  <ListItemText>
                    <Link to="/faq" className={classes.link}>
                      FAQs
                    </Link>
                  </ListItemText>
                </ListItem>
              </List>
            </Collapse>
            {isUser ? (
              <ListItem onClick={() => setOpenDrawer(false)}>
                <ListItemText>
                  <Link to="/my-profile" className={classes.link}>
                    My Account
                  </Link>
                </ListItemText>
              </ListItem>
            ) : (
              <ListItem onClick={() => setOpenDrawer(false)}>
                <ListItemText>
                  <Link to="/signin" className={classes.link}>
                    Login / Register
                  </Link>
                </ListItemText>
              </ListItem>
            )}
          </List>
          <Box display="flex" justifyContent="center">
            <MLink
              target="_blank"
              href="https://api.whatsapp.com/send?phone=+917704047770&text=Hi BeFinSavvy, Can you please call me back?"
              className={classes.btnLink}
            >
              <Button
                variant="contained"
                disableElevation
                className={classes.talkButton}
              >
                Talk to us <WhatsAppIcon fontSize="16px" />
              </Button>
            </MLink>
          </Box>
        </div>
      </Drawer>
      <MLink
        target="_blank"
        href="https://api.whatsapp.com/send?phone=+917704047770&text=Hi BeFinSavvy, Can you please call me back?"
        className={classes.btnLink}
      >
        <Button
          variant="contained"
          disableElevation
          className={classes.talkBtn}
        >
          Talk to us <WhatsAppIcon fontSize="16px" />
        </Button>
      </MLink>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon />
      </IconButton>
    </>
  );
};
export default DrawerComponent;
