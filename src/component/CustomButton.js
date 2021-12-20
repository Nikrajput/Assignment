import React from "react";

import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  customButton: {
    borderRadius: 50,
    // background: theme.palette.primary.main,
    fontWeight: "bold",
    padding: "6px 40px",
    fontSize: "22px",
    textTransform: "inherit",
    fontWeight: 800,
    fontFamily: "Manrope",
    color: "white",

    [theme.breakpoints.down("sm")]: {
      padding: "6px 20px",
      fontSize: "14px",
    },
  },
}));

export const CustomButton = ({ children, varaint, secondary, onClick, type, fullWidth, disabled, style, className }, props) => {
  const classes = useStyles();
  return (
    <Button
      className={`${classes.customButton} ${className}`}
      disableElevation
      variant={varaint ? varaint : "contained"}
      color={secondary ? "secondary" : "primary"}
      onClick={onClick}
      type={type}
      fullWidth={fullWidth}
      disabled={disabled}
      style={{...style}}
      {...props}
    >
      {children}
    </Button>
  );
};
