// <-------------------------- Import Packages ----------------------->
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withAlert } from "react-alert";

// <-------------------------- Import Methods ----------------------->
import { getMenuList } from "../../../../redux/dashboard/Action";

function SortBy(props) {
    const [sortBy, setsortBy] = useState(['Popularity', 'Price -- Low to High', 'Price -- High to Low', 'Newest First', 'Discount', 'Rating']);
    const [active, setactive] = useState('Popularity');
    const updateActive=(value)=>{
        setactive(value);
        props.updateSort(value);
    }

    return <>
        {props.isLoading
            ?
            <div className="text-center">Loading...</div>
            :
            (sortBy.length > 0) &&

            <div className="text-center row sort_by_list ml-0">
                <div key={`dashboard_menu_list_${'sort'}`} className="product_listing_sort_by" onClick={() => { console.log('menu item click'); }}>
                    <div><span className="f_w_500">{'Sort By:'}</span>
                    </div>
                </div>
                {sortBy.map((item, key) => {
                    return (
                        <div key={`dashboard_menu_list_${key}`} className="product_listing_sort_by" onClick={() => { updateActive(item) }}>
                            <div className={active == item ? 'sort_by_active ':''}><span>{item}</span>
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
)(SortBy);