// <-------------------------- Import Packages ----------------------->
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withAlert } from "react-alert";

// <-------------------------- Import Methods ----------------------->
import { getMenuList, getbanner } from "../../../../redux/dashboard/Action";
// <-------------------------- Import Methods ----------------------->
import Slider from '../../../common/slider/Slider'

function BannerList(props) {
    useEffect(() => {
        props.getbanner();
    }, []);

    return <>
        <Slider data={props.bannerList} isLoading={props.bannerListLoading}/>
    </>
}

const mapStateToProps = state => ({
    bannerList: state.dashboard.bannerList,
    bannerListLoading: state.dashboard.bannerListLoading,
    error: state.home.error
});

const mapDispatchToProps = dispatch => ({
    getMenuList: data => dispatch(getMenuList(data)),
    getbanner: data => dispatch(getbanner())
});
export default compose(
    withAlert(),
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(BannerList);