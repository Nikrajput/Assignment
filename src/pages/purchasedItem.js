import React, { useState, useEffect } from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Image,Container,Row,Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Navbar from '../component/navbar';
import { db as db2 } from "../firebase/firebase";
import { ref as dbRef, onValue } from "firebase/database";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import withAuthorization from "../authentication/withAuthorization";
import {Typography} from "@material-ui/core";

const PurchasedItem = () => {
  // ** State
  const [isLoading, setIsLoading] = useState(false);
  const [image,setImage]=useState([]);
  const user = firebase.auth().currentUser;
  const userId = user.uid;

  useEffect(() => {
    const itemOnSaleRef=dbRef(db2,`commodity`);
    onValue(itemOnSaleRef,(snapshot)=>{
      if(snapshot.val()){
        const allItems=[]; 
        for(let id of Object.keys(snapshot.val())){
            const res=snapshot.val()[id];
            res['itemId']=id;
            allItems.push(res);
        }
        let purchasedItems=[]; 
        const itemPurchasedRef=dbRef(db2,`users/${userId}/itemPurchased`);
        onValue(itemPurchasedRef,(snapshot)=>{
            if(snapshot.val()){
                purchasedItems=snapshot.val();
            }
            const data=[];
            purchasedItems.map(item1 => {
                const res=allItems.find(item2 => item2.itemId == item1)
                if(res)data.push(res);
            })
            setImage(data);
        })
      }
      setIsLoading(true);
    })
  }, []);

  return (
    <>
        {isLoading && <Container style={{paddingTop:"100px"}}>
            <Navbar />
            <Typography
              variant="h4"
              style={{textAlign:"center",paddingBottom:"20px"}}
            >
              Items Purchased By You.
            </Typography>
            <Row >
                {image.map((img) => {
                    return (
                        <Col xs={12} md={6}>
                            <Link to={{pathname:"/item",itemId:`${img.itemId}`}}>
                                <Image src={img.imagePath} thumbnail style={{height:"400px"}}/>
                            </Link>
                        </Col>
                    )
                })}
            </Row>
        </Container>}
    </>
  );
};

const authCondition = (authUser) => authUser;

export default withAuthorization(authCondition)(PurchasedItem);
