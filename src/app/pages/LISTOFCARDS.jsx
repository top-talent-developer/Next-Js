import { useState, useEffect, useRef } from 'react'
import { connect } from "react-redux";
import { callApi } from "../../actions/components_action";
import { Container } from 'react-bootstrap';
import Carousel from "react-elastic-carousel";
//import { Link } from "react-router-dom"
import SaveIcon from "@material-ui/icons/Save";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import loadable from "@loadable/component";
// const TG = loadable(() => import("../components/fields/TG"));
// const FG = loadable(() => import("../components/fields/FG"));
import "./templates/cards.css";
//const Card1 = loadable(() => import("./templates/Card1"));

let called_save_entity = false;
let cardaction;
const LISTOFCARDS = (props) => {
  const [cardsquery, setCardsQuery] = useState();
  const [cardsdata, setCardsData] = useState();
  const [editcard, setEditCard] = useState();
  const msgDiv = useRef(null);
  const [wwidth, setWidth] = useState(window.innerWidth);

  window.addEventListener("resize", function () {
    setWidth(window.innerWidth);
  });

  let listner1 = props.object.name + "." + props.object.ref_id;
  //let queryVals = props._ENTITY_FIELD[props.object.name + "_" + props.object.ref_id];

  useEffect(() => {
    let query_vals = {...props._ENTITY_FIELD[props.object.name+ "_" +props.object.ref_id]};
    if(Object.keys(query_vals).length > 0){
      setCardsQuery(query_vals) 
    }
    //console.log(listner1, "lofcards changed page_path query_vals", query_vals);
    if (query_vals && !props._CHILD_DATA[props.object.name + "." + props.object.ref_id] && query_vals?.ename) {
      setCardsData(null);
      callQuery(query_vals);
    }
  }, [
    props.object.name, props.object.ref_id, props._ENTITY_FIELD, props._CHILD_DATA,
    window.location.pathname,
  ]); // eslint-disable-line, react-hooks/exhaustive-deps

  useEffect(() => {
    //console.log("@@@@@ In LISTOFCARDS.jsx useEffect ", props?._CHILD_DATA)
    
    if (props._CHILD_DATA[listner1] && props._CHILD_DATA[listner1].values) {
      setCardsData(props._CHILD_DATA[listner1].values)
      props.loader_ref?.current?.complete();
    }
  }, [listner1, props._CHILD_DATA, window.location.pathname]); // eslint-disable-line, react-hooks/exhaustive-deps

  const callQuery = (query_vals) => {
    let pgsize = parseInt(query_vals.p_page_size?.value);
    let filter_by = {};
    let _filter_by = query_vals.filter_by_and;

    if (_filter_by && _filter_by.length > 0) {
      _filter_by.forEach((fl) => {
        if(!fl?.dt || fl.dt === 'STRING'){
          filter_by[fl.name] = fl.value;
        } else {
          filter_by[fl.name+"._id"] = fl.value;
        }
      });
    }

    let query = {
      operation: "/get_entity",
      params: {
        child: 1,
        ename: query_vals.ename?.name,
        field_id: listner1,
        filter_by: filter_by,
        sort_by: query_vals.sort_by?.value,
        req_fields: [],
        req_def_fileds: ["_id","name"],
        page_size: pgsize
      },
    };
    query.caller_key = listner1;
    query.caller_ref = "LISTOFCARDS.get_cards_data";
    props.callApi(query);
    console.log("callApi....", query)
  };

  const updateCard = (card) => {
    //console.log("updateCard data ", card)
    setEditCard(card)
  }

  const removeCard = (card) => {
    //let cardobj = {...editcard}
    let _filter_by = cardsquery.filter_by_and
    console.log(_filter_by)
    if (_filter_by?.length > 0) {
      _filter_by.forEach((fl) => {
        //filter_by[fl.name] = fl.value;
        let filter_by = card[fl.name].filter((fl) => {
          return fl._id !== fl.value
        })
        console.log(card[fl.name], filter_by)
        card[fl.name] = filter_by
      });
      cardaction = 'remove'
      handleSaveData(card)
    }
  }
  
  const handleSaveData = (cardObj) => {
    let apiParams = {
      ename: cardsquery.ename.name,
      etype: "TABLE",
      eid: cardObj._id,
      child: 1,
      value: cardObj,
    };
    console.log("apiParams", apiParams);
    //return
    if(cardObj){
      msgDiv.current.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:14px"></i> Updating...'
      msgDiv.current.style.display = "block";
      props.callApi({
        operation: "/save_entity",
        caller_ref: "UPDATECARD.handleSaveData",
        params: apiParams,
      });
      called_save_entity = true;
    }
  }

  useEffect(() => {
    if (props._SAVE_CHILD_DATA?.msg && called_save_entity) {
      console.log("_SAVE_CHILD_DATA - ", props._SAVE_CHILD_DATA);
      if(props._SAVE_CHILD_DATA?.value){
        let _cardsdata = [...cardsdata]
        let _card = props._SAVE_CHILD_DATA.value
        _cardsdata.forEach((cd, indx) => {
          if (cd._id === _card._id) {
            if(cardaction === 'update'){
              _cardsdata.splice(indx, 1, _card);
            }
            if(cardaction === 'remove'){
              _cardsdata.splice(indx, 1);
            }
            return false;
          }
        });
        setCardsData(_cardsdata)
        cardaction = null
        callQuery(cardsquery)
      }
      setTimeout(() => {
        called_save_entity = false;
        if(props._SAVE_CHILD_DATA.msg === "data saved"){
          //msgDiv.current.innerHTML = "";
          setEditCard(null)
        } else {
          msgDiv.current.innerHTML = props._SAVE_CHILD_DATA?.msg;
        }
      }, 1200);
    }
  }, [props._SAVE_CHILD_DATA]); // eslint-disable-line, react-hooks/exhaustive-deps

  let comp = 'Card1'
  if(cardsquery){
    let compObj = props.templates?.find((temp)=>{ return temp._id === cardsquery["card template"]._id })
    if(compObj){
      comp = compObj.class
    }
  }
  let CARD = loadable(() =>
    import("./templates/" + comp).catch (() => import("./templates/Card1") ));

  return (
    <div className="w-100 list-of-cards position-relative">
      { cardsquery?.heading ? <h2 rel={cardsquery?.display?._id}>{cardsquery?.heading}</h2> : null }
      { cardsdata ?
      <Container className={cardsquery?.display?._id === 'Carousel' ? "cards" : "w-100 cards2"} rel={cardsquery?.display?._id}>
        { cardsquery?.display?._id === 'List' ?
          <div
            className="w-100 d-flex flex-wrap list-cards"
          >
            {cardsdata?.map((card, index) => (
              <CARD key={index} qvalue={cardsquery} data={card} updateCard={updateCard} removeCard={removeCard} from={props.from} />
            ))}
          </div>
         :
         <Carousel
          itemsToShow={
            wwidth >= 1200
            ? 3
            : wwidth < 1200 && wwidth >= 768
              ? 2
              : wwidth < 767 && wwidth >= 500
                ? 1
                : 1
          }
          className="react-carosuel"
         >
          { cardsdata?.map((card, index) => (
            <CARD key={index} qvalue={cardsquery} data={card} updateCard={updateCard} removeCard={removeCard} from={props.from} />
          )) }
         </Carousel>
        }
      </Container> : <div className="w-100 mt-3" style={{textAlign:"center"}}>loading ...</div> }
      { editcard ? 
      <> 
        <div
          className="popup_div w-100 h-100 position-fixed d-flex-c"
          rel={'popup'}
          id={"popup_div"}
          style={{ left: "0px", maxWidth:"100%", backgroundColor:"#00000033", top:"0px", padding:"15px 10px" }}
        >
          <div className="m-0 h-100 position-relative"
            style={{ backgroundColor:"#FFF", padding: "20px", overflow:"auto", width:"96%", maxWidth:"768px" }}
          >
            <div className="msg_reset position-absolute" ref={msgDiv} style={{top:"20px", left:"0px"}}></div> 
            <div className="col-12 py-2 eform_hdr_div">
              <h3 className="m-0 eform_hdr">{cardsquery.ename.name}</h3>
              <div className="p-0 m-0 d-flex eform_actions">
                <div className="ea_btn_div">
                  <button
                    type="button"
                    title="Back"
                    className="en_save_btn"
                    onClick={() => { handleSaveData(editcard); cardaction = 'update' }}
                  >
                    <SaveIcon />
                    <div>SAVE</div>
                  </button>
                </div>
                <div className="ea_btn_div">
                  <button
                    type="button"
                    title="Back"
                    className="en_save_btn"
                    onClick={() => setEditCard(null)}
                  >
                    <DoubleArrowIcon  />
                    <div>CLOSE</div>
                  </button>
                </div>
              </div>
            </div>
            
            {/* <CARDEDITPOPUP 
              data={editcard} 
              ename={cardsquery.ename.name} 
              callApi={props.callApi}
              _CHILD_DATA={props._CHILD_DATA}
              _ENTITY_FIELD={props._ENTITY_FIELD}
              updateCard={updateCard}
            /> */}
          </div>
        </div>
      </> : null }
    </div>
  )
}

