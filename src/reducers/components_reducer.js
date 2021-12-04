let initialState = {
  // isLoading: false,
  // error: null,
  // SETTINGS: {},
  // BUSINESS: {},
  NAVBAR: {},
  DATA: {},
  CHILD_DATA: {},
  SAVE_CHILD_DATA: {},
  ENTITY_FIELD: {},
  CLIENT_DATA: {},
  COMP_DATA: {},
  FUI_VAL: {},
};

const componentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "en":
      //console.log(action.payload, "action payload");
      if (action.payload.def?.name === "Nav bar") {
        //console.log(action.payload, "action payload");
        return {
          ...state,
          NAVBAR: action.payload,
        };
      } else {
        if (!action.payload.query.params.ignore_response) {
          return {
            ...state,
            DATA: action.payload,
          };
        } else {
          return state;
        }
      }
    case "ge":
      return {
        ...state,
        DATA: action.payload,
      };
    case "cen": {
      let _CHILD_DATA = { ...state.CHILD_DATA };
      let _ename = action.payload.def.name
      if (action.payload.query?.caller_id && action.payload.query?.caller_ref === "Page.get_entity") {
        _ename = action.payload.query?.caller_id
      }
      if (action.payload.query?.caller_key) {
        _ename = action.payload.query?.caller_key
      }
      _CHILD_DATA[_ename] = action.payload
      return Object.assign({}, state, {
        CHILD_DATA: _CHILD_DATA
      });
    }
    case "sce":
      return {
        ...state,
        SAVE_CHILD_DATA: action.payload,
      };
    case "sea":
      return {
        ...state,
        ENTITY_ASSOC: action.payload.value,
      };
    case "gef": {
      //console.log("######## action.payload", action.payload);  

      let _ENTITY_FIELD = { ...state.ENTITY_FIELD };
      Object.keys(action.payload.values).forEach((ekey) => {
        let _ekey;

        if (action.payload.query?.caller_key) {
          //console.log("caller_key in gef", action.payload.query?.caller_key)
          _ekey = action.payload.query?.caller_key;
        } else if (action.payload.query?.caller_id) {
          _ekey = ekey + "_" + action.payload.query.caller_id
        } else {
          _ekey = ekey;
        }

        if (ekey === "theme") {
          // console.log("Theme is processed now")	
          _ENTITY_FIELD["theme"] = getProcessedTheme(action.payload.values["theme"])
        } else {
          _ENTITY_FIELD[_ekey] = action.payload.values[ekey]
          if ((action.payload.query && action.payload.query?.caller_type === "NavBar") || (ekey === "Roles")) {
            _ENTITY_FIELD[ekey] = action.payload.values[ekey]
          }
        }
      })
      //console.log("######## 4",_ENTITY_FIELD)
      return Object.assign({}, state, {
        ENTITY_FIELD: _ENTITY_FIELD
      });
    }
    case "geff": {
      //console.log("######## action.payload", action.payload);
      let __ENTITY_FIELD = { ...state.ENTITY_FIELD };
      let field_id = action.payload.query.params.field_id

      let _ekey = field_id;
      if (action.payload.query.caller_id) {
        _ekey = _ekey + "_" + action.payload.query.caller_id + "_geff"
      }
      __ENTITY_FIELD[_ekey] = action.payload[field_id]

      //console.log("######## 4",__ENTITY_FIELD)
      return Object.assign({}, state, {
        ENTITY_FIELD: __ENTITY_FIELD
      });
    }
    case "client": {
      //console.log("######## action.payload", action.payload);
      let _CLIENT_DATA = { ...state.CLIENT_DATA };
      _CLIENT_DATA[action.payload.caller_id] = action.payload.data;
      //console.log("######## 4",_CLIENT_DATA)
      return Object.assign({}, state, {
        CLIENT_DATA: _CLIENT_DATA
      });
    }
    case "cp0": {
      //console.log("######## action.payload", action.payload);
      let _COMP_DATA = { ...state.COMP_DATA };
      _COMP_DATA[action.payload.query.caller_id] = action.payload;
      //console.log("######## 4",_COMP_DATA)
      return Object.assign({}, state, {
        COMP_DATA: _COMP_DATA
      });
    }
    case "afu":
      console.log("######## action.payload", action.payload);
      return {
        ...state,
        FUI_VAL: action.payload,
      };
    case "reset_comp_data":
      let validKeys = [ 'theme', 'settings', 'pages_list' ];
      let _ENTITY_FIELD = {...state.ENTITY_FIELD}
      Object.keys(_ENTITY_FIELD).forEach((key) => validKeys.includes(key) || delete _ENTITY_FIELD[key]);

      return {
        ...state,
        NAVBAR: {},
        DATA: {},
        CHILD_DATA: {},
        SAVE_CHILD_DATA: {},
        ENTITY_FIELD: _ENTITY_FIELD,
        CLIENT_DATA: {},
        COMP_DATA: {},
        FUI_VAL: {},
      };
    case "setDB":
      return {
        ...state,
        DATA: action.payload,
      };
    default:
      //console.log("default in getDataReducer");
      return state;
  }
};

//replaces '$a.b.c' with value of a.b.c from theme string
const getProcessedTheme = (_theme) => {
  let _themeObj = JSON.parse(_theme[0].style)
  let matched = _theme[0].style.match(/("\$\S+")/ig);
  matched?.forEach((m) => {
    let varStr = m.slice(1, -1)
    _theme[0].style = _theme[0].style.replace(varStr, Object.byString(_themeObj, varStr.replace('$', '')))
  })
  return _theme
  // console.log(_theme[0].style)
}

Object.byString = function (o, s) {
  s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  s = s.replace(/^\./, '');           // strip a leading dot
  var a = s.split('.');
  for (var i = 0, n = a.length; i < n; ++i) {
    var k = a[i];
    if (k in o) {
      o = o[k];
    } else {
      return;
    }
  }
  return o;
}


export default componentReducer;
