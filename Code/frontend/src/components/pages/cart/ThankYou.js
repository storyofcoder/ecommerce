// <-------------------------- Import Packages ----------------------->
import React, { useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withAlert } from "react-alert";

// <-------------------------- Import Methods ----------------------->
import { getItemsList } from "../../../redux/home/Action";
import { withRouter } from "react-router";

function ThankYou(props) {
    return <>
        <div className="thank_bg">

            <div className="thank_card">

                <span className="thank_card__success"><i className="fa fa-check"></i></span>

                <h1 className="thank_card__msg">Order Placed</h1>
                <h2 className="thank_card__submsg">Thank you for your order</h2>

                <div className="thank_card__body text-center">
                    <div className="thank_card__recipient-info text-center">
                        <p className="thank_card__recipient">Payment: {props?.order?.data?.payment_mode == 'ONLINE'?'Recieved': 'COD'}</p>
                        {/* <p className="thank_card__email">hello@ecom.com</p> */}
                    </div>

                    <h1 className="thank_card__price"><span>₹ </span>{props?.order?.data?.price?.total}<span>.00</span></h1>

                    <div className="thank_contanier">
                        <div className="thank_main">
                            <div className="thank_road"  >
                                <ul>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                                <div className="thank_bus">
                                    <div className="thank_back">
                                        <div className="thank_back1door"></div>
                                        <div className="thank_back2door"></div>
                                        <div className="thank_join"></div>
                                    </div>
                                    <div className="thank_front">
                                        <div className="thank_black"></div>
                                        <div className="thank_light1"></div>
                                        <div className="thank_light2"></div>
                                    </div>
                                </div>
                                <div className="thank_gift"></div>
                            </div>
                        </div>
                    </div>


                </div>

                <div className="thank_card__tags">
                    <div className="thank_card__tag">completed</div>
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
)(withRouter(ThankYou));