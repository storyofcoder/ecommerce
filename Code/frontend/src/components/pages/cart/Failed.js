// <-------------------------- Import Packages ----------------------->
import React, { useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withAlert } from "react-alert";

// <-------------------------- Import Methods ----------------------->
import { getItemsList } from "../../../redux/home/Action";
import { withRouter } from "react-router";

function Failed(props) {
    return <>
        <div className="thank_bg">

            <div className="thank_card">

                <span className="thank_card__success bg-danger"><i className="fa fa-times"></i></span>

                <h1 className="thank_card__msg"></h1>
                <h2 className="thank_card__submsg text-danger">Transaction Failed</h2>

                <div className="thank_card__body text-center">
                    <div className="thank_card__recipient-info text-center">
                        <p className="thank_card__recipient text-center">Transaction Id</p>
                        <p className="thank_card__recipient">{props?.order?.data?.payment_initiate?.receipt}</p>
                    </div>

                    <h1 className="thank_card__price"><span>₹ </span>{props?.order?.data?.price?.total}<span>.00</span></h1>


                    <button class="retry_btn draw-border" onClick={() => props.retryPayment()}>Retry Payment</button>
                </div>

                <div className="thank_card__tags">
                    <span className="thank_card__tag">Order ID: </span>
                    <span className="thank_card__tag">{props?.order?.data?.orderid}</span>
                </div>

            </div>

        </div>

        <div className="mt-5 mb-5 text-center">
            <div className="row">
                <div className="col-6">
                    <button className="btn thank_btn" onClick={() => { props.history.push('/') }}> Continue Shopping</button>
                </div>
                <div className="col-6">
                    <button className="btn thank_btn" onClick={() => { props.history.push('/order-history') }}> My Orders</button>
                </div>
            </div>
        </div>
    </>
}

const mapStateToProps = state => ({
    user: state.user.user,
    cartList: state.user.cartList,
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
)(withRouter(Failed));