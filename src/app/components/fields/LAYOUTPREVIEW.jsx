import React, {useEffect, useState, useRef} from "react";
import { connect } from "react-redux";
import { callApi } from "../../../actions/components_action";
import WidgetsOutlinedIcon from '@material-ui/icons/WidgetsOutlined';
import LoadingBar from "react-top-loading-bar";
import loadable from "@loadable/component";
import "../../pages/pages.css";
//const DContainer = loadable(() => import("../../container/DContainer"));
const SCROLLABLEHEADER = loadable(() => import("../../pages/SCROLLABLEHEADER"));
const FOOTER = loadable(() => import("../../pages/FOOTER"));
const LISTOFCAROUSELS = loadable(() => import("../../pages/LISTOFCAROUSELS"));
const MENUBAR = loadable(() => import("../../pages/MENUBAR"));
const BZCards = loadable(() => import("../../Home/BZCards"));
const LISTOFCARDS = loadable(() => import("../../pages/LISTOFCARDS"));


const LAYOUTPREVIEW = React.memo((props) => {
  
  const barColor = "#f11946";
  const loader_ref = useRef(null);
  const [layoutObj, setLayoutObj] = useState();
  const [templates, setTemplates] = useState();

  useEffect(() => {
    //console.log("LAYOUTPREVIEW props", props.values)
    let pagewidgets = props.values?.page_widgets    
    if(pagewidgets && props.from === 'entity'){
      pagewidgets.forEach((pw) => {
        if(pw.widget_name !== 'Nav bar'){
          if(!props._ENTITY_FIELD[pw.widget_name+"_" + pw.widget_instance?._id]){
            let _query = {
              operation: "/get_entity_data",
              params: {
                child: 1,
                ename: pw.widget_name,
                etype:'TABLE',
                eid: pw.widget_instance?._id,
                req_def_fileds: ["_id","name"]
              },
            }
            _query.caller_ref = "widget.get_instance_data";
            _query.caller_id = pw.widget_name+"_" + pw.widget_instance._id;
            props.callApi(_query)
          }
        }
      });
    }
    //console.log("pagewidgets", pagewidgets)
    let isCardsExist = pagewidgets.find((pw) => { return pw.widget_name === 'Cards' })
    if (!props._ENTITY_FIELD["Template_list"] && isCardsExist) {
      loadTemplates()
    }
  }, []); // eslint-disable-line, react-hooks/exhaustive-deps

  useEffect(() => {
    //console.log("LAYOUTRENDER useEffect")
    loader_ref.current?.continuousStart();
    setLayoutObj(props.values['page_layout']);
  }, [props.values['page_layout']]); // eslint-disable-line, react-hooks/exhaustive-deps

  const loadTemplates = () => {
    props.callApi({
      operation: "/get_entity_list_for_field",
      params: {
        field_id: "Template_list",
        req_fields: ["name", "class"],
        ename: "Template"
      },
    });
  }

  useEffect(() => {
    //console.log("Template_list", props._ENTITY_FIELD)
    if (props._ENTITY_FIELD["Template_list"]) {
      setTemplates(props._ENTITY_FIELD["Template_list"])
    }
  }, [props._ENTITY_FIELD["Template_list"]]); // eslint-disable-line, react-hooks/exhaustive-deps

  const getStyle = (_lobj, p_len) => {
    let _style = {
      width: _lobj.w, 
      minHeight: props.pid === 0 ? "350px" : "inherit", 
      border: "0px solid "+_lobj.c,
      display: _lobj.co === "H" ? "flex" : "block",
      //height: p_len === 1 ? "100%" : 'inherit'
    }
    return _style
  }

  return layoutObj?.box ? (
    <>
    <LoadingBar color={barColor} ref={loader_ref} />
    {layoutObj.box.map((lobj, index) => (
      <div className="layout_container" key={index} 
        style={getStyle(lobj, layoutObj.box.length)}
        // id={"div_"+lobj.id}
      > 
        { lobj.box && lobj.box.length > 0 ? 
          <LAYOUTBOX 
            key={index}
            data={lobj.box}
            type='Box'
            pid={lobj.id}
            loader_ref={loader_ref}
            templates={templates}
            _auth={props._auth}
            values={props.values}
            from={props.from}
            pagePath={props.pagePath}
          /> : 
         
          lobj.widgets?.map((wobj, index) => (
            <div key={index} 
              className={ lobj.widgets.length === 1 ? "d-flex-c w-100 h-100" : "d-flex-c w-100" } 
              style={getStyle(wobj, lobj.widgets.length)}
            >
              <div style={{fontSize:"11px", textAlign:'center', fontWeight:"600"}}>
                <div>{wobj.widget_name}</div>
                <WidgetsOutlinedIcon />
                <div>{wobj.widget_instance?.name}</div>
              </div>
            </div>
          ))
         
        }
      </div>
    ))}
    </>
  ) : null
})

