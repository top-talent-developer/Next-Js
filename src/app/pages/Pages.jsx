import { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { callApi } from "../../actions/components_action";
import LoadingBar from "react-top-loading-bar";
import  { Redirect } from 'react-router-dom'
import loadable from "@loadable/component";
import "./pages.css";
const LAYOUTPREVIEW = loadable(() => import("../components/fields/LAYOUTPREVIEW"));

const Pages = (props) => {
  const barColor = "#f11946";
  const loader_ref = useRef(null);
  const [pagedata, setPageData] = useState();
  const [pagePath, setPagePath] = useState(window.location.pathname);

  let page_slug = window.location.pathname;
  if (page_slug.split("/").length > 2) {
    //console.log(page_slug.split("/"))
    page_slug = "/" + page_slug.split("/")[1];
  }

  useEffect(() => {
    console.log("Pages page_path changed")
    loader_ref.current?.continuousStart();
    setPagePath(window.location.pathname);
  }, [window.location.pathname]); // eslint-disable-line, react-hooks/exhaustive-deps

  useEffect(() => {
    let db_slug = getDashboardSlug(props._ENTITY_FIELD["pages_list"]);
    let page_slug = pagePath;
    if (page_slug.split("/").length > 2) {
      page_slug = "/"+page_slug.split("/")[1];
    }
    if(page_slug === db_slug){
      page_slug = "/"
    } else {
      console.log("Pages page_slug changed", page_slug)
      if (!props._CHILD_DATA["Page." + page_slug]) {
        setPageData(null);
        callPageQuery(page_slug)
      }
    }
  }, [pagePath, props._CHILD_DATA]); // eslint-disable-line, react-hooks/exhaustive-deps

  useEffect(() => {
    //console.log("@@@@@ In Pages.jsx useEffect [props._CHILD_DATA]", props?._CHILD_DATA)
    if (
      props._CHILD_DATA["Page." + page_slug] &&
      props._CHILD_DATA["Page." + page_slug].values
    ) {
      //console.log("props._CHILD_DATA", props._CHILD_DATA["Page."+page_slug])
      let pgdata =
        props._CHILD_DATA["Page." + page_slug].values.length > 0
          ? props._CHILD_DATA["Page." + page_slug].values[0]
          : [];
      setPageData(pgdata);
      props.loader_ref?.current?.complete();
      //loader_ref?.current?.complete();
    }
  }, [props._CHILD_DATA["Page." + page_slug]]); // eslint-disable-line, react-hooks/exhaustive-deps

  const callPageQuery = (pslug) => {
    let query = {
      operation: "/get_entity",
      params: {
        child: 1, ename: "Page", filter_by: { Slug: pslug }, req_def_fileds: ["_id","name"]
      },
    };
    query.caller_ref = "Page.get_entity";
    query.caller_id = "Page." + pslug;
    props.callApi(query);
  }

  const getDashboardSlug = (pages_list) => {
    let d_slug;
    if(pages_list){
      const d_page = pages_list.find((pg) => {
        return pg.is_dashboard === 'TRUE' && pg.redirect_on_login === 'TRUE'
      })
      //console.log("db_page", d_page)
      if(d_page && d_page.Slug?.length > 0){
        d_slug = d_page.Slug[0]
      }
    }
    return d_slug
  }

  if(!props?._auth?.isAuthenticated && page_slug === getDashboardSlug(props._ENTITY_FIELD["pages_list"])){
    return (
      <Redirect to="/" />
    )
  } else {
    return pagedata ? (
      <>
        {/* <LoadingBar color={barColor} ref={loader_ref} /> */}
        <div
          className="w-100 d-flex flex-column"
          style={{ minHeight: "100vh", backgroundColor: "#e0e0e0" }}
        >
        {/* {console.log("pagedata ", pagedata)}  */}
          <div
            className="w-100 d-flex flex-column position-relative content_container page_main"
            style={{
              height: "auto",
            }}
          >
            { pagedata.Title ? 
            (
              pagedata.page_widgets && pagedata.page_widgets.length > 0 ? 
                <LAYOUTPREVIEW from="livepage" values={pagedata} loader_ref={loader_ref} pagepath={pagePath} />
              :
              null
            ) : (
              <h3
                className="w-100 h-100"
                style={{ textAlign: "center", lineHeight: "50vh" }}
              >
                Page not found!
              </h3>
            )}
            <div className="mask_div"></div>
          </div>
        </div>
      </>
    ) : (
        <LoadingBar color={barColor} ref={loader_ref} />
    );
  }
};

const mapStateToProps = (state) => {
  //console.log("DATA state change --- ", state.entity.DATA)
  return {
    //_auth: state.auth,
    _ENTITY_FIELD: state.entity.ENTITY_FIELD,
    _CHILD_DATA: state.entity.CHILD_DATA,
  };
};
export default connect(mapStateToProps, {
  callApi,
})(Pages);
