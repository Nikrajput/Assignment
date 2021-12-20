import React, { useState, useEffect } from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Image,Container,Row,Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import {Typography} from "@material-ui/core";

import { db as db2 } from "../firebase/firebase";
import { ref as dbRef, onValue } from "firebase/database";

const ImageContainer = () => {
  // ** State
  const [isLoading, setIsLoading] = useState(false);
  const [image,setImage]=useState([]);

  useEffect(() => {
    const itemOnSaleRef=dbRef(db2,`commodity`);
    onValue(itemOnSaleRef,(snapshot)=>{
      if(snapshot.val()){
        const data=[]; 
        for(let id of Object.keys(snapshot.val())){
            const res=snapshot.val()[id];
            res['itemId']=id;
            if(!res.isPurchased)data.push(res);
        }
        setImage([...data]);
      }
      setIsLoading(true);
    })
  }, []);

  return (
    <>
        {isLoading && <Container style={{paddingTop:"100px"}}>
        <Typography
              variant="h4"
              style={{textAlign:"center",paddingBottom:"20px"}}
            >
              Welcome and start your journey of sale and purchase.
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

export default ImageContainer;
