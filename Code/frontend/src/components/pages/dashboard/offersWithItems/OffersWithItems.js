// <-------------------------- Import Packages ----------------------->
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withAlert } from "react-alert";

// <-------------------------- Import Methods ----------------------->
import { getOffersList } from "../../../../redux/dashboard/Action";
import EachCategory from "./EachCategory";

function OffersWithItems(props) {

    return <>
            <div>
                {props.menu_list.map((value, index) => {
                    return < EachCategory {...value}/>
                })}
            </div>
    </>
}

const mapStateToProps = state => ({
    menu_list: state.dashboard.menu_list,
    menu_list_loading: state.dashboard.menu_list_loading,
    error: state.home.error
});

const mapDispatchToProps = dispatch => ({
    getOffersList: data => dispatch(getOffersList(data)),
});
export default compose(
    withAlert(),
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(OffersWithItems);