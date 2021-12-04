export function checkPath() {
  let _e = window.location.href.match(new RegExp("/e/"));
  if(!_e){
    _e = window.location.href.match(new RegExp("/ed/([^]+)"));
  }
  if(!_e){
    _e = window.location.href.match(new RegExp("/dashboard"));
  }
  if(!_e){
    _e = window.location.href.match(new RegExp("/dashboard/([^]+)"));
  }
  return _e
}

// functions-handling
export function handleOpenn() {
  document.getElementsByClassName("browsers")[0].style.display = "block";
  document.getElementsByClassName("browsers")[0].style.opacity = "1";
}

export function handleOpen() {
  document.getElementsByClassName("zipcode-list")[0].style.visibility =
    "visible";
  document.getElementsByClassName("zipcode-list")[0].style.opacity = "1";
}
export function handleClose() {
  document.getElementsByClassName("zipcode-list")[0].style.visibility =
    "hidden";
  document.getElementsByClassName("zipcode-list")[0].style.opacity = "0";
}
export function handleOpenSearch() {
  document.getElementById("search-result").style.display = "block";
}
export function handleCloseSearch() {
  if (document.getElementById("search-result")) {
    document.getElementById("search-result").style.display = "none";
  }
}

export function handleCCloses() {
  if (document.getElementsByClassName("zipcode-lists")[0]) {
    document.getElementsByClassName("zipcode-lists")[0].style.visibility =
      "hidden";
    document.getElementsByClassName("zipcode-lists")[0].style.opacity = "0";
  }
}

export function SstoreClose() {
  if (document.getElementById("selectionStore")) {
    document.getElementById("selectionStore").style.display = "none";
  }
}
export function SstoreOpen() {
//  console.log('#########inside SstoreOpen()')
  document.body.style.overflow="hidden"
  if (document.getElementById("selectionStore")) {
  //  console.log('inside SstoreOpen....#######')
    document.getElementById("selectionStore").style.display = "block";
  }
}

export function handleAccountO(e){
  if(document.getElementsByClassName("account-list")[0]){
    if(window.innerWidth<575){
      document.body.style.overflow="hidden"
    }
    document.getElementsByClassName("account-list")[0].style.visibility ="visible";
    document.getElementsByClassName("account-list")[0].style.opacity = "1";
    document.getElementsByClassName("u-icon")[0].style.display = "block";
    document.getElementsByClassName("d-icon")[0].style.display = "none";
  }
}

export function handleAccountC(e) {
  if(window.innerWidth<575){
    document.body.style.overflow="auto"
  }
  if(document.getElementsByClassName("account-list")[0]){
    document.getElementsByClassName("account-list")[0].style.visibility ="hidden";
    document.getElementsByClassName("account-list")[0].style.opacity = "0";
  }
  if (document.getElementsByClassName("u-icon")[0]) {
    document.getElementsByClassName("u-icon")[0].style.display = "none";
    document.getElementsByClassName("d-icon")[0].style.display = "block";
  }
}

export function openCart() {
  document.getElementsByClassName("main-cart")[0].style.display = "block";
  document.getElementById("cartBoxDiv").style.display = "block";
  document.body.style.overflow = "hidden";
}

export function openDiv(e) {
  e.target.parentElement.parentElement.childNodes[1].style.position =
    "absolute";
  e.target.parentElement.parentElement.childNodes[1].style.right = "6px";
  e.target.parentElement.parentElement.childNodes[1].style.opacity = "1";
  e.target.parentElement.parentElement.childNodes[1].style.zIndex = "4";
}


export function overflow_hidden() {
  document.body.style.overflowY = "hidden";
}
export function overflow_showing() {
  document.body.style.overflowY = "auto";
}

export const showAddressPopup = (e) => {
  // if (document.querySelector("#collapseThree")) {
  //   document.querySelector("#collapseThree").classList.remove("collapsing");
  //   document.querySelector("#collapseThree").classList.add("show");
  // }
if(document.querySelector('.ADDRESSPOPUP')){
    document.querySelector('.ADDRESSPOPUP').style.display="flex"
  }
};


