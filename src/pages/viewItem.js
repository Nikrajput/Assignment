import React, { useState, useEffect } from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Image,Container,Row,Col } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import Navbar from '../component/navbar';

import { db } from "../firebase";
import { db as db2 } from "../firebase/firebase";
import { ref as dbRef, onValue } from "firebase/database";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { CustomButton } from "../component/CustomButton";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import withAuthorization from "../authentication/withAuthorization";

const useStyles = makeStyles((theme) => ({
    overlayContainer: {
      padding:"15px",  
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    text:{
        fontWeight: "bold",
        fontSize:"20px"
    },
    loginButtons: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        marginTop: "1rem"
      },
  }));

const Item = (props) => {

  const classes = useStyles();
  const history = useHistory();
  const itemId=props.location.itemId;
  const [isLoading, setIsLoading] = useState(false);
  const [image,setImage]=useState();
  const [owner,setOwner]=useState();
  const [itemPurchased, setItemPurchased] = useState([])
  const user = firebase.auth().currentUser;
  const userId = user.uid;
  let imageDup;

  useEffect(() => {
    const itemOnSaleRef=dbRef(db2,`commodity`);
    onValue(itemOnSaleRef,(snapshot)=>{
        if(snapshot.val()){
            for(let id of Object.keys(snapshot.val())){
                if(id == itemId){
                    imageDup=snapshot.val()[id];
                    setImage(snapshot.val()[id]);
                    break;
                }
            }
        }
    })
    const usersRef=dbRef(db2,`users`);
    onValue(usersRef,(snapshot)=>{
        if(snapshot.val()){
            for(let id of Object.keys(snapshot.val())){
                if(id == imageDup.userId){
                    const res=snapshot.val()[id];
                    res['userId']=id;
                    setOwner(res);
                    setIsLoading(true);
                    break;
                }
            }
        }
    })
    const itemPurchasedRef=dbRef(db2,`users/${userId}/itemPurchased`);
    onValue(itemPurchasedRef,(snapshot)=>{
      if(snapshot.val()){
        setItemPurchased(snapshot.val());
      }
    })
  }, []);

  const handleOnClick=()=>{
    let data=[...itemPurchased];
    data.unshift(itemId)
    db.doCreateUserItemPurchased(userId,data);
    db.dodeleteCommodity(itemId);
    data=owner.itemOnSale.filter((key,value) => key!=itemId);
    db.doCreateUserItemOnSale(owner.userId,data);
    history.push('/');
  }

  return (
    <>
        {isLoading && <Container className={classes.overlayContainer}>
            <Navbar />
            <Image  src={image.imagePath} style={{padding:"100px",maxWidth:"1400px",maxHeight:"1400px"}}/>
            <Row >
                <Col xs={12} md={6} style={{display:"flex",justifyContent:"flex-end"}}>
                    <Typography  className={classes.text} >Name</Typography>
                </Col>
                <Col xs={12} md={6}>
                    <Typography  className={classes.text} >{image.name}</Typography>
                </Col>
                <Col xs={12} md={6} style={{display:"flex",justifyContent:"flex-end"}}>
                    <Typography  className={classes.text} >Category</Typography>
                </Col>
                <Col xs={12} md={6}>
                    <Typography  className={classes.text} >{image.category}</Typography>
                </Col>
                <Col xs={12} md={6} style={{display:"flex",justifyContent:"flex-end"}}>
                    <Typography  className={classes.text} >Price (Rs)</Typography>
                </Col>
                <Col xs={12} md={6}>
                    <Typography  className={classes.text} >{image.price}</Typography>
                </Col>
                <Col xs={12} md={6} style={{display:"flex",justifyContent:"flex-end"}}>
                    <Typography  className={classes.text} >Owner Name</Typography>
                </Col>
                <Col xs={12} md={6}>
                    <Typography  className={classes.text} >{owner.username}</Typography>
                </Col>
                <Col xs={12} md={6} style={{display:"flex",justifyContent:"flex-end"}}>
                    <Typography  className={classes.text} >Owner Email</Typography>
                </Col>
                <Col xs={12} md={6}>
                    <Typography  className={classes.text} >{owner.email}</Typography>
                </Col>
            </Row>
            <Container style={{display:"flex",alignItems:"center",justifyContent:"center",width:"100%"}}>
            {(userId !== image.userId && !image.isPurchased) && <CustomButton
                disableElevation
                variant="contained"
                fullWidth
                onClick={handleOnClick}
                >
                Purchase
            </CustomButton>}
        </Container>
        </Container>}
        
    </>
  );
};

const authCondition = (authUser) => authUser;

export default withAuthorization(authCondition)(Item);