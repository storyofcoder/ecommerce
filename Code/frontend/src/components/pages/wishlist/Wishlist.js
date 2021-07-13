// <-------------------------- Import Packages ----------------------->
import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withAlert } from "react-alert";

// <-------------------------- Import Components ----------------------->
import MenuList from "../../common/menuList/MenuList";

// <-------------------------- Import Methods ----------------------->
import { getItemsList } from "../../../redux/home/Action";
import ProductCard from "../../common/productCard/ProductCard";
import { StaticRouter } from "react-router";

function WishList(props) {
    return <>
        <MenuList />

        <div className="wishlist_container">
            <div className="ml-3">
                <span className="wishlist_title">Wish Lists</span>
                <span className="wishlist_count"></span>
            </div>
            <div className="each_category_container">
                <div className="row mt-2 pl-3 pr-3">

                    {props.wishlistLoading && !Object.values(props?.wishlist).length ?
                        [1, 2, 3, 4, 5].map((item, key) => {
                            return < ProductCard isWishlist={true} {...item} isLoading={true} />
                        })
                        :
                        !Object.values(props?.wishlist).length ?
                            <div className="text-center w-100 mt-5">
                                <img src="https://www.gokofo.com/resources/images/no-cart-items.jpg" />
                                <div className="mt-4">
                                    <button className="btn" style={{ padding: '5px 25px' }} onClick={() => props.history.push('/')}>Continue Shopping</button>
                                </div>
                            </div>
                            :
                            Object.values(props?.wishlist).map((item, key) => {
                                return < ProductCard isWishlist={true} {...item} ref={null} />
                            })}
                </div>
            </div>
        </div>
    </>
}

const mapStateToProps = state => ({
    wishlist: state.user.wishlist,
    wishlistLoading: state.user.wishlistLoading,
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
)(WishList);