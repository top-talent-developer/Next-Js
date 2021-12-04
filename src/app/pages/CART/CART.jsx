import { useState, useEffect } from "react";
import { connect } from "react-redux";
import Clear from "@material-ui/icons/Clear";
import { callApi } from "../../../actions/components_action";
import { Link } from "react-router-dom";
import { ChevronRight } from "@material-ui/icons";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./CART.css";
// import {
//   SstoreOpen,
//   handleLoginO,
// } from "../event_functions";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import ChevronLeftOutlinedIcon from "@material-ui/icons/ChevronLeftOutlined";

function Cart(props) {
  //const [hideStoreCartItemsVal,setHideStoreCartItemsVal]=useState("x")
  const { isAuthenticated, user } = props._auth;
  let missingImg =
    "https://firebasestorage.googleapis.com/v0/b/rapo-prod.appspot.com/o/pimages%2Fmissing-item-image?alt=media&token=26ad9768-4511-4d20-bd35-c499f2717cdd";

  const closeCheckoutcart = () => {
    if (document.querySelector(".carts-nav")) {
      document.querySelector(".carts-nav").style.display = "flex";
    }
    if (document.querySelector(".checkouts-nav")) {
      document.querySelector(".checkouts-nav").style.display = "none";
    }
    if (document.querySelector(".cart-nav")) {
      document.querySelector(".cart-nav").style.width = "auto";
    }
    if (document.querySelector("#checkOutSummaryDiv")) {
      document.querySelector("#checkOutSummaryDiv").style.marginRight = "-38%";
      document.querySelector("#checkOutSummaryDiv").style.display = "none";
    }
    if (document.querySelector(".check-out-before")) {
      document.querySelector(".check-out-before").style.display = "block";
    }
  };
  const openCheckoutCart = () => {
    let coutbtn = document.querySelector("#checkOutSummaryDiv");
    coutbtn.style.marginRight = "0%";

    document.querySelector(".checkouts-nav").style.display = "flex";
    document.querySelector(".carts-nav").style.display = "none";
    coutbtn.style.transition = "0.3s all";
    coutbtn.style.display = "block";
    document.querySelector(".check-out-before").style.display = "none";
  };

  const [previewText, changeText] = useState("");
  useEffect(() => {
    var btn = document.querySelectorAll(".previewd");
    const handlePreview = (e) => {
      btn.forEach((btns) => {
        //console.log(btns.parentElement.parentElement.parentElement.parentElement.nextElementSibling,"pppppp")
        btns.parentElement.parentElement.parentElement.parentElement.nextElementSibling.style.display =
          "none";
      });
      e.currentTarget.parentElement.parentElement.parentElement.parentElement.nextElementSibling.style.display =
        "flex";
    };

    btn.forEach((btn) => {
      btn.addEventListener("click", handlePreview);
    });

    document.addEventListener(
      "click",
      (evt) => {
        let targetEl = evt.target; // clicked element
        if (
          targetEl.classList.contains("previewd") ||
          targetEl.classList.contains("text-area")
        ) {
          var btn = document.querySelectorAll(".tex");
          btn.forEach((btn) => {
            btn.style.display = "block";
          });
          // return null;
        } else {
          var prev = document.querySelectorAll(".preview-div");
          prev.forEach((btn) => {
            btn.style.display = "none";
          });
        }
      },
      { passive: true }
    );

    document.addEventListener(
      "click",
      (evt) => {
        let targetEl = evt.target;
        if (
          targetEl.classList.contains("closecart") ||
          targetEl.classList.contains("extra") ||
          targetEl.classList.contains("item_name_cart")
        ) {
          if (document.getElementsByClassName("main-cart")[0]) {
            document.getElementsByClassName("main-cart")[0].style.display =
              "none";
          }
          document.body.style.overflow = "auto";
        }
      },
      { passive: true }
    );
    checkValidOrder();
  });
  const handleCloseCart = () => {
    if (document.getElementsByClassName("main-cart")[0]) {
      document.getElementsByClassName("main-cart")[0].style.display = "none";
    }
    document.body.style.overflow = "auto";
  };

  const checkValidOrder = (e) => {
    let validorder = true;
    let _msgs = "";
    props.cart?.value?.cart_items.forEach((scart) => {
      if (scart.c_stat && scart.qty > 0) {
        let _c_stat = scart.c_stat;
        if (_c_stat.a.c !== 0) {
          validorder = false;
          _msgs = _msgs + renderMsg(_c_stat.a.m);
        }
        if (_c_stat.f.c !== 0) {
          validorder = false;
          _msgs = _msgs + renderMsg(_c_stat.f.m);
        }
        if (_c_stat.p.c !== 0) {
          validorder = false;
          _msgs = _msgs + renderMsg(_c_stat.p.m);
        }
      }
    });
    let _order = 1;
    if (!validorder) {
      document.querySelector(".placeOrderBtn").classList.add("off");
      document.querySelector(".placeOrderMsgs").innerHTML = _msgs;
      _order = 0;
    } else {
      if (document.querySelector(".placeOrderBtn")) {
        document.querySelector(".placeOrderBtn").classList.remove("off");
        document.querySelector(".placeOrderMsgs").innerHTML = "";
      }
    }
    return _order;
  };

  const renderMsg = (msg) => {
    return (
      '<p className="w-100 m-0 p-0" style="font-size:0.75rem"><i style="color:red" className="fa fa-exclamation-circle"></i>&nbsp;' +
      msg +
      "</p>"
    );
  };
  const placeOrder = (e) => {
    if (checkValidOrder() === 1) {
      // props.callApi({
      //   operation: "/check_out",
      //   caller_ref: "cart.placeOrder",
      //   params: {},
      // });
    }
  };

  const SaveItemToCart = (_item, _qty) => {
    console.log("_item _qty", _qty)
    let _cart_items = props.cart?.cart_items ? {...props.cart.cart_items} : {}

    if (Object.keys(_cart_items).indexOf(_item.item_id) > -1) {
      if(_qty === 0){
        delete _cart_items[_item.item_id]
      } else {
        let c_item = { ..._cart_items[_item.item_id] }
        c_item.item_qty = parseInt(_qty)
        c_item.item_total = c_item.item_price * c_item.item_qty
        _cart_items[_item.item_id] = c_item
      }
    }
    let _value = { cart_items: _cart_items, user_id: user.id }
    console.log(_value)
    //return
    props.callApi({
      operation: "/save_entity",
      caller_ref: "CAROUSEL.addCart",
      dispatch:true,
      params: {
        child:1,
        ename: "Cart",
        eid: props.cart?._id ? props.cart._id : 0,
        value: _value
      },
    });
  }

  let store; 
  if (props.cart?.cart_items) {
    store = Object.keys(props.cart.cart_items).map((oid, i) => {
      let item = props.cart.cart_items[oid]
        return (
          <div
            key={i}
            className="added-item"
          >
            <div className="item-details px-1">
              <div className="position-relative items-left">
                <div
                  className="mt-0 col-xl-2 col-lg-2 col-md-2 col-2 px-3"
                  id="item_img_cart"
                >
                  <LazyLoadImage
                    src={
                      item.item_thumb
                        ? item.item_thumb
                        : missingImg
                    }
                    className="img-fluid"
                    loading="lazy"
                    alt=""
                  />
                </div>
                <div className="item-about p-1 ms-2">
                  <div className="item_nm">
                    <Link
                      style={{ color: "var(--color_purple)" }}
                      to={
                        '/item/'+item.item_id
                      }
                      className="item_name_cart p-0"
                      // onClick={(k) => {
                      //   //console.log("coming here????", k);
                      //   getPDData(scart.bid, scart.sid, item.pid);
                      // }}
                    >
                      {item.item_name}
                    </Link>
                  </div>

                  <div className="preview-remove">
                    <div className="previewd">
                      <i
                        style={{
                          color: `${
                            item.pref && item.pref.length !== 0
                              ? "green"
                              : "#808080"
                          }`,
                        }}
                        className="previewd far fa-edit item_name_span"
                      ></i>
                      &nbsp;
                      <span
                        className="previewd item_name_span"
                        style={{
                          color: `${
                            item.pref && item.pref.length !== 0
                              ? "green"
                              : "#808080"
                          }`,
                        }}
                      >
                        Preferences
                      </span>
                    </div>

                    <div
                      className="remove ms-3"
                      onClick={() => {
                        if (isAuthenticated) {
                          SaveItemToCart(item, 0)
                        }
                      }}
                    >
                      <i
                        style={{ color: "#808080" }}
                        className="fas fa-trash-alt item_name_span"
                      ></i>
                      &nbsp;{" "}
                      <span className="item_name_span">Remove</span>
                    </div>
                  </div>
                </div>

                <div className="count-drop text-center pt-2 item-qty bg-white">
                  <select
                    onChange={(e) => {
                      if (isAuthenticated) {
                        SaveItemToCart(item, e.target.value)
                      }
                    }}
                    value={item.item_qty}
                    className="count-down"
                    name="select_c"
                    id="select_c"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>
              </div>

              <div className="cost-item px-0">
                <div className="item-n">${item.item_price * item.item_qty}</div>
              </div>
            </div>
            <div className="preview-div border m-auto">
              <textarea
                onChange={(e) => {
                  changeText(e.target.value);
                }}
                name=""
                className="text-area"
                placeholder="preview...."
                cols="auto"
                rows="2"
              >
                {item.pref}
              </textarea>

              <button
                type="button"
                style={{ height: "35px" }}
                className="text-area-btn"
                onClick={(e, i) => {
                  //props.addMessage2CartItem(scart.sid, item, previewText);
                  e.preventDefault();
                  // props.callApi({
                  //   operation: "/save_item_to_cart",
                  //   caller_ref: "cart.savepreference",
                  //   params: {
                  //     bid: props._GLOBAL.business.bid,
                  //     sid: scart.sid,
                  //     pid: `${item.pid}`,
                  //     qty: item.qty,
                  //     pref: previewText,
                  //   },
                  // });
                }}
              >
                save
              </button>
            </div>
          </div>
        );
      })
  }

  return (
    <div className="main-cart container-fluid ">
      {console.log("cart componet loaded")}
      <div className="menu d-flex flex-md-row flex-column justify-content-end w-100">
        <div className="submenu d-flex flex-column ms-auto">
          <div className="cart-nav checkouts-nav bg-light w-100">
            {props.cart?.order_id === undefined ? (
              <>
                <div className="">
                  <ChevronLeftOutlinedIcon onClick={closeCheckoutcart} />{" "}
                  &nbsp;
                  <ShoppingCartOutlinedIcon onClick={closeCheckoutcart} />
                </div>
                <div>
                  <h6>Checkout</h6>
                </div>
              </>
            ) : (
              <div className="d-flex align-items-center justify-content-center w-100">
                <h6 className="m-0">
                  <i
                    style={{ color: "green" }}
                    className="fa fa-check-circle"
                  ></i>
                  &nbsp;Ordered
                </h6>
              </div>
            )}
            <Clear
              className="closecart"
              onClick={(e) => {
                handleCloseCart();
                closeCheckoutcart();
              }}
            />
          </div>
          <div className="cart-nav carts-nav bg-light">
            <div className="" style={{ visibility: "hidden" }}>
              <ChevronLeftOutlinedIcon />
            </div>
            <div style={{ fontSize: "1.2em" }}>
              <i
                className="fas fa-cart-arrow-down"
                style={{ color: "#3E3665" }}
              ></i>{" "}
              Cart
            </div>

            <Clear className="closecart" onClick={(e) => handleCloseCart()} />
          </div>

          <div className="cart-summary p-0 d-flex flex-md-row flex-column bg-white">
            {/* ----------------------------------------------------------- */}

            <div
              id="cartBoxDiv"
              className="cart-box bg-light order-md-1 order-1 ms-auto"
              style={{ display: props.cart?.order_id ? "none" : "block" }}
            >
              <div className="cart-items">
                <div className="cart-items-inside">
                  <div
                    className="accordion accordion-flush mt-2 px-md-2 px-1 w-100"
                    id="accordionCart"
                  >
                    <div id={"added-items_" + props.cart?._id} className="added-items">
                    {store ? store : null }
                    </div>
                    <div>
                      {!props.cart?.cart_items || props.cart?.summary?.qty === 0 ? (
                        <div className="row text-center m-auto ">
                          <div className="d-flex w-100 mt-5">
                            <h4 className="m-auto p-2">
                              Your Cart is Empty.
                            </h4>
                          </div>
                          <div className="d-flex w-100">
                            <div className="m-auto p-2">
                              Check your Saved for later items or&nbsp;
                              <Link
                                to={
                                  `/shop`
                                }
                                style={{ textDecoration: "none" }}
                                onClick={(e, i) => {
                                  handleCloseCart();
                                }}
                              >
                                Continue shopping
                              </Link>
                              .
                            </div>
                          </div>
                        </div>
                      ) : null}

                      <div className="p-1"></div>
                    </div>
                  </div>
                </div>
              </div>
              {props.cart?.cart_items && props.cart?.cart_items?.length !== 0 ? (
                <div className="check-out-before">
                  <button
                    className="d-flex position-relative justify-content-end checkoutBtn"
                    onClick={(e) => {
                      checkValidOrder();
                      openCheckoutCart();
                    }}
                  >
                    <p className="col-md-5 col-7 m-auto checkoutBtn_text">
                      Go to Checkout
                    </p>
                    <div className="col-md-3 col-3 total-ammount position-absolute rounded checkoutBtn_price">
                      $ {props.cart?.summary?.amount?.toFixed(2)}
                    </div>
                  </button>
                </div>
              ) : null}
            </div>

            {/* --------------------------------------- */}
            {/* <div className='px-2 bg-white h-100 col-xl-3 col-md-5 col-sm-9 p-0 ml-md-0 ml-auto'  id="checkOutSummaryDiv"> */}
            <div
              className="px-2 bg-white order-md-2 order-2 h-100 p-0 ms-md-0 checkOutSummaryDiv"
              id="checkOutSummaryDiv"
            >
              <div className="p-1 border rounded mt-2">
                {props.cart?.order_id ? (
                  <>
                    <div className="card-body  d-flex flex-column p-2 order_placed">
                      <div className="col p-0 d-flex justify-content-between">
                        <h4 className="m-auto">Thank you</h4>
                      </div>
                      <p className="mt-4">
                        <small>Order Successfully Placed</small>
                      </p>
                      <div>Order Number # {props.cart?.order_id}</div>
                      <div className="col-12 mt-3 d-flex justify-content-end p-0 ">
                        <h6 className="m-0 purple h6 d-flex align-items-center">
                          <Link
                            to={
                              "/account/orderdetails/" + props.cart?.order_id
                            }
                            style={{ textDecoration: "none" }}
                            onClick={() => {
                              // props.callApi({
                              //   operation: "/order_details",
                              //   caller_ref: "OD.render1",
                              //   params: {
                              //     oid: props.cart?.order_id,
                              //   },
                              // });
                              handleCloseCart();
                            }}
                          >
                            View order details
                          </Link>
                        </h6>{" "}
                        <ChevronRight />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="card-body  d-flex flex-column p-2 order_summary">
                    <div className="col p-0 d-flex justify-content-between">
                      <h4 className="checkoutH4 m-auto">Order Summary</h4>
                    </div>
                    <div className="mt-md-4 d-flex flex-column">
                      <div className="col d-flex justify-content-between p-0 pb-1">
                        <small className="checkoutSmall">
                          items({props.cart?.summary?.qty}):
                        </small>
                        <small className="checkoutSmall">
                          ${props.cart?.summary?.amount}{" "}
                        </small>
                      </div>
                      <div className="col d-flex justify-content-between p-0 pb-1">
                        <small className="checkoutSmall">
                          {" "}
                          Shipping &nbsp; handling
                        </small>
                        <small className="checkoutSmall">-</small>
                      </div>

                      <div className="col d-flex justify-content-between p-0 pb-1">
                        <small className="checkoutSmall">
                          {" "}
                          Total before tax
                        </small>
                        <small className="checkoutSmall">-</small>
                      </div>
                      <div className="col d-flex justify-content-between p-0 pb-1">
                        <small className="checkoutSmall">
                          {" "}
                          Estimated tax to be collected
                        </small>
                        <small className="checkoutSmall">-</small>
                      </div>
                      <div className="col d-flex justify-content-between p-0 pb-1">
                        <small className="checkoutSmall"> Total</small>
                        <small className="checkoutSmall">
                          ${props.cart?.summary?.amount}
                        </small>
                      </div>
                      <div className="col d-flex justify-content-between p-0 pb-1">
                        <small className="checkoutSmall">Gift Card:</small>
                        <small className="checkoutSmall">-</small>
                      </div>

                      <div className="col d-flex justify-content-between p-0 border-top mt-3 pt-1">
                        <h5 className="checkoutH4">Order total:</h5>
                        <h5 className="checkoutH4">
                          ${props.cart?.summary?.amount}
                        </h5>
                      </div>
                      <div className="mt-md-5 mt-1 d-flex justify-content-center flex-column">
                        {/* <p>By placing your order, you agree to Rapo`s <span className='text-primary'>privacy notice</span> and <span className='text-primary'>condition of use</span></p> */}
                        {/* <Link
                        style={{ textDecoration: "none" }}
                        to={`/account/orders`}
                        className="m-0 p-0"
                        onClick={(e)=>placeOrder(e)} 
                      > */}
                        <div className="w-100 p-1 m-0 placeOrderMsgs"></div>
                          <button
                            className="d-flex position-relative justify-content-center align-items-center p-2 rounded col check checkoutBtn placeOrderBtn"
                            onClick={(e) => placeOrder(e)}
                          >
                            Place your Order
                          </button>
                        {/* </Link> */}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* ------------------------------------------------ */}
          </div>
        </div>
        {/* -------------- */}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    // _CART: state.item.CART,
    // _GLOBAL: state.item.GLOBAL,
    // _auth: state.auth,
    // _LA: state.item.LA,
    // _LC: state.item.LC,
    // _PAPopup: state.item.PAPopup,
    // _CS: state.item.CS,
    _auth: state.auth,
    _ENTITY_FIELD: state.entity.ENTITY_FIELD,
    _CHILD_DATA: state.entity.CHILD_DATA,
  };
};

export default connect(mapStateToProps, {
  callApi,
})(Cart);
