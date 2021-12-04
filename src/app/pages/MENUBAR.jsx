import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { callApi } from "../../actions/components_action";
import { removeSpecial } from "../event_functions";
import { ChevronRight } from "@material-ui/icons";
import DoubleArrowRoundedIcon from "@material-ui/icons/DoubleArrowRounded";
//import loadable from "@loadable/component";

const MENUBAR = (props) => {
  let menudata =
    props._ENTITY_FIELD[props.object.name + "_" + props.object.ref_id];
  if (menudata && menudata["menu data"]) {
    menudata = menudata["menu data"];
  } else {
    menudata = [];
  }

  const [compdata, setCompData] = useState(menudata);
  const [queryfields, setQueryFields] = useState([]);

  let page_path = window.location.pathname;
  let page_slug = window.location.pathname;
  if (page_slug.split("/").length > 2) {
    //console.log(page_slug.split("/"))
    page_slug = "/" + page_slug.split("/")[1];
  }

  useEffect(() => {
    if (props.object.ref_id) {
      let menu_data =
        props._ENTITY_FIELD[props.object.name + "_" + props.object.ref_id]; //props.object.value[props.object.name]
      //console.log("menu_data", menu_data)
      //console.log("menu changed page_path", menu_data)
      let query_fields = [];
      if (menu_data) {
        setCompData(menu_data ? menu_data["menu data"] : []);
        menu_data["menu data"]?.forEach((mobj, index) => {
          if (
            mobj.type === "d" &&
            mobj.query &&
            Object.keys(mobj.query).length > 0
          ) {
            let mquery = mobj.query;
            mquery.caller_ref = "MANUBAR.getMenuData";
            mquery.caller_id = mobj.title;
            query_fields.push({
              fid: mquery.params.field_id,
              t: mobj.title,
              oid: mobj.oid,
              url: mobj.url,
            });
            //console.log("menu changed page_path", props._ENTITY_FIELD[mquery.params.field_id+"_"+mobj.title])
            if (
              !props._ENTITY_FIELD[mquery.params.field_id + "_" + mobj.title]
            ) {
              props.callApi(mquery);
            } else {
              createMenuWithDynamicData(
                props._ENTITY_FIELD[mquery.params.field_id + "_" + mobj.title],
                mobj.oid,
                mobj.url
              );
            }
          }
        });
      }
      setQueryFields(query_fields);
    }
  }, [
    props._ENTITY_FIELD[props.object.name + "_" + props.object.ref_id],
    page_path,
  ]); // eslint-disable-line, react-hooks/exhaustive-deps

  useEffect(() => {
    //let _flistener = props.fobj?.f_listner
    //console.log(queryfields.length, "props._ENTITY_FIELD ", props._ENTITY_FIELD)
    if (props._ENTITY_FIELD && queryfields.length > 0) {
      queryfields.forEach((mt) => {
        let mt_key = mt.fid + "_" + mt.t; //+"_"+mt.oid
        //console.log(mt_key, "menu fields data ", props._ENTITY_FIELD[mt_key])
        if (props._ENTITY_FIELD[mt_key]) {
          createMenuWithDynamicData(
            props._ENTITY_FIELD[mt_key],
            mt.oid,
            mt.url
          );
        }
      });
      //setSettings(props._ENTITY_FIELD["settings"][0])
    }
  }, [props._ENTITY_FIELD, page_path]); // eslint-disable-line, react-hooks/exhaustive-deps

  const createMenuWithDynamicData = (mdata, mid, murl) => {
    let _compdata = compdata ? [...compdata] : [...menudata];
    mdata.forEach((mo) => {
      let found_mob = _compdata.find((_co) => {
        return _co.oid === mo._id;
      });
      //console.log(found_mob)
      if (!found_mob) {
        let _pid = mo.pid;
        _pid = _pid === "root" ? mid : _pid;
        let _obj = {
          oid: mo._id,
          pid: _pid,
          title: mo.name,
          url: murl + "/url.str/" + mo._id,
        };
        _compdata.push(_obj);
      }
    });
    //console.log(murl, "dy menu", _compdata)
    setCompData(_compdata);
  };

  const ListToTree = (list) => {
    let map = {};
    let menuary = [];
    let i;

    for (i = 0; i < list.length; i += 1) {
      map[list[i].oid] = i; // initialize the map
      list[i].children = []; // initialize the children
    }

    for (i = 0; i < list.length; i += 1) {
      let node = list[i];
      if (node.pid !== 0) {
        list[map[node.pid]]?.children.push(node);
      } else {
        menuary.push(node);
      }
    }
    //console.log("menuListToTree", menuary )
    return menuary;
  };

  return (
    <div>
      {/* <SearchPage /> */}
      <nav
        className="animate-nav d-flex justify-content-left navbar  pt-md-0 pt-2"
        id="subnavbar"
        style={{ zIndex: "3", background: "#fbf4dc" }}
      >
        <ul className="left-ull d-flex list-unstyled col-lg-4 col-md-5 col-sm-7 px-sm-0 px-3 m-0 col-12 justify-content-between px-sm-3 px-2 menu_list">
          {compdata && compdata.length > 0
            ? ListToTree(compdata).map((mobj, index) => {
                return (
                  <MENUBUTTON mobj={mobj} path={""} key={index} rel="mmenu" />
                );
              })
            : null}

          <li className="d-flex flex-column text-center">
            <i className="fas fa-tags d-md-none d-block"></i> Savings
          </li>
          <li className="d-xl-flex flex-column text-center d-none">Get $50</li>
          {/* <li
              className="d-lg-none flex-column text-center d-flex searchPopupSubNav"
              onClick={openSearchForm}
            >
              <i className="fas fa-search d-md-none d-block"></i>Search
            </li> */}
        </ul>
        {/* -----------------right-ull-------------------- */}
      </nav>
      {/* <BC/> */}
    </div>
  );
};