// const CARDEDITPOPUP = (props) => {
//   const [values, setValues] = useState();
//   const [endef, setEntityDef] = useState();
//   const qcall_key = props.ename+"_"+props.data._id

//   useEffect(() => {
//     //console.log("CARDEDITPOPUP props", props)
//     let api_params = {
//       ename: props.ename,
//       etype: "TABLE",
//       eid: props.data._id,
//       child:1,
//       req_def_fileds: ["_id","etype", "name", "Entity Format", "fields","Actions","Entity Permission"]
//     };
//     props.callApi({
//       operation: "/get_entity_data",
//       caller_ref: "CARDEDITPOPUP.update",
//       caller_key:qcall_key,
//       params: api_params,
//     });
//   }, []); // eslint-disable-line, react-hooks/exhaustive-deps

//   useEffect(() => {
//     if (props._CHILD_DATA[qcall_key]) {
//       //console.log(" props._CHILD_DATA - ", props._CHILD_DATA[qcall_key]);
//       setEntityDef(props._CHILD_DATA[qcall_key].def)
//       setValues(props._CHILD_DATA[qcall_key].value)
//     }
//   }, [props._CHILD_DATA[qcall_key]]); // eslint-disable-line, react-hooks/exhaustive-deps

//   const handleChange = (e) => {
//     let _values = { ...values };
//     if (!Array.isArray(e) && !e.target) {
//       let _names = Object.keys(e);
//       _names.forEach((_nm) => {
//         _values[_nm] = e[_nm];
//       });
//     } else {
//       _values[e.target ? e.target.name : e[0]] = e.target
//         ? e.target.value
//         : e[1];
//     }
//     console.log("_values", _values)
//     setValues(_values);
//     props.updateCard(_values);
//   };

