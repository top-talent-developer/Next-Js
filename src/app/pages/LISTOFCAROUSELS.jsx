import React, { useEffect, useState, useRef, useCallback } from "react";
import { connect } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import { callApi } from "../../actions/components_action";
import loadable from "@loadable/component";
import "./CAROUSEL/carousel.css";
const CAROUSEL = loadable(() => import("./CAROUSEL/CAROUSEL"));
const ListOfItems = loadable(() => import("./ListOfItems"));
// const TextNavPd = loadable(() => import("./PD/TextNavPd"));

let page_api_calling = false;
const LISTOFCAROUSELS = (props) => {
  const ref = useRef(null);
  const barColor = "#f11946";
  const [cartdata, setCartData] = useState();
  const [compdata1, setCompData1] = useState();
  const [compdata2, setCompData2] = useState();
  const [catlevel, setCatLevel] = useState(1);
  const [dataquery, setDataQuery] = useState({});

  let queryVals =
    props._ENTITY_FIELD[props.object.name + "_" + props.object.ref_id]; //props.object.value[props.object.name]
  let page_path = window.location.pathname;
  let page_slug = window.location.pathname;
  let catid = "";
  if (page_slug.split("/").length > 2) {
    catid = page_slug.split("/")[page_slug.split("/").length - 1];
    page_slug = "/" + page_slug.split("/")[1];
  }

  let listner1 =
    props.object.name + "." + props.object.ref_id + "._id." + catid;
  let listner2 =
    props.object.name + "." + props.object.ref_id + ".pid." + catid;
  
  let theme;
  if(props._ENTITY_FIELD['theme'] && props._ENTITY_FIELD['theme'][0].style){
    theme = JSON.parse(props._ENTITY_FIELD['theme'][0].style)
  }

  useEffect(() => {
    //console.log("Cart data changed ", props._CHILD_DATA["Cart"])
    if (props?._CHILD_DATA["Cart"] && props?._CHILD_DATA["Cart"].values && props?._CHILD_DATA["Cart"].values.length > 0) {
      setCartData(props?._CHILD_DATA["Cart"].values[0])
    }
  }, [props?._CHILD_DATA["Cart"]]); // eslint-disable-line, react-hooks/exhaustive-deps

  useEffect(() => {
    let query_vals = {...
      props._ENTITY_FIELD[props.object.name + "_" + props.object.ref_id]};
      console.log("loc changed page_path", catid, query_vals);
    // let catid = "";
    // page_slug = window.location.pathname;
    // if (page_slug.split("/").length > 2) {
    //   catid = page_slug.split("/")[page_slug.split("/").length - 1];
    // }
    listner2 =
      props.object.name + "." + props.object.ref_id + ".pid." + catid;
    if (query_vals && !props._COMP_DATA[listner2]) {
      setCompData2(null);
      callQuery(query_vals, "pid");
    }
    if (query_vals && !props._COMP_DATA[listner1]) {
      setCompData1(null);
      if (page_slug === "/category" && catid !== "") {
        callQuery(query_vals, "_id");
      }
    }
    if (page_slug === page_path) {
      setCatLevel(0);
    }
  }, [
    props._ENTITY_FIELD[props.object.name + "_" + props.object.ref_id],
    page_path,
  ]); // eslint-disable-line, react-hooks/exhaustive-deps

  useEffect(() => {
    //console.log("@@@@@ In LISTOFCAROUSELS.jsx useEffect ", props?._COMP_DATA)
    let query_vals =
      props._ENTITY_FIELD[props.object.name + "_" + props.object.ref_id];
    if (props._COMP_DATA[listner1]) {
      let s_coudata = props._COMP_DATA[listner1][query_vals.p_ename?.name];
      if (s_coudata && s_coudata.length > 0) {
        let _dataquery = { ...dataquery };
        _dataquery.scount = s_coudata[0].Products.length;
        _dataquery.squery = props._COMP_DATA[listner1].query;
        setDataQuery(_dataquery);
        let _compdata1 = s_coudata;
        if (compdata1?.length > 0 && compdata1[0].Products?.length > 0) {
          _compdata1[0].Products = compdata1[0].Products.concat(
            s_coudata[0].Products
          );
        }
        setCompData1(_compdata1);
        setTimeout(() => {
          page_api_calling = false;
        }, 1500);
        document.title = theme?.logo?.title+": "+_compdata1.name
        props.loader_ref?.current?.complete();
      }
    }
  }, [props._COMP_DATA[listner1], page_path]); // eslint-disable-line, react-hooks/exhaustive-deps

  useEffect(() => {
    //console.log("@@@@@ In LISTOFCAROUSELS.jsx useEffect ", props?._COMP_DATA)
    let query_vals =
      props._ENTITY_FIELD[props.object.name + "_" + props.object.ref_id];
    if (props._COMP_DATA[listner2]) {
      let c_coudata = props._COMP_DATA[listner2][query_vals.p_ename?.name];
      //console.log("@@@@@ In props._COMP_DATA[listner2] useEffect ", c_coudata)
      if (c_coudata) {
        let _dataquery = { ...dataquery };
        _dataquery.ccount = c_coudata.length;
        _dataquery.cquery = props._COMP_DATA[listner2].query;
        setDataQuery(_dataquery);
        let _compdata2 = c_coudata;
        if (compdata2) {
          _compdata2 = compdata2.concat(c_coudata);
        }
        setCompData2(_compdata2);
        setTimeout(() => {
          page_api_calling = false;
        }, 1500);
        props.loader_ref?.current?.complete();
      }
    }
  }, [props._COMP_DATA[listner2], page_path]); // eslint-disable-line, react-hooks/exhaustive-deps

  const callQuery = (query_vals, filter_type, pcatid) => {
    let pgsize = parseInt(query_vals.p_page_size?.value);
    let filter_by = {};
    let p_filter_by = query_vals.p_filter_by_and;
    let _catid = pcatid ? pcatid : catid;
    if (p_filter_by && p_filter_by.length > 0) {
      p_filter_by.forEach((fl) => {
        if (page_slug === "/category" || pcatid) {
          if (_catid !== "") {
            filter_by[filter_type] = _catid;
          }
        } else {
          filter_by[fl.name] = fl.value;
        }
      });
    }
    let ppage_no = query_vals?.p_page_no ? query_vals.p_page_no : 1;
    let plast_id = query_vals?.p_last_id ? query_vals.p_last_id : "";
    let cpage_no = query_vals?.c_page_no ? query_vals.c_page_no : 1;
    let clast_id = query_vals?.c_last_id ? query_vals.c_last_id : "";
    let query = {
      operation: query_vals.operation,
      params: {
        type: query_vals.type,
        parent: {
          ename: query_vals.p_ename?.name,
          filter_by: filter_by,
          order_by: "seq_no",
          sort_by: query_vals.p_sort_by?.value,
          req_fields: [],
          last_id: plast_id,
          page_no: ppage_no,
          page_size: pgsize,
        },
        child: {
          ename: query_vals.c_ename?.name,
          order_by: "seq_no",
          sort_by: query_vals.c_sort_by?.value,
          req_field: [],
          last_id: clast_id,
          page_no: cpage_no,
          page_size:
            filter_type === "_id"
              ? 20
              : parseInt(query_vals.c_page_size?.value),
        },
        format: {
          level: 0,
        },
      },
    };
    query.caller_id =
      props.object.name +
      "." +
      props.object.ref_id +
      "." +
      filter_type +
      "." +
      _catid;
    query.caller_ref = "LISTOFCAROUSELS.get_comp_data";
    props.callApi(query);
    console.log("callApi....")
    //setDataQuery({})
  };

  // implement infinite scrolling with intersection observer
  let bottomBoundaryRef = useRef(null);

  const scrollObserver = useCallback(
    (node) => {
      new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.intersectionRatio > 0) {
            console.log("scrollObserver scroll ", page_api_calling);

            let query_vals = {...
              props._ENTITY_FIELD[
                props.object.name + "_" + props.object.ref_id
              ]};
            let _query;
            if (props._COMP_DATA[listner2] && catlevel === 0 && !page_api_calling && compdata2?.length > 0) {
              _query = props._COMP_DATA[listner2].query;
              let next_pg_no = _query.params.parent.page_no + 1;
              //if (query_vals.p_page_no > _query.params.parent.page_no) {
                query_vals.p_page_no = next_pg_no;
                query_vals.p_last_id = compdata2[compdata2.length - 1]._id;
                callQuery(query_vals, "pid");
                page_api_calling = true;
                //console.log("load carousels page....", compdata2)
              //}
            } else if (
              props._COMP_DATA[listner1] &&
              compdata1?.length > 0 &&
              compdata1[0].Products?.length > 0  && !page_api_calling
            ) {
              _query = props._COMP_DATA[listner1].query;
              query_vals.c_page_no = _query.params.child.page_no + 1;
              query_vals.c_last_id =
                compdata1[0].Products[compdata1[0].Products.length - 1]._id;
              //console.log("compdata1[compdata1.length - 1]._id", compdata1);
              callQuery(query_vals, "_id");
              page_api_calling = true;
              console.log("load items page....")
            }
            
            // }
            // console.log("load page....")
          }
        });
      }).observe(node);
    },
    [compdata1, compdata2]
  ); // eslint-disable-line, react-hooks/exhaustive-deps

  useEffect(() => {
    if (bottomBoundaryRef.current) {
      scrollObserver(bottomBoundaryRef.current);
      console.log("scrollObserver");
    }
  }, [scrollObserver, bottomBoundaryRef]);

  //console.log("load compdata1 page....", compdata1)
  //console.log("load compdata2 page....", compdata2);

  return compdata1 || compdata2 ? (
    <>
      <div
        className={
          compdata2 && compdata2.length > 0
            ? "sub-category container-fluid p-1"
            : "container-fluid px-0"
        }
        style={{ minHeight: "65vh" }}
        id={
          compdata1 && compdata1.length > 0 && compdata1[0].level === 0
            ? "CP0"
            : "CPX"
        }
      >
        {compdata2 &&
        compdata2.length > 0 &&
        (compdata2[0].level < 2 || catlevel === 0) ? (
          <>
            {compdata1 && compdata1.length > 0 ? (
              <>
              <div>Text Nav bar</div>
              {/* <TextNavPd catdata={compdata1[0]} /> */}
              </>
            ) : null}
            {compdata2?.map((item, i) => (
              <CAROUSEL
                key={i}
                item={item}
                pitem={compdata1 && compdata1.length > 0 ? compdata1[0] : null}
                uris={[]}
                bid={props.bid}
                sid={props.sid}
                buname={props.buname}
                query_vals={queryVals}
                cart_items={cartdata ? cartdata.cart_items ? cartdata.cart_items : {} : null }
                cart_id={cartdata ? cartdata._id : null }
              />
            ))}
          </>
        ) : null}
        {compdata1 && compdata1.length > 0 && compdata1[0].level > 0 ? (
          <>
            {/* page_slug === '/category' && catid !== "" ? */}
            {compdata1?.map((item, i) => (
              <ListOfItems
                key={i}
                item={item}
                pname=""
                uris={[]}
                bid={props.bid}
                sid={props.sid}
                buname={props.buname}
                subcats_len={compdata2 ? compdata2.length : 0}
                subcats={compdata2}
                cart_items={cartdata ? cartdata.cart_items ? cartdata.cart_items : {} : null }
                cart_id={cartdata ? cartdata._id : null }
              />
            ))}
          </>
        ) : (
          compdata1?.map((item, i) => (
            <CAROUSEL
              key={i}
              item={item}
              pname=""
              uris={[]}
              bid={props.bid}
              sid={props.sid}
              buname={props.buname}
              query_vals={queryVals}
              cart_items={cartdata ? cartdata.cart_items ? cartdata.cart_items : {} : null }
              cart_id={cartdata ? cartdata._id : null }
            />
          ))
        )}
      </div>
      {/* {console.log("dataquery", dataquery)} */}
      {(compdata2?.length > 0 &&
        dataquery.cquery &&
        dataquery.ccount === dataquery.cquery?.params?.parent.page_size) ||
      (compdata2?.length === 0 &&
        compdata1?.length > 0 &&
        compdata1[0].level > 0 &&
        dataquery.squery &&
        dataquery.scount === dataquery.squery?.params?.child.page_size) ? (
        <>
          <div className="dots saving text-center" id="dotss">
            <span>.</span>
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
          <div
            id="page-bottom-boundary"
            style={{ border: "1px solid red" }}
            ref={bottomBoundaryRef}
          ></div>
        </>
      ) : null}
    </>
  ) : (
    <div
      className="w-100 d-flex"
      style={{
        alignItems: "center",
        minHeight: "50vh",
        justifyContent: "center",
      }}
    >
      <LoadingBar color={barColor} ref={ref} />{" "}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    _COMP_DATA: state.entity.COMP_DATA,
    _ENTITY_FIELD: state.entity.ENTITY_FIELD,
    _CHILD_DATA: state.entity.CHILD_DATA,
  };
};

export default connect(mapStateToProps, {
  callApi,
})(LISTOFCAROUSELS);
