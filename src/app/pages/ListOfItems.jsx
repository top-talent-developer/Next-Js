import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import FilterSelect from "./Filters/FilterSelect";
import FilterPopup from "./Filters/FilterPopup";
import { connect } from "react-redux";
import { callApi } from "../../actions/components_action";
import { overflow_hidden, handleLoginO, removeSpecial } from "../event_functions";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./CAROUSEL/CP0.css";
import "./CP2.css";

function ListOfItems(props) {
  let _cart_items = props.cart_items ? { ...props.cart_items } : {}
  const { isAuthenticated, user } = props._auth;
  let theme;
  if(props._ENTITY_FIELD['theme'] && props._ENTITY_FIELD['theme'][0].style){
    theme = JSON.parse(props._ENTITY_FIELD['theme'][0].style)
  }

  useEffect(() => {
    // window.scrollTo(0, `${props._SCROLL}`)
    var btnAdd = document.querySelectorAll(".count1");

    const handleClick = (e) => {
      e.preventDefault();
      btnAdd.forEach((btn) => {
        console.log(
          btn.parentElement.parentElement.nextElementSibling,
          "hhhhhh"
        );
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
    document.title = theme?.logo?.title+": "+props.item.name
    //props.loader_ref?.current?.complete();
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

  const categorys = props.subcats?.map((cat, index) => {
    return (
      <Link
        to={
          `/category/${removeSpecial(props.item.name+"/"+cat.name)}/${cat._id}`
        }
        className="popular-sub px-2 d-flex align-items-center flex-wrap position-relative"
        key={index}
      >
        <span>
          <p style={{ color: "var(--color_purple)" }}>{cat.name} </p>
        </span>
        <span
          className="popular-sub-icon"
          style={{ marginBottom: "0.6rem", marginLeft: "0.5rem" }}
        >
          <i
            className="fas fa-angle-right "
            style={{ color: "var(--color_purple)" }}
          ></i>
        </span>
      </Link>
    );
  });

  const linkpath = props.item?.parents?.map((path, i) => {
    let cat_path = Object.values(path)[0];
    let cat_nm = cat_path.split("/").length > 1 ? cat_path.split("/")[cat_path.split("/").length - 1] : cat_path

    return cat_path !== "" ? (
      <span style={{ textDecoration: "none" }} key={i}>
        &nbsp;
        <Link
          style={{ color: "var(--color_purple)" }}
          to={
            `/category/${removeSpecial(cat_path)}/${Object.keys(path)[0]}`
          }
        >
          {cat_nm}
        </Link>
        &nbsp;/
      </span>
    ) : null ;
  });

  let catpath = props.pname === "" ? removeSpecial(props.item?.name) : removeSpecial(props.pname+"/"+props.item?.name)

  return (
    <div className={
      props.subcats_len > 0 ? "px-0 pt-md-3" : "sub-category container-fluid px-md-3 px-0 pt-md-3"
    }>
      <div>
        {props.subcats_len > 0 ? 
          <>
          {props.subcats[0].level > 1 ? 
            <>
              <div className="upper-link mt-md-0 mt-5">
                <Link
                  to="/shop"
                  style={{
                    textDecoration: "none",
                    color: "var(--color_purple)",
                  }}
                >
                  <i className="fas fa-store-alt"></i>
                </Link> {" "}
                &nbsp;/
                {linkpath} &nbsp;
                <span style={{ textDecoration: "none", fontWeight: "500" }}>
                  {props.item.name}
                </span>
              </div>
              <h5 className="text-center mt-2" style={{ lineHeight: "1.5em" }}>
                <small style={{ color: "grey" }}>Popular Categories</small> from{" "}
                <br className="d-sm-none d-block" /> {props.item.name}
              </h5>
              <div className="popular-cate d-flex text-center flex-wrap justify-content-center ">
                {categorys}
              </div>
            </>
          : 
            <h5 style={{ color: "#757575" }} className="category_name">
              <div className="w-100 mt-lg-1">
                <h5 id={`category${props.item.name.replace(/\s/g, "")}`}>
                  <Link
                    style={{ color: "var(--color_purple)" }}
                    to={
                      `/category/${catpath}/${props.item._id}`
                    }
                  >
                    {props.item.name}
                  </Link>
                </h5>
              </div>
            </h5>
          }
        </>
        :
        <>
          <FilterSelect />
          <div className="upper-link mt-md-0 mt-5">
            <Link
              to="/shop"
              style={{
                textDecoration: "none",
                color: "var(--color_purple)",
              }}
            >
              <i className="fas fa-store-alt"></i>
            </Link>{" "}
            &nbsp;/
            {linkpath} &nbsp;
            <span style={{ textDecoration: "none", fontWeight: "bolder" }}>
              {props.item.name}
            </span>
          </div>
          
          {/* mobile screen filters */}
          <FilterPopup />
        </>
        }
        <div className="d-flex flex-wrap list-cards">
          {props.item.Products.map((sitem, index) => (
            <div className="col-6 col-sm-4 col-md-4 col-xl-2  col-lg-3 p-1" key={index}>
            <div
              className="card_ border border-lighter p-2 text-center mt-md-3 bg-white "
              id="instant_card"
            >
              <div className="card-top-div ms-auto" id="addPlus">
                <i
                  className="addPlus"
                  onClick={(f, j) => {
                    if (isAuthenticated) {
                      f.stopPropagation();
                      //console.log(f, j);
                      if (!Number(f.target.innerText)) {
                        SaveItemToCart(sitem, "+1");
                        //props.addItem2Cart(props.sid, subcat);
                        // props.callApi({
                        //   operation: "/save_item_to_cart",
                        //   caller_ref: "CPcard.render3",
                        //   params: {
                        //     bid: props.bid,
                        //     sid: props.sid,
                        //     pid: `${sitem._id}`,
                        //     qty: getQtyFromCart(sitem._id, props.sid) + 1,
                        //   },
                        // });
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
                className="d-flex justify-content-between align-items-center px-3 card-add-qunt focus"
              >
                {getQtyFromCart(sitem._id, props.sid) <= 1 ? (
                  <span className="focus">
                    <i
                      style={{ fontSize: "20px" }}
                      className="fa fa-trash"
                      onClick={(i) => {
                        if (isAuthenticated) {
                          i.stopPropagation();
                          SaveItemToCart(sitem, "-1")
                          //props.deleteItem4Cart(props.sid, subcat);
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
                        //props.removeItem4Cart(props.sid, subcat);
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
                      SaveItemToCart(sitem, "+1")
                      //props.addItem2Cart(props.sid, subcat);
                    } else {
                      handleLoginO();
                    }
                  }}
                >
                  +
                </span>
              </div>
              <Link to={`/item/${sitem._id}?popup=true`} style={{ textDecoration: "none" }}>
                <LazyLoadImage
                  src={sitem.thumb}
                  onClick={(i) => overflow_hidden()}
                  className="card-img img-fluid "
                  loading="lazy"
                  alt=""
                />
              </Link>
                <div className="text-left mt-2">
                  <Link
                    to={
                      `/item/${sitem._id}`
                    }
                    className="item_name_cart"
                  >
                    <p className="item_name">{sitem.Title}</p>
                  </Link>
                  <h6 className="main_price card-title py-1 px-md-2 px-1 d-flex justify-content-between rounded">
                    ${sitem.lp}
                    <small className="off_price font-weight-lighter">10% off</small>
                  </h6>
                  <p className="mt-n3" style={{ color: "#999999" }}>
                    <small>{sitem.size}</small>
                  </p>
                </div>
              
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  //console.log("CP0 state change")
  return {
    _auth: state.auth,
    _ENTITY_FIELD: state.entity.ENTITY_FIELD,
    // _CP0: state.item.CP0,
    // _CART: state.item.CART,
    // _CS: state.item.CS,
  };
};
export default connect(mapStateToProps, {
  callApi,
})(ListOfItems);
