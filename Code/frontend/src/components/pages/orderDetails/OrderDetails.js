// <-------------------------- Import Packages ----------------------->
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withAlert } from "react-alert";
import moment from "moment";

// <-------------------------- Import Components ----------------------->
import MenuList from "../../common/menuList/MenuList";

// <-------------------------- Import Methods ----------------------->
import { getItemsList } from "../../../redux/home/Action";

import { orderHistory } from "../../../apis/post/Index";

function OrderDetails(props) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (props.user)
      setLoading(true)
    orderHistory().then(data => {
      setOrders(data?.data?.data);
    }).catch(error => {
      props.alert.show(error?.response?.data?.message, {
        timeout: 5000,
        type: "error"
      });
    }).finally(f => {
      setLoading(false);
    })
  }, []);

  return <>
    <MenuList />

    <div className="dashboard_container">
      <div>
        <div className="container mt-md-5">
          <h2 className="wishlist_title mb-4">Your Orders</h2>
          <div className="row">
            {loading ?
              <>
                <div className="order_wrapper">
                  <div className="row">
                    <div className="details">
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

                <div className="order_wrapper">
                  <div className="row">
                    <div className="details">
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

              </>
              :
              orders.map(value => {
                return <div className="col-12">
                  <div className="list-group mb-4">
                    <div className="list-group-item p-3 bg-snow" style={{ position: 'relative' }}>
                      <div className="row w-100 no-gutters">
                        <div className="col-xl-3 col-md-4 col-sm-12">
                          <h6 className="text-charcoal mb-0 w-100">Order Number</h6>
                          <a href="" className="text-pebble mb-0 w-100 mb-2 mb-md-0">#{value._id}</a>
                        </div>
                        <div className="col-6 col-md">
                          <h6 className="text-charcoal mb-0 w-100">Date</h6>
                          <p className="text-pebble mb-0 w-100 mb-2 mb-md-0">{moment(value.createdAt).format('MMMM Do YYYY')}</p>
                        </div>
                        <div className="col-6 col-md">
                          <h6 className="text-charcoal mb-0 w-100">Amount</h6>
                          <p className="text-pebble mb-0 w-100 mb-2 mb-md-0">₹ {value?.price?.total}</p>
                        </div>
                        <div className="col-6 col-md">
                          <h6 className="text-charcoal mb-0 w-100">Shipped To</h6>
                          <p className="text-pebble mb-0 w-100 mb-2 mb-md-0">{value.delivery_address.firstName} {value.delivery_address.lastName}</p>
                        </div>
                        <div className="col-6 col-md-3 text-right">
                          <h6 className="text-charcoal mb-0 w-100">Payment Mode</h6>
                          <p className="text-pebble mb-0 w-100 mb-2 mb-md-0">{value.payment_mode}</p>
                        </div>
                      </div>

                    </div>
                    <div className="list-group-item p-3 bg-white">
                      <div className="row no-gutters">
                        <div className="col-12 col-md-9 pr-0 pr-md-3">

                          {moment(new Date()).isSame(moment(value.createdAt), 'day') == true ?
                            <div className="alert p-2 alert-warning w-100 mb-0">
                              <h6 className="text-warning mb-0"><b>Packed</b></h6>
                              <p className="text-warning hidden-sm-down mb-0">Est. delivery between {moment(value.createdAt).add(2, 'days').format('MMMM Do')} - {moment(value.createdAt).add(7, 'days').format('MMMM Do YYYY')}</p>
                            </div>
                            :
                            moment(moment(value.createdAt).add(5, 'days')).isBefore(moment(new Date())) == true ?
                            <div className="alert p-2 alert-success w-100 mb-0">
                              <h6 className="text-green mb-0"><b>Delivered</b></h6>
                              <p className="text-green hidden-sm-down mb-0">Delivered on {moment(value.createdAt).add(5, 'days').format('MMMM Do')}</p>
                            </div>
                            :
                            <div className="alert p-2 alert-info w-100 mb-0">
                              <h6 className="text-info mb-0"><b>Shipped</b></h6>
                              <p className="text-info hidden-sm-down mb-0">Est. delivery between {moment(value.createdAt).add(2, 'days').format('MMMM Do')} - {moment(value.createdAt).add(7, 'days').format('MMMM Do YYYY')}</p>
                            </div>
                          }


                          <div>
                            {value.cart.map(product => {
                              if (product?.product)
                                return <div className="row mt-3 col-12">
                                  <div className="col-3 col-md-2 text-center">
                                    <img className="img-fluid pr-3" style={{ maxHeight: '90px' }} src={product?.product?.main_image} alt="" />
                                  </div>
                                  <div className="col-9 col-md-8 pr-0 pr-md-3">
                                    <h6 className="text-charcoal mb-2 mb-md-1">
                                      <div className="text-pebble" style={{ fontSize: '13px' }}>{product?.product?.product_information?.brand}</div>
                                      <a href="" className="text-charcoal">{product?.product?.title.substring(0, 56) + "..."}</a>
                                    </h6>
                                    <ul className="list-unstyled text-pebble mb-2 small">
                                      <li className="">
                                        <b>Price per unit:</b> {product?.price?.symbol} {product?.price?.current_price}
                                      </li>
                                      <li className="">
                                        <b>Quantity:</b> {product?.quantity}
                                      </li>
                                      {product?.size &&
                                        <li className="">
                                          <b>Size:</b> {product?.size}
                                        </li>
                                      }

                                    </ul>
                                    <h6 className="text-charcoal text-left mb-0 mb-md-2"><b>{product?.price?.symbol} {product?.price?.current_price * product?.quantity}</b></h6>
                                  </div>

                                </div>

                            })}
                          </div>
                        </div>
                        <div className="col-12 col-md-3">
                          <div className="col-12">
                            <div className="pt-5 pt-md-0">
                              <div className="list-group mb-3">
                                <div className="list-group-item p-3 bg-snow">
                                  <h6 className="mb-0">Order Summary</h6>
                                </div>
                                <div className="list-group-item py-2 px-3 bg-white">
                                  <div className="row w-100 no-gutters">
                                    <div className="col-6 text-pebble">
                                      Subtotal
              </div>
                                    <div className="col-6 text-right text-charcoal">
                                      {value?.price?.symbol} {value?.price?.total - 10}
                                    </div>
                                  </div>
                                </div>
                                <div className="list-group-item py-2 px-3 bg-white">
                                  <div className="row w-100 no-gutters">
                                    <div className="col-6 text-pebble">
                                      Sales Tax
              </div>
                                    <div className="col-6 text-right text-charcoal">
                                      {value?.price?.symbol} {0}
                                    </div>
                                  </div>
                                </div>
                                <div className="list-group-item py-2 px-3 bg-white">
                                  <div className="row w-100 no-gutters">
                                    <div className="col-6 text-pebble">
                                      Shipping
              </div>
                                    <div className="col-6 text-right text-charcoal">
                                      {value?.price?.symbol} {5}
                                    </div>
                                  </div>
                                </div>
                                <div className="list-group-item py-2 px-3 bg-snow">
                                  <div className="row w-100 no-gutters">
                                    <div className="col-8 text-charcoal">
                                      <b>Total</b>
                                    </div>
                                    <div className="col-4 text-right text-green">
                                      <b>{value?.price?.symbol} {value?.price?.total}</b>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              })
            }
          </div>
        </div>
      </div>
    </div>
  </>
}

const mapStateToProps = state => ({
  user: state.user.user,
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
)(OrderDetails);