export const showPaymentPopup=()=>{
  // document.getElementById('PaymentPopup').style.display="flex"
  if(document.querySelector('.PAYMENTPOPUP')){
    document.querySelector('.PAYMENTPOPUP').style.display="flex"
  }

}
export const addressPopupClose = (e) => {
  if(document.querySelector(".ADDRESSPOPUP")){
    document.querySelector(".ADDRESSPOPUP").style.display = "none";
  }
};

export const paymentPopupClose = () => {
  if(document.querySelector(".PAYMENTPOPUP")){
    document.querySelector(".PAYMENTPOPUP").style.display = "none";
  }
};

export const clearFormData = () => {
  document.querySelectorAll(".address-popup-input").forEach((input) => {
    input.value = "";
  });

  document.querySelectorAll(".address-popup-input-s").forEach((input) => {
    input.value = "";
  });
};

export const openFilters = (e) => {
  //var filter = document.querySelectorAll(".select-filter-a");
  // filter.forEach((btn)=>{
  //   btn.classList.remove('filter-active')
  //   btn.childNodes[1].classList.remove('fa-chevron-up')
  // })
  document.querySelector("#filters-popup").classList.add("d-block");
  // add active and show
  if (e.currentTarget.classList.contains("fa-chevron-down")) {
    e.currentTarget.parentElement.classList.add("filter-active");
    e.currentTarget.classList.toggle("fa-chevron-up");
    if (e.currentTarget.classList.contains("fa-chevron-up")) {
      document.querySelector("#filters-popup").classList.add("d-block");
    } else {
      e.currentTarget.parentElement.classList.remove("filter-active");
      closeFilters();
    }
  } else if (e.currentTarget.classList.contains("select-filter-a")) {
    e.currentTarget.childNodes[1].classList.toggle("fa-chevron-up");
    if (e.currentTarget.childNodes[1].classList.contains("fa-chevron-up")) {
      e.currentTarget.classList.add("filter-active");
      document.querySelector("#filters-popup").classList.add("d-block");
    } else {
      e.currentTarget.classList.remove("filter-active");
      closeFilters();
    }
  }
};
export const closeFilters = () => {
  document.querySelector("#filters-popup").classList.remove("d-block");
};

export const handleLoginO = () => { 
  
  if (document.querySelector(".login")) {
    if (document.querySelector(".login-popup")) {
      document.querySelector(".login-popup").style.display = "flex";
    }
    document.querySelector(".register").style.display = "none";
    document.querySelector(".forgot").style.display = "none";
    document.querySelector(".login").style.display = "block";
  }
};

export const handleRegisterO = () => {
  document.querySelector(".login-popup").style.display = "flex";
  document.querySelector(".register").style.display = "block";
  document.querySelector(".login").style.display = "none";
  document.querySelector(".forgot").style.display = "none";
};

export const handleForgotO = () => {
  document.querySelector(".login").style.display = "none";
  document.querySelector(".register").style.display = "none";
  document.querySelector(".forgot").style.display = "block";
};
export const handleForgotC = () => {
  document.querySelector(".login").style.display = "none";
  document.querySelector(".register").style.display = "block";
  document.querySelector(".forgot").style.display = "none";
};