//   let theme;
//   if (props?._ENTITY_FIELD["theme"] && props?._ENTITY_FIELD["theme"][0].style) {
//     //console.log("_ENTITY_FIELD theme", typeof (props?._ENTITY_FIELD['theme'][0].style));
//     theme = JSON.parse(props?._ENTITY_FIELD["theme"][0].style);
//   }
  
//   return endef?.fields?.length > 0 ? (
//     <div className="w-100 admin_panel popup_form" key={1}>
//       {endef.fields?.map((f, i) =>
//         f.f_ui === "TG" ? (
//           <div key={i}>
//             <TG
//               index={i}
//               field_value={f.field_value}
//               object={f}
//               values={values}
//               //factionfields={true}
//               handleChange={handleChange}
//               theme={theme}
//               eid={values._id ? values._id : null}
//             />
//           </div>
//         ) : f.f_ui === "FG" ? (
//           <div key={i}>
//             <FG
//               index={i}
//               object={f}
//               handleChange={handleChange}
//               ovalues={values}
//               NAVBAR={props._NAVBAR}
//               theme={theme}
//               eid={values._id ? values._id : null}
//             />
//           </div>
//         ) : null
//       )}
//     </div>
//   ) : (
//     <div
//       className="w-100 admin_panel"
//       key={1}
//       style={{ textAlign: "center", lineHeight: "30px" }}
//     >
//       loading...
//     </div>
//   )
// }

const mapStateToProps = (state) => {
  return {
    _COMP_DATA: state.entity.COMP_DATA,
    _ENTITY_FIELD: state.entity.ENTITY_FIELD,
    _CHILD_DATA: state.entity.CHILD_DATA,
    _SAVE_CHILD_DATA:state.entity.SAVE_CHILD_DATA
  };
};

export default connect(mapStateToProps, {
  callApi,
})(LISTOFCARDS);
