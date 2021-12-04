//import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
//import loadable from "@loadable/component";



const FOOTER = (props) => {
  let footer_props = {...
    props._ENTITY_FIELD[props.object.name + "_" + props.object.ref_id]};
  //console.log("footer_props", footer_props)
  // let theme;
  // if(props?._ENTITY_FIELD['theme'] && props?._ENTITY_FIELD['theme'][0].style){
  //   theme = JSON.parse(props?._ENTITY_FIELD['theme'][0].style)
  // }
  
  return (
    <div className="w-100 d-flex footer_div align-items-center justify-content-between" >
      <div>
      <Link
        to={"/"}
        style={{padding:"0px 5px"}}
      >
        Home
      </Link>
      <Link
        to={"#contact"}
        style={{padding:"0px 5px"}}
      >
        Contact
      </Link>
      <Link
        to={"#help"}
        style={{padding:"0px 5px"}}
      >
        Help
      </Link>
      </div>
      <div><span>built on <a href="#">rapo.cloud</a></span></div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    _ENTITY_FIELD: state.entity.ENTITY_FIELD,
  };
};

export default connect(mapStateToProps, {})(FOOTER);
