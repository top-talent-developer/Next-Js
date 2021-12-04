import React, { useEffect, useState } from "react";
// import { withRouter } from "react-router-dom";
//import { connect } from "react-redux";
//import firebase from "firebase";
//import "firebase/auth";

import "./Home.css";
// import Header from "../Header/Header";
// import BZCards from "./BZCards";

import loadable from "@loadable/component";
const Header = loadable(() => import("../Header/Header"));
const BZCards = loadable(() => import("./BZCards"));

// import { getDomainWithoutSubdomain, getDataFromServer } from "../event_functions";


const Home = (props) => {  

  const [pagePath, setPagePath] = useState();

  useEffect(() => {
    //console.log("in home changed page_path", page_path)
    //loader_ref.current?.continuousStart();
    setPagePath(window.location.pathname);
  }, [window.location.pathname]); // eslint-disable-line, react-hooks/exhaustive-deps

  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if(user) {
  //       //console.log("#####0")
  //       props.getLoginUserToken()
  //       getDataFromServer(user.uid, props.callFirebase)
  //     }
  //   });
  // },[]);

  return (
    <div
      id="homePage"
      className="home w-100 d-flex flex-column justify-content-center px-lg-5"
    >
      <Header loader_ref={props.loader_ref} />
      <div className="container-fluid BZGridMapView p-0 animate-bz"
        style={{background: "#18171f80"}}
      >
        <div
          className="container-fluid position-relative p-0"
          id="selectionStores"
        >
          <div className="gridView w-100 py-0 px-1 ">
            <BZCards />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home
