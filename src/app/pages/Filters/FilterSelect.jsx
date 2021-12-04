//import React from "react";
import Clear from '@material-ui/icons/Clear'
import { connect } from "react-redux";
import { callApi } from "../../../actions/components_action";


function FilterSelect(props) {

  return (
    <div className="popular-btns filter-nav-top-2 d-flex justify-content-between pb-2" style={{ background: 'rgb(224, 224, 224)' }}>
      <div className="filters-selected d-md-block d-none ">
        <div className="d-flex align-items-center">
          <h6 className='mt-2'>Filter:</h6>
          <div className="select-filter">Top Rated &nbsp;
            <Clear style={{ fontSize: "1em", color: "var(--color_purple)" }} />
          </div>
          <div className="select-filter">Built In-Speakers &nbsp;
            <Clear style={{ fontSize: "1em", color: "var(--color_purple)" }} /></div>
          <div className="select-filter">Top Rated &nbsp;
            <Clear style={{ fontSize: "1em", color: "var(--color_purple)" }} /></div>
          <div className="select-filter">Built In-Speakers &nbsp;
            <Clear style={{ fontSize: "1em", color: "var(--color_purple)" }} /></div>
        </div>
      </div>

      <div className='sortBy d-md-block d-none'>
        Sort by Popularity &nbsp;
        <i className="fas fa-chevron-down" ></i>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  //console.log(state);
  return {
    //_SR: state.item.SR,
    //_GLOBAL: state.item.GLOBAL,
    //_CART: state.item.CART,
  };
};

export default connect(mapStateToProps, {
  callApi,
})(FilterSelect);
