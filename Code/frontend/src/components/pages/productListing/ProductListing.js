// <-------------------------- Import Packages ----------------------->
import React, {useState} from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withAlert } from "react-alert";

// <-------------------------- Import Components ----------------------->
import MenuList from "../../common/menuList/MenuList";
// import BannerList from "./banner/Banner";
import SortBy from "./sortBy/SortBy";
// import TodayBest from "./todayBest/TodayBest";
import Products from "./products/Products"

// <-------------------------- Import Methods ----------------------->
import { getItemsList } from "../../../redux/home/Action";
import Offers from "../../common/offers/Offers";
import { withRouter } from "react-router";

function ProductListing(props) {

  const [sortBy, setSortBy] = useState('Popularity');

  return <>
    <MenuList />

    <div className="dashboard_container">
      <Offers />
      <div><span className="product_listing_count_title">Category 1</span>
        <span className="product_listing_count_value">(Showing 1 – 40 products of 899 products)</span>
      </div>
      <SortBy updateSort={setSortBy}/>

      <Products sortBy={sortBy}/>
    </div>
  </>
}

const mapStateToProps = state => ({
  items_list: state.home.items_list,
  items_list_loading: state.home.items_list_loading,
  error: state.home.error
});

const mapDispatchToProps = dispatch => ({
  getItemsList: data => dispatch(getItemsList(data)),
});
export default compose(
  withAlert(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(withRouter(ProductListing));