export const handlePopupC = () => {
  if (document.querySelector(".popup_div")) {
    document.querySelectorAll('.popup_div').forEach(div=>{
      div.style.display = "none";
    })
    document.querySelectorAll('.drules_col').forEach(div=>{
      div.classList.remove('on')
    })
    document.querySelectorAll('.zone_geo').forEach(div=>{
      div.classList.remove('on')
    })
  }
  if (document.querySelector(".popup_layer")) {
    document.querySelectorAll('.popup_layer').forEach(div=>{
      div.style.display = "none";
    })
  }
}
export const handlePopupSH = () => {
  if (document.getElementById("ds_popup_layer")) {
    document.getElementById("ds_popup_layer").style.display = "none";
}
  if (document.getElementById("ds_popup_div")) {
      document.getElementById("ds_popup_div").style.display = "none";
  }
}
export const handlePopupMap = () => {
  if (document.getElementById("map_popup_layer")) {
    document.getElementById("map_popup_layer").style.display = "none";
  }
  if (document.getElementById("map_popup_div")) {
      document.getElementById("map_popup_div").style.display = "none";
  }
}
export const handleLoginC = (isAuth) => {
  //console.log(isAuth,'isAuth')
  if(!isAuth && window.location.pathname !== '/'){
    //window.location.href = window.location.origin + "/";
  }
  if (document.querySelector(".login-popup")) {
    document.querySelector(".login-popup").style.display = "none";
  }
  if (document.querySelector(".login")) {
    document.querySelector(".login").style.display = "none";
  }
  if (document.querySelector(".register")) {
    document.querySelector(".register").style.display = "none";
  }
  if (document.querySelector(".forgot")) {
    document.querySelector(".forgot").style.display = "none";
  }
};

export const handlePopup = () => {
  window.history.back();
};

export const getDomainWithoutSubdomain = url => {
  const urlParts = new URL(url).hostname.split('.')

  return urlParts
    .slice(0)
    .slice(-(urlParts.length === 4 ? 3 : 2))
    .join('.')
}


export const showCatMenu = (e) => {
  let prDiv = e.currentTarget.parentNode
  if (
    prDiv.classList.contains("on")
  ) {
    prDiv.classList.remove("on")
  } else {
    prDiv.classList.add("on")
  }
}

