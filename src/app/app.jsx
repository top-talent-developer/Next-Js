import { useRef, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { callApi } from "../actions/components_action";
import { connect } from "react-redux";
import loadable from "@loadable/component";

import "./app.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import LoadingBar from "react-top-loading-bar";
//import DynamicRouter from "./DynamicRouter";
//const Home = loadable(() => import("./Home/Home"));
const Pages = loadable(() => import("./pages/Pages"));

function App(props) {
  const barColor = "#f11946";
  const loader_ref = useRef(null);

  //console.log("_DATA", props._DATA)
  useEffect(() => {
    if (!props._ENTITY_FIELD["theme"]) {

      const loadTheme = () => {
        props.callApi({
          operation: "/get_entity_list_for_field",
          params: {
            field_id: "theme",
            //req_fields: ["style", "name"],
            ename: "Theme",
            filter_by: { status: "Enabled" },
          },
        });
      };

      loadTheme();
    }
  }, []); // eslint-disable-line, react-hooks/exhaustive-deps

  /**
   *
   * @returns true if token is valid
   * @returns false if token has expired and automatically logs out
   *
   */
  

  return (
    <div className="w-100">
      <LoadingBar color={barColor} ref={loader_ref} />
      <BrowserRouter>
        <Switch>
          <Route path={["/","/shop","/category"]}>
            <Pages loader_ref={loader_ref} ppath={window.location.path} />
          </Route>
          {/* <Route path={["/"]}>
            <DynamicRouter loader_ref={loader_ref} /> 
            <Home loader_ref={loader_ref} />
          </Route> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = (state) => ({
  _ENTITY_FIELD: state.entity.ENTITY_FIELD,
  _DATA: state.entity.DATA,
});

export default connect(mapStateToProps, {
  callApi
})(App);
