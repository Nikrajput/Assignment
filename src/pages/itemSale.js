import React, { useState, useEffect } from "react";
import { uid } from 'uid';

import {
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from "@material-ui/core";
import {
  FormGroup,
  Label,
  Input,
  Form,
  Row,
  Col,
  Alert,
} from "reactstrap";

import { Link, useHistory } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import { db } from "../firebase";
import { db as db2 } from "../firebase/firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { ref as dbRef, onValue } from "firebase/database";

import SEO from "../component/seo";
import withAuthorization from "../authentication/withAuthorization";

import { CustomButton } from "../component/CustomButton";

const useStyles = makeStyles((theme) => ({
  main: {
    position: "relative"
  },

  logoContainer: {
    position: "absolute",
    top: 10,
    left: 20,

    "& > img": {
      height: "60px"
    },

    [theme.breakpoints.down("sm")]: {
      "& > img": {
        height: "40px"
      }
    }
  },

  root: {
    width: "100vw",
    height: "100vh",
    display: "flex",
  },

  heading: {
    fontSize: "1.3rem",
    fontWeight: "bold",

    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem"
    }
  },

  formSection: {
    width: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    positon: "relative",

    [theme.breakpoints.down("md")]: {
      width: "100%",
      margin: "0 5%",
    },
  },

  loader: {
    zIndex: 3,
    position: "absolute",
    background: theme.palette.primary.light,
    width: "50%",
    opacity: 0.3,
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    [theme.breakpoints.down("md")]: {
      width: "100%"
    }
  },

  formContainer: {
    width: "50%",

    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },

  form: {
    margin: "2rem 0",
  },

  checkboxSection: {
    marginLeft: "1.3rem",
  },

  loginButtons: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginTop: "1rem"
  },

  signupText: {
    color: "gray",
    textAlign: "center",

    "& > span": {
      color: "black",
      fontWeight: "bold",
      marginLeft: "0.5rem",
    },

    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem"
    }
  },

  // ** Image Section **
  imageSection: {
    width: "50%",
  },

  imageContainer: {
    position: "relative",
    height: "100%",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  imageOverlayTextContainer: {
    zIndex: 2,
    position: "absolute",
    top: "80%",
    display: "flex",
    justifyContent: "center",
  },

  overlayInnerContainer: {
    width: "80%",
    padding: "1rem 2rem",
    background: "rgba( 255, 255, 255, 0.25 )",
    boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
    backdropFilter: "blur(4px)",
    "-webkit-backdrop-filter": "blur(4px)",
    border: "1px solid rgba( 255, 255, 255, 0.18 )",
    color: "white",
  },

  loginUsing: {
    display: "flex",
    justifyContent: "center",
    alignItems: 'center',
    gap: 30
  }
}));

const ItemSale = () => {
  const classes = useStyles();
  const history = useHistory();

  const theme = useTheme();
  const mediumDevice = useMediaQuery(theme.breakpoints.down("md"));

  // ** State
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState();
  const [image, setImage] = useState(null)
  const [itemOnSale, setItemOnSale] = useState([])

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const user = firebase.auth().currentUser;
  const userId = user.uid;

  useEffect(() => {
    const itemOnSaleRef=dbRef(db2,`users/${userId}/itemOnSale`);
    onValue(itemOnSaleRef,(snapshot)=>{
      if(snapshot.val()){
        setItemOnSale(snapshot.val());
      }
    })
  }, []);

  useEffect(() => {
    const timer = () => {
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    };

    return timer;
  }, [errorMessage]);

  const handleAddToSale = () => {
    if (image.type !== "image/jpeg" && image.type !=="image/png") {
      setErrorMessage("Invalid Image Type")
      return;
    }
    setIsLoading(true);
    const storage = getStorage();
    const itemId=uid(16);
    const storageRef = ref(storage, `${image.name}${itemId}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on('state_changed', 
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
            }
        }, 
        (error) => {
            setErrorMessage("Something went wrong!")
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                db.doCreateCommodity(itemId,name,category,price,downloadURL,userId);
                const data=[...itemOnSale];
                data.unshift(itemId);
                db.doCreateUserItemOnSale(userId,data);
                history.push('/');
            });
        }
        );
  };

  return (
    <>
      <SEO title="Item sale" />
      <div className={classes.main}>
        <Link to="/">
          <div className={classes.logoContainer}>
            <img src="/favicon.ico" alt="OLX"/>
          </div>
        </Link>
      </div>
      <div className={classes.root}>
        <section className={classes.formSection}>
          {isLoading && (
            <div className={classes.loader}>
              <CircularProgress color="inherit" size={60} />
            </div>
          )}
          <div className={classes.formContainer}>
            <Typography
              variant="h4"
              className={classes.heading}
            >
              Sell Your Item!
            </Typography>
            <Typography variant="h6">Please enter details for item.</Typography>
            <Form className={classes.form}>
              {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
              <Row>
                <Col sm={12}>
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      style={{ height: "42px"}}
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col sm={12}>
                  <FormGroup>
                    <Label for="category">Category</Label>
                    <Input
                      type="text"
                      name="category"
                      id="category"
                      style={{ height: "42px"}}
                      placeholder="Enter category "
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col sm={12}>
                  <FormGroup>
                    <Label for="price">Price Listed (Rs)</Label>
                    <Input
                      type="number"
                      name="price"
                      id="price"
                      style={{ height: "42px"}}
                      placeholder="0"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col sm={12}>
                  <FormGroup>
                    <Label for="image">Image of Item</Label>
                    <Input
                      type="file"
                      name="image"
                      id="image"
                      style={{ height: "42px" }}
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row className={classes.loginButtons}>
                <Col sm={12}>
                  <CustomButton
                    disableElevation
                    variant="contained"
                    fullWidth
                    onClick={handleAddToSale}
                    disabled={!name || !category || !price || !image}
                  >
                    Add to Sale
                  </CustomButton>
                </Col>
              </Row>
            </Form>
          </div>
        </section>
        {!mediumDevice && (
          <section className={classes.imageSection}>
            <div className={classes.imageContainer}>
              <img
                className={classes.image}
                src={require("../assets/login.jpg")}
                alt=""
              />
            </div>
          </section>
        )}
      </div>
    </>
  );
};

const authCondition = (authUser) => authUser;

export default withAuthorization(authCondition)(ItemSale);
