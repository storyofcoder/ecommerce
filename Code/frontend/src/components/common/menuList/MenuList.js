// <-------------------------- Import Packages ----------------------->
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withAlert } from "react-alert";

// <-------------------------- Import Methods ----------------------->
import { getMenuList } from "../../../redux/dashboard/Action";
import { withRouter } from "react-router";

function MenuList(props) {

    useEffect(() => {
        // if(!props?.menu_list?.length)
        // props.getMenuList();
    }, []);

    return <>
        {props.menu_list_loading
            ?
            <div className="text-center">Loading...</div>
            :
            (props.menu_list.length > 0) &&

            <div className="text-center row d-flex justify-content-between dashboard_menu_list">
                {props.menu_list.map((item, key) => {
                    return (
                        <div key={`dashboard_menu_list_${key}`} className="dashboard_menu_list_card" onClick={() => { props.history.push(`/pl?from=menu&key=${item?.category?.name}`)}}>
                            <div><span>{item?.category?.name}</span>
                            </div>
                        </div>
                    )
                })}

            </div>
        }
    </>
}

const mapStateToProps = state => ({
    menu_list: state.dashboard.menu_list,
    menu_list_loading: state.dashboard.menu_list_loading,
    error: state.home.error
});

const mapDispatchToProps = dispatch => ({
    getMenuList: data => dispatch(getMenuList(data)),
});
export default compose(
    withAlert(),
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(withRouter(MenuList));