import React, {useEffect} from "react";
// import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom'
import { LazyLoadImage } from "react-lazy-load-image-component";
import { connect } from "react-redux";
import { handleLoginO } from "../event_functions";
import ShipIcon from "../assets/i1.png";

import DeliveryIcon from "../assets/i2.png";
// DeliveryIcon
import PickupIcon from "../assets/i4.png";
// PickupIcon
import InstoreIcon from "../assets/i5.png";
import ReserveTableIcon from "../assets/i6.png";

import store1img from '../assets/store_1.png'
import store2img from '../assets/store_2.png'
import store3img from '../assets/store_3.png'
import store4img from '../assets/store_4.png'

import "./Home.css";

const BZCards = (props) => {

  useEffect(() => {
    //console.log("@@@@@ In Container.jsx useEffect")
    props.loader_ref?.current?.complete();
  }, []); // eslint-disable-line, react-hooks/exhaustive-deps
  
  const ful_icons = {
    Pickup: PickupIcon,
    Delivery: DeliveryIcon,
    Ship: ShipIcon,
    Reserve: ReserveTableIcon,
    "In-Store": InstoreIcon,
  };

  const businesses = [
    {
      title:"Corner Store / Street Vendor", 
      desc:"Setup a corner store which sells a Fruits, Snacks, Bakery, Flower etc.", 
      img:store1img, bgcolor:"#dd7127", fuls:["Delivery","Ship","Pickup"]
    },
    {
      title:"Restaurant / Food cart", 
      desc:"Setup any food place with different menu(breakfast, lunch, dinner).", 
      img:store2img, bgcolor:"#3aa6cc", fuls:["Delivery","Pickup","Reserve"]
    },
    {
      title:"Grocery Store / Super Market", 
      desc:"Setup any department store with multiple departments and 1000s of products, franchises at multiple locations", 
      img:store3img, bgcolor:"#7feafe", fuls:["Delivery","Ship","Pickup","In-Store"]
    },
    {
      title:"Boutique", 
      desc:"Setup small virtual or physical stores to sell products such as clothes, gifts, decor, jewelry items with minimal effort", 
      img:store4img, bgcolor:"#aedcf4", fuls:["Delivery","Ship","Pickup"]
    }
  ]
  
  const { isAuthenticated } = false;

  const bresponse = businesses.map((obj, i) => {
    return (
        <div id={"business_"+i}
          className="mt-md-3 mt-1 p-1 position-relative one_store_top"
          onClick={() => {
            getSelBusiness(isAuthenticated);
          }}
          key={i}
        >
          <div className="w-100 p-2 sel_bu_top" 
          style={{ background: `${obj.bgcolor}`}}
          >
            <LazyLoadImage
              src={obj.img}
              loading="lazy"
              alt="business"
            />
          </div>
          <div className="w-100 d-flex flex-column p-2 sel_bu_bottom">
            <h5
              className="card-title m-0 w-100"
              style={{color: "#FFFFFF", zIndex: 5}}
            >
              {obj.title}
            </h5>
            <div className="mt-1 card-desc" style={{ lineHeight: "0.9rem" }}>
              <span
                style={{
                  color: "#FFFFFF", fontSize: "0.75rem",
                }}
              >
                {obj.desc}
              </span>
            </div>
            
            <div className="w-100 d-flex align-items-center justify-content-between pe-1">
              <div className="d-flex justify-content-between mt-2">
                {obj.fuls.map((ful, i) => {
                    return (
                      <div
                        className="d-icons-types d-flex flex-column align-items-center"
                        style={{marginLeft: "15px" }}
                        key={i}
                      >
                        <LazyLoadImage
                          style={{ width: "24px", lineHeight: ".9", textAlign: "center" }}
                          src={ful_icons[ful]}
                          loading="lazy"
                          className="img-fluid"
                          alt={ful}
                        />
                        <small className="text-center" 
                        style={{ fontSize: "0.6rem", color: "black" }}
                        >
                          {ful}
                        </small>
                      </div>
                    )
                })}
              </div>
              
              <button
                className="setup_button rounded mt-2"
              >
                <Link 
                  style={{color: "#FFFFFF"}} 
                  to="/dashboard/e/"
                >
                  Setup
                  <div
                      className="text-center"
                      style={{ fontSize: "0.5rem", lineHeight:"14px" }}
                    >
                      <i className="far fa-clock" style={{color:"black"}}></i>
                      &nbsp;10 minutes
                    </div>
                  </Link>
              </button>
            </div>
          </div>
        </div>
    )
  })

  return (
    <div 
      className="w-100 d-flex flex-wrap px-lg-3 p-1 justify-content-center">
      {bresponse}
    </div>
  );
};

function getSelBusiness(isAuth){
  // let cuser = firebase.auth().currentUser
  if(!isAuth) {
    handleLoginO()
  }
}

const mapStateToProps = (state) => {
  return {
    _auth: state.auth,
  };
};

export default connect(mapStateToProps, {})(BZCards)
