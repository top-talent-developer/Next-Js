import Axios from "axios";

export function callApi(query, global) {
  return (dispatch, getState) => {
    try {

      let timeout = localStorage.getItem("timeout");
      if(timeout){
        localStorage.setItem("extended_expiration_time", Date.now() + parseInt(timeout) * 60 * 1000);
      }
      let url = "/api"; //production server
      // const headers = {
      //   Authorization: localStorage.getItem("jwtToken"),
      // }
      let load_from_cache = false;
      if (query.operation === "/get_entity_list_for_field" && query.params.ename !== "Theme" && !query.isRefresh) {
        let _DATA = getState().entity.DATA;
        //console.log("@@@@@@@@ 1", query)
        if (_DATA.ENTITY_FIELD && _DATA.ENTITY_FIELD[query.params.field_id]) {
          let _ENTITY_VALUE = _DATA.ENTITY_FIELD[query.params.field_id]
          //console.log("@@@@@@@@ 2",_ENTITY_VALUE)
          if (_ENTITY_VALUE) { //.length > 0
            //console.log(query.params.field_id)
            let data = {}
            data.values = {}
            data.values[query.params.field_id] = _ENTITY_VALUE;
            data.query = query;
            data.display_template = 'gef';
            data.referrer = 'components_actions.callApi';
            load_from_cache = true;
            dispatch({
              type: data.display_template,
              payload: data
            });
          } else {
            load_from_cache = false;
          }
        } else {
          load_from_cache = false;
        }
      }
      if (query.operation === "/get_entity_list_for_field" && query.params.ename === "") {
        url = "/admin/api";
      }
      if (!load_from_cache) {
        Axios.post(url, query, { timeout: 50000 }).then((res) => {
          if (query === undefined) {
            return null;
          } else {
            if (res.data.data) {
              //res.data.data.source = "server";
              res.data.data.query = query;
              if (query.params.eid && query.params.eid !== 0) {
                res.data.data.eid = query.params.eid
              } else {
                if (res.data.data?.value?._id) {
                  res.data.data.eid = res.data.data?.value?._id
                }
              }
              if (query.params.pid && query.params.etype === 'TREE') {
                res.data.data.pid = query.params.pid
                if (!res.data.data.value) {
                  res.data.data.value = { pid: query.params.pid, bid: query.params.bid, seq: 1 }
                }
              }
              if (query.params.ename === "Page" && query.caller_ref === "Page.get_entity") {
                if(res.data.data.values && res.data.data.values.length > 0){                  
                  res.data.data.values[0]?.Components?.forEach((pc) => {
                    if(pc.ref_value && Object.keys(pc.ref_value).length > 0){
                      let data_obj = {values:{}}
                      data_obj.values[pc.name+"_"+pc.ref_id] = pc.ref_value
                      //console.log("### pages res pg_component val", data_obj)
                      dispatch({
                        type: 'gef',
                        payload: data_obj,
                      });
                    }
                    delete pc.ref_value
                  })
                  res.data.data.values[0]?.page_widgets?.forEach((pc) => {
                    if(pc.ref_value && Object.keys(pc.ref_value).length > 0){
                      let data_obj = {values:{}}
                      data_obj.values[pc.widget_name+"_"+pc.widget_instance._id] = pc.ref_value
                      //console.log("###### pages res pg_component val", data_obj)
                      dispatch({
                        type: 'gef',
                        payload: data_obj,
                      });
                    }
                    delete pc.ref_value
                  })
                }
              }
              
              if (query.operation === "/get_entity_list_for_field" && query.params.ename === "") {
                let _obj = {}
                _obj[query.params.field_id] = res.data.data.values
                res.data.data.values = _obj
              }
              
              if (query.dispatch && query.operation === "/save_entity" && res.data.data.msg) {
                if(res.data.data.value){
                  let data_obj = {...res.data.data}
                  data_obj.values = [res.data.data.value]
                  delete data_obj.value
                  delete data_obj.msg
                  dispatch({
                    type: 'cen',
                    payload: data_obj,
                  });
                  //handleResponseData(query.params.ename, res.data)
                }
              }
              if (query.caller_ref === "widget.get_instance_data") {
                let data_obj = {values:{}}
                data_obj.values[query.caller_id] = res.data.data.value
                dispatch({
                  type: 'gef',
                  payload: data_obj,
                });
              } else {
                if (res.data.display_template) {
                  if (res.data.display_template !== "setDB" && window.location.pathname.indexOf('/update_resources/') > -1) {
                    window.location.href = window.location.origin + "/";
                  }
                  //console.log(res.data.data)
                  handleResponseMsg(res.data)
                  dispatch({
                    type: res.data.display_template,
                    payload: res.data.data,
                  });
                }
              }
            } else if (
              res.data && (res.data.msg?.toLowerCase() === "not authorized" || res.data.msg?.toLowerCase() === "session expired")
            ) {
              console.log("###### got error redirecting to home page", res.data.msg)
              if (window.location.pathname !== "/") {
                window.location.href = window.location.origin + "/";
              }
            } else {
              console.log("No where to go so here...");
            }
          }
        }).catch((error) => {
          console.log("Received this error", error)
        });
      }
    } catch (e) {
      console.log(e, "index.callApi Error");
    }
  };
}

export function resetCompData() {
  return (dispatch) => {
    //console.log("saveToRedux", data, display_template)
    dispatch({
      type: 'reset_comp_data',
      payload: null,
    });
  }
}

export function saveToRedux(data, display_template) {
  return (dispatch) => {
    //console.log("saveToRedux", data, display_template)
    dispatch({
      type: display_template,
      payload: data,
    });
  }
}

// function handleResponseData(ename, rdata) {
//   console.log("###### res", rdata.data.msg, rdata.data.value)
//   return (dispatch, getState) => {
//     let data_obj = {...rdata.data}
//     delete data_obj.msg
//     console.log("###### cart val updated to redux", data_obj)
//     dispatch({
//       type: 'cen',
//       payload: data_obj,
//     });
//   }
// }

const handleResponseMsg = (rdata) => {
  let _msgdiv = document.querySelector(".alertSuccess");
  if(rdata.display_template === 'cc' && _msgdiv){
    _msgdiv.innerHTML = rdata.data.msg
    setTimeout(() => {
      _msgdiv.classList.add("d-none");
    }, 1000);            
  }
  if(rdata.display_template === 'de' && _msgdiv){
    _msgdiv.innerHTML = rdata.data.err
    setTimeout(() => {
      _msgdiv.classList.add("d-none");
    }, 1200);            
  }
}