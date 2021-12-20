import React from "react";
import { Button } from "reactstrap";
import { auth } from "../firebase";
import { Typography } from '@material-ui/core'
import "../App.css"
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
const theme = createTheme({
  typography: {
  htmlFontSize: 18,
  },
  palette: {
    primary: {
      main: "#4ED0CE",
    },
    secondary: {
      main: "#CC2844",
    },
    background: {
      default: "#FEF9F3"
    ,
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)"
    },
    } 
  },
});
export const SECONDARYBUTTONSTYL = { 
  padding: "6px 24px 6px 24px",
  borderRadius: "60px",
  border: "solid 2px"
}
const SignOutButton = () => (
    <Button color='secondary' style={{backgroundColor:theme.palette.secondary.main,padding:"6px 24px 6px 24px",borderRadius:"60px"}} 
      variant="contained" onClick={auth.doSignOut}>
      <Typography className="primaryFont700" style={{textTransform:"none"}} variant="h6">
        Sign Out
      </Typography>
    </Button>
);

export default SignOutButton;
