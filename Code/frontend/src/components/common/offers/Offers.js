// <-------------------------- Import Packages ----------------------->
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withAlert } from "react-alert";

// <-------------------------- Import Methods ----------------------->
import { getOffersList } from "../../../redux/dashboard/Action";
import { withRouter } from "react-router";

function Offers(props) {

    const [banner, setBanner] = useState(null);

    useEffect(() => {
        let value = new URLSearchParams(props.history.location.search).get("key");
        for (let i = 0; i < props.menu_list.length; i++) {
            if (props.menu_list[i].category.name == value) {
                setBanner([props.menu_list[i].banner.image]);
            }
        }
    }, [props.history.location.search, props.menu_list])

    return <>
        {banner ?
            <div className="text-center">
                {banner.map((item, key) => {
                    return (
                        <div key={`dashboard_offers_list_${key}`} onClick={() => { console.log('menu offers list click'); }}>
                            <div><img className="w-100" src={item} /></div>
                        </div>
                    )
                })}
            </div>
            :
            <></>

        }
    </>
}

const mapStateToProps = state => ({
    menu_list: state.dashboard.menu_list,
    offers_list: state.dashboard.offers_list,
    offers_list_loading: state.dashboard.offers_list_loading,
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
)(withRouter(Offers));