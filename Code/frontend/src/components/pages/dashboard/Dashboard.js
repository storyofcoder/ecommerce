// <-------------------------- Import Packages ----------------------->
import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withAlert } from "react-alert";

// <-------------------------- Import Components ----------------------->
import MenuList from "./menuList/MenuList";
import BannerList from "./banner/Banner";
import Offers from "../../common/offers/Offers";
import TodayBest from "./todayBest/TodayBest";
import OffersWithItems from "./offersWithItems/OffersWithItems"

// <-------------------------- Import Methods ----------------------->
import { getItemsList } from "../../../redux/home/Action";

function Dashboard() {

  return <>
    <MenuList />

    <div className="dashboard_container">
      <BannerList />

      {/* <Offers /> */}

      <TodayBest />

      <OffersWithItems />
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
)(Dashboard);