export const expandCatBox = (e) => {
  let cat_key = e.currentTarget.getAttribute("rel")
  let catbox = document.getElementById("catbox_"+cat_key)
  if (
    catbox.classList.contains("on")
  ) {
    catbox.classList.remove("on")
  } else {
    catbox.classList.add("on")
  }
};


  export const checkEnRelUpdatedFields = (newEnRels, _oldEnRels, _type) => {
    let entity_relationships_field_updated = [];
    let entity_relationships_field_deleted = [];
    let entity_relationships_field_changed = [];
    let oldEnRelsFields = []
    let newEnRelsFields = []
    let oldEnRels = {}
    if(_oldEnRels){
      oldEnRels = {..._oldEnRels}
      oldEnRelsFields = Object.keys(oldEnRels)
    }
    //console.log(oldEnRelsFields,"oldEnRels", oldEnRels)
    if(newEnRels){
      newEnRelsFields = Object.keys(newEnRels)
      newEnRelsFields.forEach((_rel) => {
        if(oldEnRelsFields.indexOf(_rel) > -1){
          if(JSON.stringify(newEnRels[_rel]) !== JSON.stringify(oldEnRels[_rel])){
            //console.log("oldEnRels changed", oldEnRels[_rel])
            entity_relationships_field_updated.push(_rel)
            if(Array.isArray(oldEnRels[_rel])){
              oldEnRels[_rel].forEach((rel_obj) => {
                let n_rel_obj = newEnRels[_rel].filter((_rl) => _rl.l?.mapped_field_name === rel_obj.l?.mapped_field_name)
                if(n_rel_obj && n_rel_obj.length > 0 && JSON.stringify(n_rel_obj) !== JSON.stringify(rel_obj)){
                  entity_relationships_field_changed.push(rel_obj)
                }
              })
            }
            //entity_relationships_field_changed.push(oldEnRels[_rel])
          }
        } else {
          entity_relationships_field_updated.push(_rel)
        }
      })
    }

    //console.log("EnRels", oldEnRelsFields, newEnRelsFields)
    if(oldEnRelsFields.length > 0 && newEnRelsFields.length !== oldEnRelsFields.length){
      oldEnRelsFields.forEach((_rel) => {
        if(newEnRelsFields.indexOf(_rel) === -1){
          entity_relationships_field_updated.push(_rel)
          if(_type === 'delete' && oldEnRels[_rel] && oldEnRels[_rel].length > 0){
            oldEnRels[_rel].forEach((_rel_obj) => {
              if (_rel_obj.l?.mapped_field_name === _rel) {
                entity_relationships_field_deleted.push(_rel_obj)
              }
            })
          }
        }
      })
    }
    if(_type === 'delete'){
      return entity_relationships_field_deleted
    } 
    else if(_type === 'changed'){
      return entity_relationships_field_changed
    }
    else {
      return entity_relationships_field_updated
    }
  }

  export const findMatchedField = (n_fio, ofields) => {
    let _fiObj = {};
    ofields.forEach((o_fo) => {
      if (
        o_fo.field_id === n_fio.field_id &&
        o_fo.field_name !== n_fio.field_name
      ) {
        _fiObj = { o: o_fo.field_name, n: n_fio.field_name };
        //console.log("_fiObj", _fiObj)
        return false;
      }
    });
    return _fiObj;
  };

  export const removeSpecial = (text) => {
    if(text) {
      //console.log("text ", text)
      var lower = text.toLowerCase();
      var upper = text.toUpperCase();
      var result = "";
      var acceptlist = ["/","-","_","."," ","0","1","2","3","4","5","6","7","8","9"];
      for(var i=0; i<text.length; ++i) {
        if(lower[i] !== upper[i] || acceptlist.indexOf(text[i]) > -1) {
          result += text[i];
        }
      }
      //console.log("result ", result)
      return result.replace(/ /g, '.');
    }
    return "-"
  }

  export const convertFormat = (_nm, _valu) => {
    let e0 = _valu;
    if (Array.isArray(_valu)) {
      let _valus = []
      _valu.forEach((_obj) => {
        if(typeof _obj === 'object'){
          _valus.push(Object.values(_obj)[0])
        } else {
          _valus.push(_obj)
        }
      });
      e0 = _valus
    } else if(_valu !== null && typeof _valu === 'object'){
      let _label = Object.keys(_valu)[0];
      if(typeof _valu[_label] === 'object'){
        let __label = Object.keys(_valu[_label])[0];
        if (__label === "_id") {
          __label = Object.keys(_valu[_label])[1];
        }
        e0 = _valu[_label][__label]
      } 
      else {
        if (_label === "_id") {
          _label = Object.keys(_valu)[1];
        }
        e0 = _valu[_label]
      }
    }
    //console.log("e0", e0)
    return e0
  }

  export const checkFieldDisplay = (props_obj, _vals) => {
    let isDisplay = true
    const listen_to = props_obj.f_listener.params?.listen_to?.field_id
    let dsp_type = _vals && _vals[listen_to] ? _vals[listen_to] : ""
    if(typeof dsp_type === 'object'){
      dsp_type = dsp_type.value
    }
    if(props_obj.f_listener.params?.listen_to?.dsp_off_field_val === dsp_type || props_obj.f_listener.params?.listen_to?.dsp_off_field_val.indexOf(dsp_type) > -1){
      //console.log(_vals, " isDisplay - ", isDisplay)
      isDisplay = false
    }
    return isDisplay
  }

  export const getTimeStrStatus = (time) => {
    let monthSNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let tObj = new Date(time)
    let curDate = new Date()
    curDate.setHours(0,0,0,0)
    tObj.setHours(0,0,0,0)
    let dt = new Date(time)
    let hours = dt.getHours()
    let AP = "AM"
    let mins = addZero(dt.getMinutes())
    if (hours >= 12){
      if (hours > 12){ hours = hours - 12 }
      AP = "PM"
    }
    if(curDate.getTime() === tObj.getTime()){
      //return "Today at "+hours+":"+mins+" "+AP
    }
    curDate.setDate(curDate.getDate() - 1);
    if(tObj.setHours(0,0,0,0) === curDate.setHours(0,0,0,0)){
      //return "Yesterday at "+hours+":"+mins+" "+AP;
    }
    return tObj.getDate()+" "+monthSNames[tObj.getMonth()]+" "+tObj.getFullYear()+" "+hours+":"+mins+" "+AP
  }

  function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
  }