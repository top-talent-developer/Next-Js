import React, {useRef} from "react";
import LoadingBar from "react-top-loading-bar";
//import loadable from "@loadable/component";
//const Header = loadable(() => import("../Header/Header"));
//const BZCards = loadable(() => import("./BZCards"));

const Init = (props) => {
  const ref = useRef(null);
  const barColor = "#f11946";

  return (
    <>
      <LoadingBar color={barColor} ref={ref} />
    </>
  );
};

export default Init
