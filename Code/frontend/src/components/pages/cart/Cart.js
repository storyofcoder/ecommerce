// <-------------------------- Import Packages ----------------------->
import React, { useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withAlert } from "react-alert";
import axios from 'axios';

// <-------------------------- Import Components ----------------------->
import MenuList from "../../common/menuList/MenuList";

// <-------------------------- Import Methods ----------------------->
import { getItemsList } from "../../../redux/home/Action";
import Products from "./Products";
import Address from "./Address";
import { createOrder, capture } from "../../../apis/post/Index";
import ThankYou from "./ThankYou";
import Failed from "./Failed";
import { auth } from "../../../redux/user/Action";

function Cart(props) {

    const [page, setPage] = useState('Confirm');
    const [paymentMode, setPaymentMode] = useState('ONLINE');
    const [order, setOrder] = useState(null);
    const [orderStatus, setOrderStatus] = useState('pending');
    const [address, setaddress] = useState(props?.user?.delivery_address?.length > props?.user?.delivery_address[0] ? 0 : null);

    const handleButton = (value) => {
        setPage(value);
    }

    const total_amount = () => {
        let amount = 0;
        let symbol = '$';
        for (let key in props.cartList) {
            amount += (props.cartList[key].quantity * props.cartList[key].price?.current_price)
            symbol = props.cartList[key].price?.symbol;
        }
        return Number(amount.toFixed(2));
    }

    const handleMainButton = () => {
        if (page == 'Confirm') {
            setPage('Payment');
        } else if (page == 'Payment') {
            if (!address) {
                props.alert.show('Address is required*', {
                    timeout: 5000,
                    type: "error"
                });
                return;
            }
            razorPayPaymentHandler();
        }
    }

    const razorPayPaymentHandler = async () => {
        let data = {};
        if (!order) {
            const response = await createOrder({ payment_mode: paymentMode, address });
            data = response.data
        } else {
            data = order;
        }
        if (data?.data) {
            setOrder(data);
            if (data?.status == "success") {
                if ((paymentMode == 'ONLINE') && data?.data?.payment_initiate?.id) {
                    const options = {
                        key: '',
                        name: "E COM",
                        description: "Test Card: 5105 1051 0510 5100",
                        order_id: data?.data?.payment_initiate?.id,
                        handler: async (response, error) => {
                            try {
                                const paymentId = response.razorpay_payment_id;
                                let data2 = {
                                    orderid: data?.data?.orderid,
                                    paymentid: paymentId
                                }
                                const captureResponse = await capture(data2)
                                const successObj = captureResponse?.data?.data;
                                const captured = successObj.captured;
                                if (captured) {
                                    props.auth();
                                    setOrderStatus('success');

                                }
                            } catch (err) {
                                setOrderStatus('falied');
                            }
                        },
                        theme: {
                            color: "#ff9f00",
                            backgroundColor: "#ff9f00"
                        },
                    };
                    const rzp1 = new window.Razorpay(options);

                    rzp1.open();
                    rzp1.on('payment.failed', function (response) {
                        setOrderStatus('failed');
                    });
                } else {
                    setOrderStatus('success');
                    props.auth();
                }
            } else {
                console.log('some thing went wrong');
            }
        }
    }

    const updatePaymentMode = (mode) => {
        setPaymentMode(mode);
    }
    const selectedAddess = (address) => {
        setaddress(address);
    }
    return <>
        {(orderStatus != 'pending') ?
            (orderStatus == 'failed') ?
                <div>
                    <Failed order={order} retryPayment={() => setOrderStatus('pending')} />
                </div>
                :
                <div>
                    <ThankYou order={order} />
                </div>
            :
            <div className="cart_container">
                <div className="text-center">
                    <ul className="progressbar mt-4">
                        <li className="active" onClick={() => handleButton('Confirm')}>Products</li>
                        <li className={page === 'Confirm' ? '' : 'active'} onClick={() => { if (Object.values(props.cartList).length) handleButton('Payment') }}>Address</li>
                        <li >Payment</li>
                    </ul>
                </div>
                <div className="row">
                    {props.cartLoading && Object.values(props.cartList).length === 0 ?
                        <>
                            <div className="col-xl-8 col-md-8 col-sm-12 mt-5">
                                <div className="order_wrapper">
                                    <div className="row">
                                        <span className="prod-img skeleton-loader"></span>
                                        <div className="details">
                                            <span className="prod-name skeleton-loader"></span>
                                            <span className="prod-description skeleton-loader"></span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <span className="prod-img skeleton-loader"></span>
                                        <div className="details">
                                            <span className="prod-name skeleton-loader"></span>
                                            <span className="prod-description skeleton-loader"></span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <span className="prod-img skeleton-loader"></span>
                                        <div className="details">
                                            <span className="prod-name skeleton-loader"></span>
                                            <span className="prod-description skeleton-loader"></span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <span className="prod-img skeleton-loader"></span>
                                        <div className="details">
                                            <span className="prod-name skeleton-loader"></span>
                                            <span className="prod-description skeleton-loader"></span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <span className="prod-img skeleton-loader"></span>
                                        <div className="details">
                                            <span className="prod-name skeleton-loader"></span>
                                            <span className="prod-description skeleton-loader"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-md-4 col-sm-12  mt-5">
                                <div className="order_wrapper">
                                    <div className="row ">
                                        <div className="details w-100">
                                            <span className="prod-name skeleton-loader w-100"></span>
                                            <span className="prod-description skeleton-loader"></span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="details w-100">
                                            <span className="prod-name skeleton-loader"></span>
                                            <span className="prod-description skeleton-loader"></span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="details w-100">
                                            <span className="prod-name skeleton-loader"></span>
                                            <span className="prod-description skeleton-loader"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                        :
                        Object.values(props.cartList).length == 0 ?
                            <div className="text-center w-100 mt-5">
                                <img src="http://sripriyasilks.com/images/empty-cart.png" />
                                <div className="mt-3">
                                    <button className="btn" disabled={!address} style={{ padding: '5px 25px' }} onClick={() => props.history.push('/')}>Continue Shopping</button>
                                </div>
                            </div>
                            :
                            <>
                                <div className="col-xl-8 col-md-12">
                                    {page == 'Confirm' ?
                                        <Products /> :
                                        <Address selectedAddess={selectedAddess} updatePaymentMode={updatePaymentMode} />
                                    }
                                </div>
                                <div className="col-xl-4 mb-5 col-md-12">
                                    <div>
                                        <div className="subtotal cf">
                                            <ul className="row">
                                                <div className="col-7">
                                                    <span className="label">Subtotal</span>
                                                </div>
                                                <div className="col-5">
                                                    <span className="value">{'₹'} {total_amount()}</span>
                                                </div>
                                                <div className="col-7">
                                                    <span className="label">Shipping</span>
                                                </div>
                                                <div className="col-5">
                                                    <span className="value">{'₹'} 5.00</span>
                                                </div>
                                                <div className="col-7">
                                                    <span className="label">Total</span>
                                                </div>
                                                <div className="col-5">
                                                    <span className="value">{'₹'} {(total_amount() + 5)}</span>
                                                </div>
                                                <li className="checkout_next_address"><a href="#" className="btn continue" onClick={() => handleMainButton()}>{page}</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                            </>
                    }
                </div>
            </div>

        }
    </>
}

const mapStateToProps = state => ({
    user: state.user.user,
    cartList: state.user.cartList,
    cartLoading: state.user.cartLoading,
    items_list: state.home.items_list,
    items_list_loading: state.home.items_list_loading,
    error: state.home.error
});

const mapDispatchToProps = dispatch => ({
    getItemsList: data => dispatch(getItemsList(data)),
    auth: data => dispatch(auth())
});
export default compose(
    withAlert(),
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(Cart);