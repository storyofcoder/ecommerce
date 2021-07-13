// <-------------------------- Import Packages ----------------------->
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withAlert } from "react-alert";

// <-------------------------- Import Methods ----------------------->
import { getTodayDeals } from "../../../../redux/dashboard/Action";
import ProductCard from "../../../common/productCard/ProductCard";
import { withRouter } from "react-router";

function TodayBest(props) {

    useEffect(() => {
        let request = { limit: 6 };
        props.getTodayDeals(request);
    }, []);

    return <>
        {props.offers_list_loading
            ?
            <div className="text-center">Loading...</div>
            :
            <div className="today_offer_container">
                <div className="row d-flex justify-content-between">
                    <div className="deals_title" style={{ color: 'white' }} >Deal of the Day</div>
                    <div>
                        <button className=" deals_view_all_btn" onClick={() => { props.history.push(`pl?from=home&key=best`) }}>
                            View All
                        </button>
                    </div>
                </div>
                <div className="row mt-2">
                    {props.todayDealsListLoading ?
                    [1,2,3,4,5].map((item, key) => {
                        return < ProductCard isLoading={true}/>

                    })
                    :
                    props.todayDealsList.map((item, key) => {
                        return < ProductCard {...item} />

                    })
                    }
                </div>
            </div>
        }
    </>
}

const mapStateToProps = state => ({
    todayDealsList: state.dashboard.todayDealsList,
    todayDealsListLoading: state.dashboard.todayDealsListLoading,
    error: state.home.error
});

const mapDispatchToProps = dispatch => ({
    getTodayDeals: data => dispatch(getTodayDeals(data)),
});
export default compose(
    withAlert(),
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(withRouter(TodayBest));