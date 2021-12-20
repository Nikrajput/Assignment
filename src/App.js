import React, { useLayoutEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Home from "./component/home";
import Signup from "./auth/SignUp";
import Login from "./auth/Login";
import ItemSale from "./pages/itemSale";
import Item from "./pages/viewItem";
import PurchasedItem from "./pages/purchasedItem";
import OnSaleItem from "./pages/onSaleItem";
import ScrollToTop from "./utils/scrollToTop";
import { Suspense } from "react";
import RouterChangeTracker from "./component/routerChangeTracker";
import withAuthentication from "./authentication/withAuthentication";
import "./App.css";

const theme = createTheme({
  typography: {
    htmlFontSize: 18,
    fontFamily: ["Manrope", "Nunito", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#4ED0CE",
    },
    secondary: {
      main: "#CC2844",
    },
    background: {
      default: "#FEF9F4",
      text: {
        primary: "rgba(0, 0, 0, 0.87)",
        secondary: "rgba(0, 0, 0, 0.54)",
        disabled: "rgba(0, 0, 0, 0.38)",
        hint: "rgba(0, 0, 0, 0.38)",
      },
    },
  },
  breakpoints: {
    values: {
      xs: 460,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },

  overrides: {
    MuiTypography: {
      h1: {
        fontFamily: "Nunito, sans-serif",
      },
      h2: {
        fontFamily: "Nunito, sans-serif",
      },
      h3: {
        fontFamily: "Nunito, sans-serif",
      },
      h4: {
        fontFamily: "Manrope, sans-serif",
      },
      h5: {
        fontFamily: "Manrope, sans-serif",
      },
      h6: {
        fontFamily: "Manrope, sans-serif",
      },
    },
  },
});
const App = (props) => {
  return (
    <MuiThemeProvider theme={theme}>
      <Suspense fallback={<div></div>}>
        <div className="App" style={{ flex: 1 }}>
          <BrowserRouter>
            <RouterChangeTracker />
            <ScrollToTop>
              <Route exact path="/" component={Home} />
              <Route exact path="/signUp" component={Signup} />
              <Route exact path="/signIn" component={Login} />
              <Route exact path="/itemSale" component={ItemSale} />
              <Route exact path="/item" component={Item} />
              <Route exact path="/purchasedItem" component={PurchasedItem} />
              <Route exact path="/onSaleItem" component={OnSaleItem} />
            </ScrollToTop>
          </BrowserRouter>
        </div>
      </Suspense>
    </MuiThemeProvider>
  );
};

export default withAuthentication(App);
