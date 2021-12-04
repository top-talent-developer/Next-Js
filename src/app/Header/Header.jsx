import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import KeyboardCapslockRoundedIcon from '@material-ui/icons/KeyboardCapslockRounded';
import { handleLoginO, checkPath } from "../event_functions";

import "./header.css";
import loadable from "@loadable/component";
const Hamburger = loadable(() => import("hamburger-react"));

const Header = React.memo((props) => {
  const [isOpen, setOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState('off');

  const handleMenuSize = (event) => {
    if(isMenuOpen === 'off'){
      setMenuOpen('on')
    } else {
      setMenuOpen('off')
    }
    
    document.querySelector(".sideMenuContainer")?.classList.toggle("on");
    document.querySelector(".content_container")?.classList.toggle("on");
  }

  const handleMenuClick = (event) => {
    //document.querySelector(".sideMenuContainer")?.classList.remove("on");
    document.querySelector(".sideMenuContainer")?.classList.toggle("swipe");
    document.querySelector(".menu-page-overlay")?.classList.toggle("d-none");
    //document.querySelector(".content_container")?.classList.remove("on");
  };

  let theme;
  if(props?._ENTITY_FIELD['theme'] && props?._ENTITY_FIELD['theme'][0].style){
    //console.log("_ENTITY_FIELD theme", typeof (props?._ENTITY_FIELD['theme'][0].style));
    theme = JSON.parse(props?._ENTITY_FIELD['theme'][0].style)
    //console.log(theme["TABLE"])
  }
  //const { isAuthenticated, user } = props._auth;
  const { isAuthenticated } = false;

  useEffect(() => {
    if(props?._ENTITY_FIELD['theme'] && props?._ENTITY_FIELD['theme'][0].style){
      //console.log("_ENTITY_FIELD theme", typeof (props?._ENTITY_FIELD['theme'][0].style));
      theme = JSON.parse(props?._ENTITY_FIELD['theme'][0].style)
      if(theme.logo?.title){
        document.title = theme.logo.title
      }
    }
  }, []);  //eslint-disable-line, react-hooks/exhaustive-deps

  useEffect(() => {
    //console.log("@@@@@ In Header.jsx useEffect [props._auth]")
    if (!isAuthenticated) {
      //handleLoginO()
      if (checkPath()) {
        //window.location.href = window.location.origin + "/";
      }
    }
    props.loader_ref?.current?.complete();
  }, [props._auth, isAuthenticated]);  //eslint-disable-line, react-hooks/exhaustive-deps

  return (
    <div 
      className="Address_Nav w-100 d-flex px-lg-5 px-md-3 px-2 py-2 justify-content-between align-items-center dheader"
      style={
        {
          backgroundColor: 
            theme?.header?.backgroundColor ? theme.header.backgroundColor : null,
          color: 
            theme?.header?.foregroundColor ? theme.header.foregroundColor : null 
        }
      }
    >
      <div className="d-flex h-100">
      {isAuthenticated && window.location.pathname !== "/" ?  
        <div>
          {/* <Button
            className="menu_btn text-dark bg-white"
            style={{ outline: "none", minWidth: "30px", padding: "6px 0px" }}
            aria-controls="fade-menu"
            aria-haspopup="true"
            onClick={handleMenuClick}
          >
            <i
              className="fas fa-bars fs-5 ms-1"
              style={{ color: "var(--color_purple)" }}
            ></i>
          </Button> */}
          <div className="menu_btn">
            <Hamburger
              aria-controls="fade-menu"
              aria-haspopup="true"
              rounded
              size={20}
              duration={0.6}
              direction={"right"}
              distance="lg"
              color={theme?.header && theme?.header?.foregroundColor? theme.header.foregroundColor : "#000"}
              toggled={isOpen}
              toggle={setOpen}
              onToggle={handleMenuClick}
              label="Show menu"
            />
          </div>
          <div className={"menu_toggle_btn "+ isMenuOpen} onClick={(e) => handleMenuSize() }>
            <KeyboardCapslockRoundedIcon 
              style={{ 
                transform: "rotate(-90deg)", 
                fontSize: "1.6rem", 
                color:theme?.header && theme?.header?.foregroundColor ? theme.header.foregroundColor : "#000",
              }} 
            />
          </div>
        </div> : null }
        <div className="d-flex align-items-center logo_div">
          <Link className="w-100 h-100 d-flex align-items-center" to="/">
            {/* <img
              className="img-fluid logo2"
              src={logo2}
              id="BZ_logo"
              alt="Logo"
            /> */}
            {theme?.logo?.url ? 
            <LazyLoadImage
              src={theme?.logo?.url && theme.logo.url !== '' ? theme.logo.url : null }
              loading="lazy"
              className="img-fluid logo2"
              alt="Logo"
              id="BZ_logo"
            /> : null }
          </Link>
        </div>
        <div className="header_title">{theme?.logo && theme?.logo?.siteName ? theme.logo.siteName : ""}</div>
      </div>
      {isAuthenticated ? (
        <>
        {/* <AccountCart theme={theme}/> */}
        </>
      ) : (
        <button className="login-btn" 
          style={
            {
              backgroundColor: 
                theme?.header?.foregroundColor ? theme.header.foregroundColor : null,
              color: 
                theme?.header?.backgroundColor ? theme.header.backgroundColor : null 
            }
          }
          onClick={(e) => { handleLoginO(); }}
        >
          Sign in
        </button>
      )}
      {/* <SignInScreen /> */}
    </div>
  );
});

const mapStateToProps = (state) => {
  return {
    _ENTITY_FIELD: state.entity.ENTITY_FIELD,
    _auth: state.auth,
  };
};

export default connect(mapStateToProps, {})(Header);