const LAYOUTBOX = (props) => {
  const [layoutbox, setLayoutBox] = useState();

  useEffect(() => {
    //console.log("LAYOUTRENDER useEffect")
    setLayoutBox(props.data);
  }, [props.data]); // eslint-disable-line, react-hooks/exhaustive-deps

  const getStyle = (_lobj, p_len) => {
    let _style = {
      width: _lobj.w, 
      minHeight: props.pid === 0 ? "350px" : "inherit", 
      border: "0px solid "+_lobj.c,
      display: _lobj.co === "H" ? "flex" : "block",
      //height: p_len === 1 ? "100%" : 'inherit'
    }
    return _style
  }

  return layoutbox ? (
    layoutbox.map((lobj, index) => (
      <div key={index} 
        style={getStyle(lobj, layoutbox.length)}
        // id={"div_"+lobj.id}
      > 
        { lobj.box && lobj.box.length > 0 ? 
          <LAYOUTBOX 
            key={index}
            data={lobj.box}
            type='Box'
            pid={lobj.id}
            templates = {props.templates}
            _auth={props._auth}
            loader_ref={props.loader_ref}
            values={props.values}
            from={props.from}
            pagePath={props.pagePath}
          /> : 
          lobj.widgets?.map((wobj, index) => (
              wobj.widget_name === "Scrollable Header" ? (
                <div className="w-100 page_header" key={index}>
                  <SCROLLABLEHEADER 
                    loader_ref={props.loader_ref} 
                    index={index} 
                    object={{name: wobj.widget_name, ref_id: wobj.widget_instance._id}} 
                  />
                </div>
              ) : (wobj.widget_name === "Cards" && wobj.widget_instance.name === "BZcards") ? (
                <div className="home w-100" key={index}>
                  <div className="container-fluid BZGridMapView p-0 animate-bz"
                    // style={{background:"#421C52"}}
                    >
                      <div
                        className="container-fluid position-relative p-0"
                        id="selectionStores"
                      >
                        <div className="gridView w-100 py-0 px-1 ">
                          <BZCards 
                            loader_ref={props.loader_ref} 
                            comp={{name: wobj.widget_name, ref_id: wobj.widget_instance._id}} 
                          />
                        </div>
                      </div>
                    </div>
                </div>
              ) : wobj.widget_name === "List of Cards" || wobj.widget_name === "Cards" ? (
                <div className="w-100 listofcards_div" key={index}>
                  <LISTOFCARDS
                    key={index}
                    index={index}
                    object={{name: wobj.widget_name, ref_id: wobj.widget_instance._id}}
                    templates = {props.templates}
                    loader_ref={props.loader_ref}
                    from={props.from}
                    pagePath={props.pagePath}
                  />
                </div>
              ) : wobj.widget_name === "Item Details" ? (
                <div className="w-100 content_box" key={index}>
                  Item details data coming here.
                </div>
              ) 
              // : wobj.widget_name === "Nav bar" && props._auth?.isAuthenticated && props.from === 'livepage' ? (
              //   <div className="w-100" key={index}>
              //     <DContainer loader_ref={props.loader_ref} pagedata={props.values} />
              //   </div>
              // )
              : wobj.widget_name === "Footer" ? (
                <div className="w-100" key={index}>
                  <FOOTER 
                    index={index} 
                    object={{name: wobj.widget_name, ref_id: wobj.widget_instance._id}} 
                  />
                </div>
              ) : wobj.widget_name === "Menu Bar" ? (
                <div className="w-100 page_menu" key={index}>
                  <MENUBAR
                    index={index}
                    object={{name: wobj.widget_name, ref_id: wobj.widget_instance._id}}
                    bid={""}
                    sid={""}
                    buname={""}
                  />
                </div>
              ) : wobj.widget_name === "List of Carousels" ? (
                <div className="w-100 content_box" key={index}>
                  <LISTOFCAROUSELS
                    index={index}
                    object={{name: wobj.widget_name, ref_id: wobj.widget_instance._id}}
                    bid={""}
                    sid={""}
                    buname={""}
                    pagepath={props.pagePath}
                    loader_ref={props.loader_ref}
                  />
                </div>
              ) : (
                <div 
                  key={index} 
                  className={ lobj.widgets.length === 1 ? "d-flex-c w-100 h-100" : "d-flex-c w-100" } 
                  style={getStyle(wobj, lobj.widgets.length)}
                >
                  <div style={{fontSize:"11px", textAlign:'center', fontWeight:"600"}}>
                    <div>{wobj.widget_name}</div>
                    <WidgetsOutlinedIcon />
                    <div>{wobj.widget_instance?.name}</div>
                  </div>
                </div>
              )
            
          ))
         
        }
      </div>
    ))
  ) : null
}

const mapStateToProps = (state) => {
  return {
    _auth: state.auth,
    _ENTITY_FIELD: state.entity.ENTITY_FIELD,
    _CHILD_DATA: state.entity.CHILD_DATA,
  };
};

export default connect(mapStateToProps, {
  callApi,
})(LAYOUTPREVIEW);

