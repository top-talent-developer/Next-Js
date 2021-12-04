import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { callApi } from "../../actions/components_action";
//import PropTypes from "prop-types";
import "../Header/header.css";
import "./nav.css";
import logo1 from "../assets/rapo-market2.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import LoadingBar from "react-top-loading-bar";
import loadable from "@loadable/component";
//import AccountCart from "../AccountCart";
//const AccountCart = loadable(() => import("../AccountCart"));
const Header = loadable(() => import("../Header/Header"));
const Cart = loadable(() => import("./CART/CART"));

//import SS from "../SS/SS";

const SCROLLABLEHEADER = (props) => {
  const loader_ref = useRef(null);
  const barColor = "#f11946";

  const [compdata, setCompData] = useState();
  const [cartdata, setCartData] = useState();
  const isAuthenticated = false;
  const user = {}

  let page_path = window.location.pathname;
  let page_slug = window.location.pathname;
  if (page_slug.split("/").length > 2) {
    page_slug = "/" + page_slug.split("/")[1];
  }

  let data_key = props.object.name + "." + props.object.ref_id;
  let query_vals =
    props._ENTITY_FIELD[props.object.name + "_" + props.object.ref_id];

  useEffect(() => {
    //console.log("header changed page_path");
    if (
      query_vals &&
      query_vals.p_ename?.name &&
      !props._CHILD_DATA[data_key]
    ) {
      setCompData(null);
      //console.log("comp value", query_vals)
      let filter_by = {};
      let p_filter_by = query_vals?.p_filter_by_and;
      if (p_filter_by && p_filter_by.length > 0) {
        p_filter_by.forEach((fl) => {
          filter_by[fl.name] = fl.value;
        });
      }
      let query = {
        operation: "/get_entity",
        params: {
          child: 1,
          ename: query_vals.p_ename?.name,
          filter_by: filter_by,
          req_def_fileds: ["_id", "name"]
        },
      };
      query.caller_id = data_key;
      query.caller_ref = "Page.get_entity";
      props.callApi(query);
    }
    if (query_vals?.name === "header_dashboard") {
      setCompData({});
    }
  }, [
    props._ENTITY_FIELD[props.object.name + "_" + props.object.ref_id],
    page_path,
  ]); // eslint-disable-line, react-hooks/exhaustive-deps

  useEffect(() => {
    //console.log("@@@@@ In SCROLLHEADER.jsx useEffect ", props?._CHILD_DATA)
    if (props._CHILD_DATA[data_key] && props._CHILD_DATA[data_key].values) {
      //console.log(props.object.name, "props._CHILD_DATA", props._CHILD_DATA[data_key])
      let pg_comp_data = props._CHILD_DATA[data_key].values[0];
      setCompData(pg_comp_data);
      props.loader_ref?.current?.complete();
    }
  }, [props._CHILD_DATA[data_key], page_path]); // eslint-disable-line, react-hooks/exhaustive-deps

  useEffect(() => {
    window.onscroll = function () {
      const animate_div = document.querySelector(".animate-nav");
      const dnavbar = document.getElementById("d-navbar");
      const forms = document.querySelector("#form-input");
      const navbar = document.getElementById("navbar");
      const btns = document.querySelectorAll(".white");
      const animate_logo2 = document.querySelector(".animate_logo2");
      const navbar_2 = document.querySelector(".navbar_2");
      const content_box = document.querySelector(".content_box");
      let scroll = window.pageYOffset;
      // console.log(scroll)
      if (query_vals?.name === "header 2") {
        if (scroll > 0) {
          if (animate_div) {
            animate_div.style.position = "fixed";
            animate_div.style.top = "56px";
            animate_div.classList.add("animate-navs");
          }
          if (dnavbar) {
            dnavbar.classList.add("fixed-top");
          }
          if (content_box) {
            content_box.style.position = "relative";
            content_box.style.top = "106px";
          }
        } else {
          if (dnavbar) {
            dnavbar.classList.remove("fixed-top");
          }
          if (animate_div) {
            animate_div.style.position = "relative";
            animate_div.style.top = "0px";
            animate_div.classList.remove("animate-navs");
          }
          if (content_box) {
            content_box.style.position = "relative";
            content_box.style.top = "0px";
          }
        }
      } else {
        if (scroll >= 185) {
          if (animate_div) {
            animate_div.style.position = "fixed";
            animate_div.style.top = "56px";
            animate_div.classList.add("animate-navs");
          }
          if (dnavbar) {
            dnavbar.classList.add("fixed-top");
          }
          if (forms) {
            forms.classList.add("fixed-top");
            forms.style.paddingTop = "1vh";
          }
          if (navbar_2) {
            navbar_2.classList.remove("d-none");
          }
          if (navbar) {
            navbar.style.display = "none";
          }

          btns.forEach((btn) => {
            btn.style.color = "var(--color_white)";
          });
        } else {
          if (navbar_2) {
            navbar_2.classList.add("d-none");
          }
          if (dnavbar) {
            dnavbar.classList.remove("fixed-top");
          }
          if (animate_div) {
            animate_div.style.position = "relative";
            animate_div.style.top = "0px";
            animate_div.classList.remove("animate-navs");
          }
          // animate_d_div.classList.remove('animate-d-navs')
          if (forms) {
            forms.classList.remove("fixed-top");
          }
          if (animate_logo2) {
            animate_logo2.style.border = "none";
          }
          if (navbar) {
            navbar.style.display = "flex";
            navbar.style.background = "transparent";
          }

          btns.forEach((btn) => {
            btn.style.color = "white";
          });
        }
      }
    };
  });

  useEffect(() => {
    let cart_enabled = query_vals?.add_to_cart
    if (!props?._CHILD_DATA["Cart"] && isAuthenticated && cart_enabled && cart_enabled === "Enabled") {
      loadCart();
    }
  }, [props?._auth?.isAuthenticated]); // eslint-disable-line, react-hooks/exhaustive-deps

  useEffect(() => {
    //console.log("cart data ", props._CHILD_DATA["Cart"])
    if (props?._CHILD_DATA["Cart"] && isAuthenticated) {
      setCartData(props?._CHILD_DATA["Cart"])
    }
  }, [props?._CHILD_DATA["Cart"]]); // eslint-disable-line, react-hooks/exhaustive-deps

  const loadCart = () => {
    //console.log("user id ", user.id)
    props.callApi({
      operation: "/get_entity",
      caller_ref: "SCROLLABLEHEADER.loadCart",
      params: {
        ename: "Cart",
        child: 1,
        //create_if_doesnt_exist:true,
        filter_by:{user_id: user ? user.id : null },
        req_def_fileds:["_id", "name", "fields"]
      },
    });
  }

  return compdata ? (
    <>
    {isAuthenticated && cartdata && (query_vals?.add_to_cart === "Enabled" || !query_vals?.add_to_cart) ? (
      <>
      {/* {console.log("cart loading", query_vals?.add_to_cart)} */}
      <Cart 
        cart={cartdata?.values?.length > 0 ? cartdata.values[0] : {}} 
        fields={cartdata?.def?.fields ? cartdata?.def.fields : null } 
      />
      </>
    ) : null }
    { query_vals?.name === "header_dashboard" ? (
      <Header loader_ref={props.loader_ref} />
    ) : (
      <div className="w-100">
        {/* {console.log("header data", compdata)} */}
        {/* <SearchPage/> */}
        {/* <User/> */}
        <nav
          className={
            query_vals?.name === "header 2"
              ? "navbar py-2 px-1 px-md-2"
              : "navbar d-flex justify-content-between py-2 px-lg-3 px-md-3 fixed-top shopnavbar"
          }
          style={
            query_vals?.name === "header 2"
              ? {
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.363)),
            url(${
              compdata?.banners?.length > 0 ? compdata.banners[0].Image : null
            })`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : {}
          }
          id={query_vals?.name === "header 2" ? "d-navbar" : "navbar"}
        >
          <div className="d-flex" id="logo">
            <i
              className="fas fa-bars mt-md-2 mt-0 ms-1"
              style={{ color: "white", fontSize: "1.2em" }}
            ></i>
            {props._CS?.col_status === 1 ? (
              <Link to="/">
                <LazyLoadImage
                  className="img-fluid logo1"
                  src={logo1}
                  loading="lazy"
                  alt=""
                />
              </Link>
            ) : (
              <Link to="/">
                <LazyLoadImage
                  src={
                    compdata?.images?.length > 0 ? compdata.images[0].Image : null
                  }
                  className="animate_logo2 mx-2 rounded-circle"
                  loading="lazy"
                  // style={{borderRadius:"50%"}}
                  alt=""
                />
              </Link>
            )}
          </div>
          
          <div className="col-4 d-lg-block d-none"></div>
          {/* ----------------account-cart---------------------- */}
          {/* <AccountCart cart={cartdata?.values?.length > 0 ? cartdata.values[0] : {}} /> */}
        </nav>
        {/* 2 */}
        {query_vals?.name === "header 1" ? (
          <nav
            className="navbar navbar_2 py-2 px-md-3 fixed-top shopnavbar d-none"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.363)),
            url(${
              compdata?.banners?.length > 0 ? compdata.banners[0].Image : null
            })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            id="navbar_2"
          >
            <div className="d-flex col-6 col-md-3 ps-2 lh-1">
              <LazyLoadImage
                src={
                  compdata?.images?.length > 0 ? compdata.images[0].Image : null
                }
                className="animate_logo2 rounded-circle"
                loading="lazy"
                alt=""
              />{" "}
              &nbsp;
              <div className="specss position-relative white d-flex justify-content-center">
                <Link
                  style={{ color: "white", textDecoration: "none" }}
                  to="/shop"
                  onClick={(e) => {
                    //props.setBZPopupDT("pick-store");
                    //SstoreOpen();
                  }}
                >
                  <h5 style={{ fontWeight: 800 }} className="navStoreName">
                    {"Houston Wholesale Flooring"} &nbsp;
                    <i className="fas fa-chevron-down "></i>
                  </h5>
                </Link>
                <small className="delivery-text"></small>
              </div>
            </div>
            {/* <div className="form-input col-12 col-sm-9 col-lg-6 m-auto d-lg-block" id="form-input">
            <SS/>
            </div> */}
            {/* ----------------right-ul---------------------- */}
            {/* <AccountCart cart={cartdata?.values && cartdata?.values?.length > 0 ? cartdata.values[0] : {}} /> */}
          </nav>
        ) : null}
        {/* 2 */}
        {/* header */}
        {query_vals?.name === "header 1" ? (
          <div
            className="header text-center p-2 py-3"
            style={{
              height: "260px",
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.363)), 
            url(${
              compdata?.banners?.length > 0 ? compdata.banners[0].Image : null
            })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div
              className={
                props._CS?.col_status === 1
                  ? "mt-xl-0 mt-md-2 pt-4 mt-5 d-flex flex-column align-items-center"
                  : "d-none"
              }
            >
              <LazyLoadImage
                src={
                  compdata?.images?.length > 0 ? compdata.images[0].Image : null
                }
                className="specs img-fluid animate_log rounded-circle"
                loading="lazy"
                alt=""
              />
              <span>
                <span
                  className="store-name1 white fs-3"
                  onClick={(e) => {
                    //props.setBZPopupDT("pick-store");
                    //BZGridMapViewOpen();
                  }}
                >
                  {/* <p  onClick={(e)=>{props.setBZPopupDT("pick-store");SstoreOpen()}}> */}
                  {"Houston Wholesale Flooring"}&nbsp;
                  {/* <i className="fas fa-chevron-down store-dn-1 mt-3 mt-sm-1"></i> */}
                </span>
              </span>
              <p className="white store-name_detail">
                {
                  // props._GLOBAL.business.s_address &&
                  // props._GLOBAL.business.s_address?.city &&
                  // props._GLOBAL.business.s_address?.state
                  //   ? props._GLOBAL.business.s_address?.city +
                  //     "," +
                  //     props._GLOBAL.business.s_address?.state
                  //   : props._GLOBAL.business.s_address &&
                  //     props._GLOBAL.business.s_address?.state
                  //   ? props._GLOBAL.business.s_address?.state
                  //   : props._GLOBAL.business.s_address?.street
                }{" "}
                |{" "}
                <Link
                  to="/store/Info/Id"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Store Info
                </Link>
              </p>
            </div>
            <div
              className="form-input col-12 col-sm-9 col-lg-6 m-auto md-mt-n5 d-lg-block m-auto"
              id="form-input"
            >
              {/* <SS /> */}
            </div>
          </div>
        ) : null}
      </div>
    )}
    </>
  ) : (
    <div
      className="w-100 d-flex"
      style={{
        alignItems: "center",
        minHeight: "50px",
        justifyContent: "center",
      }}
    >
      <LoadingBar color={barColor} ref={loader_ref} />{" "}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    _ENTITY_FIELD: state.entity.ENTITY_FIELD,
    _CHILD_DATA: state.entity.CHILD_DATA,
  };
};
export default connect(mapStateToProps, { callApi })(
  SCROLLABLEHEADER
);