const MENUBUTTON = (props) => {
  //console.log("MENUBUTTON", props.mobj)
  let mask_div = document.querySelector(".mask_div");
  //let timer;
  const handleMouseEnter = (e) => {
    //console.log("handleMouseEnter", props.path)
    //setTimeout(() => {
    if (!mask_div.classList.contains("mask-open")) {
      mask_div.classList.add("mask-open");
    }
    //});
  };

  const handleMouseOut = (e) => {
    //console.log("handleMouseOut", e)
    if (mask_div.classList.contains("mask-open")) {
      mask_div.classList.remove("mask-open");
    }
  };

  const handleHideMenu = () => {
    if (mask_div.classList.contains("mask-open")) {
      mask_div.classList.remove("mask-open");
    }
    //sub_menu_list
    console.log("handleHideMenu");
    let sub_menu = document.querySelectorAll(".sub_menu_list");
    sub_menu.forEach((mnu) => {
      mnu.classList.add("d-none");
    });
    setTimeout(() => {
      sub_menu.forEach((mnu) => {
        mnu.classList.remove("d-none");
      });
    }, 0);
  };

  let catpath =
    props.path === ""
      ? props.mobj.url
      : props.mobj.url.replace("url.str", removeSpecial(props.path));

  return (
    <li
      className={props.rel === "mmenu" ? "d-flex flex-column menu_btn main_menu_li": "d-flex flex-column menu_btn"}
      onMouseOver={(e) => {
        handleMouseEnter(e);
      }}
      onMouseLeave={(e) => {
        handleMouseOut(e);
      }}
      onClick={(e) => handleHideMenu(e)}
    >
      <Link className={props.rel === "mmenu" ? "d-flex flex-column": ""} to={catpath} style={{ textDecoration: "none" }}>
        {props.rel === "mmenu" ? (
          props.mobj.title === 'Categories' ? 
          <i className="fab fa-windows d-md-none d-block" aria-hidden="true"></i> :
          <i className="fas fa-store-alt d-md-none d-block"></i>
        ) : null}{" "}
        {props.mobj.title}
        {props.rel === "smenu" &&
        props.mobj.children &&
        props.mobj.children.length > 0 ? (
          <>
            <ChevronRight className="s_arw" />{" "}
            <DoubleArrowRoundedIcon className="d_arw" />{" "}
          </>
        ) : null}
      </Link>
      {props.mobj.children && props.mobj.children.length > 0 ? (
        <ul
          className="sub_menu_list"
          //onMouseEnter={(e) => { handleMouseEnter(e) }}
          //onMouseLeave={(e) => { handleMouseOut(e) }}
        >
          {props.mobj.children.map((smobj, index) => {
            return (
              <MENUBUTTON
                mobj={smobj}
                path={
                  props.path === ""
                    ? smobj.title
                    : props.path + "/" + smobj.title
                }
                key={index}
                rel="smenu"
              />
            );
          })}
        </ul>
      ) : null}
    </li>
  );
};

const mapStateToProps = (state) => {
  return {
    _COMP_DATA: state.entity.COMP_DATA,
    _ENTITY_FIELD: state.entity.ENTITY_FIELD,
  };
};

export default connect(mapStateToProps, {
  callApi,
})(MENUBAR);
