import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-elastic-carousel";
import { callApi } from "../../../actions/components_action";
import { connect } from "react-redux";
import "./CP0.css";
import {
  overflow_hidden,
  handleLoginO,
  removeSpecial,
} from "../../event_functions";
import { LazyLoadImage } from "react-lazy-load-image-component";

const CAROUSEL = (props) => {
  let _disableArrows = true;
  if (props.item?.Products?.length >= 10) {
    _disableArrows = false;
  }
  let _cart_items = props.cart_items ? { ...props.cart_items } : {}
  const { isAuthenticated, user } = props._auth;
  const [coudata, setCouData] = useState(props.item);
  const [disableArrows, setDisableArrows] = useState(_disableArrows);

  const [windowWidth, setWidth] = useState(window.innerWidth);
  window.addEventListener("resize", function () {
    setWidth(window.innerWidth);
  });

  useEffect(() => {
    // window.scrollTo(0, `${props._SCROLL}`)
    var btnAdd = document.querySelectorAll(".count1");
    const handleClick = (e) => {
      e.preventDefault();
      console.log(
        //btn.parentElement.parentElement.nextElementSibling,
        "hhhhhh"
      );
      btnAdd.forEach((btn) => {
        btn.parentElement.parentElement.nextElementSibling.classList.remove(
          "toggle-class"
        );
      });
      e.currentTarget.parentElement.parentElement.nextElementSibling.classList.add(
        "toggle-class"
      );
    };
    btnAdd.forEach((btn) => {
      btn.addEventListener("click", handleClick);
    });

    document.addEventListener(
      "click",
      (evt) => {
        let targetEl = evt.target; // clicked element
        if (
          targetEl.classList.contains("addPlus") ||
          targetEl.classList.contains("card-add-qunt") ||
          targetEl.classList.contains("focus")
        ) {
          return null;
        } else {
          var btnAdd = document.querySelectorAll(".card-add-qunt");
          btnAdd.forEach((btn) => {
            btn.classList.remove("toggle-class");
          });
        }
      },
      { passive: true }
    );

    let window_width = window.innerWidth;
    let carousel = document.querySelectorAll("#carousel");
    if (window_width > 1440) {
      carousel.forEach((car) => {
        car.classList.add("container");
      });
    } else {
      carousel.forEach((car) => {
        car.classList.remove("container");
      });
    }
  });

  //
  const getQtyFromCart = (pid, sid) => {
    // console.log('getQtyFromCart.............')
    let mitem = null;
    // let store = props._CART?.scarts.find((item) => {
    //   return sid === item.sid;
    // });
    if (Object.keys(_cart_items).indexOf(pid) > -1) {
      mitem = _cart_items[pid]
    }
    if (mitem && mitem.item_qty) {
      return mitem.item_qty;
    } else {
      return 0;
    }
  }

  const getQtyFromCart2 = (pid, sid) => {
    // console.log('getQtyFromCart.............')
    let mitem = null;
    // let store = props._CART?.scarts.find((item) => {
    //   return sid === item.sid;
    // });
    if (Object.keys(_cart_items).indexOf(pid) > -1) {
      mitem = _cart_items[pid]
    }
    if (mitem && mitem.item_qty) {
      return <span className="count1">{mitem.item_qty}</span>;
    } else {
      return <i className="fa fa-plus count0"></i>;
    }
  }

  const listner_key = coudata?._id + ".items";
  useEffect(() => {
    //console.log("@@@@@ In CAROUSELS.jsx useEffect ", props?._COMP_DATA)
    let query_vals = props.query_vals;
    if (props._COMP_DATA[listner_key]) {
      //console.log("@@@@@ In CAROUSELS.jsx useEffect ", props?._COMP_DATA[listner_key])
      let s_coudata = props._COMP_DATA[listner_key][query_vals.p_ename?.name];
      if (s_coudata && s_coudata.length > 0) {
        let _coudata = s_coudata[0];
        if (coudata?.Products?.length > 0) {
          _coudata.Products = coudata.Products.concat(s_coudata[0].Products);
        }
        document
          .getElementById("coudata_loader_" + coudata._id)
          .classList.add("d-none");
        setDisableArrows(false);
        setCouData(_coudata);
      }
    }
  }, [props._COMP_DATA[listner_key]]); // eslint-disable-line, react-hooks/exhaustive-deps

  const SaveItemToCart = (_item, _type) => {
    //console.log("_item", _item)
    let item_lp = _item.lp ? _item.lp : Math.floor(Math.random() * 6) + 1
    if (Object.keys(_cart_items).indexOf(_item._id) > -1) {
      let c_item = { ..._cart_items[_item._id] }
      if (_type === "+1") {
        c_item.item_qty = c_item.item_qty + 1
      } else {
        c_item.item_qty = c_item.item_qty - 1
      }
      if(c_item.item_qty <= 0){
        delete _cart_items[_item._id]
      } else {
        c_item.item_total = item_lp * c_item.item_qty
        _cart_items[_item._id] = c_item
      }
    } else {
      _cart_items[_item._id] = { 
        item_id: _item._id, item_name: _item.Title, item_thumb: _item.thumb, item_qty: 1, item_price: item_lp, item_total: item_lp 
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
        eid: props.cart_id ? props.cart_id : 0,
        value: _value
      },
    });
  }

  const handleNextStart = (currentItem, nextItem) => {
    //console.log(currentItem.index,"---", nextItem.index)
    if (currentItem.index === nextItem.index) {
      // we hit the last item, go to first item //rec-arrow-right
      document
        .getElementById("coudata_loader_" + coudata._id)
        .classList.remove("d-none");
      //document.querySelector(".rec-arrow-right")
      setDisableArrows(true);
      console.log("call api...");
      let last_pid = coudata?.Products[coudata?.Products.length - 1]._id;
      loadCarouselItems(last_pid, 1);
    }
  };

  const loadCarouselItems = (child_id, pg_no) => {
    let query_vals = props.query_vals;
    //console.log("props._COMP_DATA[listner_key]", props._COMP_DATA[listner_key])
    if (props._COMP_DATA[listner_key]) {
      pg_no = props._COMP_DATA[listner_key].query.params.child.page_no;
    }
    query_vals.c_page_no = pg_no + 1;
    query_vals.c_last_id = child_id;
    callQuery(query_vals, coudata._id);
  };

  const callQuery = (query_vals, pcatid) => {
    let filter_by = {};
    filter_by["_id"] = pcatid;

    let cpage_no = query_vals?.c_page_no ? query_vals.c_page_no : 1;
    let clast_id = query_vals?.c_last_id ? query_vals.c_last_id : "";
    let query = {
      operation: query_vals.operation,
      params: {
        type: query_vals.type,
        parent: {
          ename: query_vals.p_ename?.name,
          filter_by: filter_by,
          sort_by: query_vals.p_sort_by?.value,
          page_no: 1,
          page_size: 5,
        },
        child: {
          ename: query_vals.c_ename?.name,
          order_by: "seq_no",
          sort_by: query_vals.c_sort_by?.value,
          last_id: clast_id,
          page_no: cpage_no,
          page_size: 10,
        },
      },
    };
    query.caller_id = listner_key;
    query.caller_ref = "CAROUSEL.get_data";
    props.callApi(query);
    //setDataQuery({query:query})
  };

  let catpath = !props.pitem
    ? removeSpecial(coudata?.name)
    : removeSpecial(props.pitem.name + "/" + coudata?.name);

  let carouselSettings = {
    // breakPoints: breakPoints,
    pagination: false,
    showArrows: true,
    infinite: false,
    transitionMs: 500,
    // itemsToShow: 4,
    itemsToScroll: windowWidth >= 768 ? 2 : 1,
    // enableSwipe: true
  };

  //console.log("CAROUSEL????", coudata)

  return coudata ? (
    <>
      <div
        className="container-fluid mt-md-2 mt-0 p-1"
        id={"carousel_" + coudata._id}
      >
        {/* { console.log("CAROUSEL????")} */}
        <div className="row w-75">
          <h5
            style={{ color: "#757575" }}
            className="ps-lg-4 ps-2 category_name"
          >
            <Link
              style={{ color: "var(--color_purple)" }}
              to={`/category/${catpath}/${coudata._id}`}
            >
              {coudata?.name}
            </Link>
          </h5>
        </div>
        {coudata?.Products?.length > 0 ? (
          <div className="col-12 p-md-0 position-relative overflow-hidden px-0">
            <div
              className="position-absolute d-none"
              id={"coudata_loader_" + coudata._id}
              style={{ top: "calc(50% - 55px)", right: "0%", zIndex:"2" }}
            >
              loading...
            </div>
            {typeof coudata.Products == "object" ? (
              <Carousel
                // onNextEnd={(citem, index) =>
                //   handleLoadItems(citem, index)
                // }
                onNextStart={(currentItem, nextItem) =>
                  handleNextStart(currentItem, nextItem)
                }
                itemsToShow={
                  windowWidth >= 1300
                    ? 6.5
                    : windowWidth < 1300 && windowWidth >= 1000
                      ? 5.5
                      : windowWidth < 999 && windowWidth >= 768
                        ? 4
                        : windowWidth < 767 && windowWidth >= 500
                          ? 3.5
                          : 2.5
                }
                {...carouselSettings}
                disableArrowsOnEnd={disableArrows}
                showEmptySlots
                className="react-carosuel"
              >
                {coudata?.Products.map((sitem, index) => (
                  <div
                    key={index}
                    className="card p-2 text-center gy-2 position-relative"
                    id="instant_card"
                  >
                    <div className="card-top-div ms-auto" id="addPlus">
                      <i
                        className="addPlus d-flex align-items-center h-100"
                        onClick={(f) => {
                          if (isAuthenticated) {
                            f.stopPropagation();
                            if (!Number(f.target.innerText)) {
                              SaveItemToCart(sitem, "+1");
                            }
                          } else {
                            handleLoginO();
                          }
                        }}
                      >
                        {getQtyFromCart2(sitem._id, props.sid, 1)}
                      </i>
                    </div>
                    <div
                      id="card-add-qunt"
                      className="d-flex justify-content-between align-items-center px-3 card-add-qunt m-auto "
                    >
                      {getQtyFromCart(sitem._id, props.sid) <= 1 ? (
                        <span className="focus">
                          <i
                            className="fa fa-trash item_delete_icon"
                            onClick={(i) => {
                              if (isAuthenticated) {
                                i.stopPropagation();
                                SaveItemToCart(sitem, "-1")
                              }
                            }}
                          ></i>
                        </span>
                      ) : (
                        <span
                          style={{ fontSize: "30px", marginTop: "-0.9em" }}
                          className="focus faMinus"
                          onClick={(i) => {
                            if (isAuthenticated) {
                              i.stopPropagation();
                              SaveItemToCart(sitem, "-1")
                            } else {
                              handleLoginO();
                            }
                          }}
                        >
                          _
                        </span>
                      )}

                      <span className="focus" style={{ fontSize: "20px" }}>
                        {getQtyFromCart(sitem._id, props.sid)}
                      </span>
                      <span
                        className="focus"
                        style={{ fontSize: "30px", cursor: "pointer" }}
                        onClick={(i) => {
                          if (isAuthenticated) {
                            i.stopPropagation();
                            SaveItemToCart(sitem, "+1");
                          } else {
                            handleLoginO();
                          }
                        }}
                      >
                        +
                      </span>
                    </div>
                    <Link
                      to={`/item/${sitem._id}?popup=true`}
                      style={{ textDecoration: "none" }}
                      onClick={(i) => overflow_hidden()}
                      className="card-img-parent"
                    >
                      <LazyLoadImage
                        src={sitem.thumb}
                        loading="lazy"
                        className="card-img img-fluid m-auto"
                        alt=""
                      />
                    </Link>
                    <div className="text-left mt-2">
                      <Link
                        to={`/item/${sitem._id}`}
                        // to={`/store/${props.buname}/item/${sitem._id}`}
                        className="item_name_cart"
                      >
                        <p className="item_name">{sitem.Title}</p>
                      </Link>
                      <h6 className="main_price card-title py-1 px-md-2 px-1 d-flex justify-content-between rounded">
                        ${sitem.lp ? sitem.lp : ""}
                        {/* <small className="off_price font-weight-lighter">
                        10% off
                      </small> */}
                      </h6>

                      <p className="mt-n3" style={{ color: "#999999" }}>
                        <small>{sitem.size}</small>
                      </p>
                    </div>
                  </div>
                ))}
              </Carousel>
            ) : null}
            {/* <div className='opacity-div col-2 position-absolute d-lg-block d-none'></div> */}
          </div>
        ) : null}
      </div>
    </>
  ) : null;
};
const mapStateToProps = (state) => {
  return {
    _auth: {},
    _COMP_DATA: state.entity.COMP_DATA,
  };
};

export default connect(mapStateToProps, {
  callApi,
  // getScrollPosition
})(CAROUSEL);
