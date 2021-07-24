// <-------------------------- Import Packages ----------------------->
import React, { useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withAlert } from "react-alert";

// <-------------------------- Import Components ----------------------->
import MenuList from "../../common/menuList/MenuList";

// <-------------------------- Import Methods ----------------------->
import { getItemsList } from "../../../redux/home/Action";
import { auth } from "../../../redux/user/Action";
import ProductCard from "../../common/productCard/ProductCard";
import Products from "./Products";
import { addAddress, updateAddress } from "../../../apis/post/Index"

class Address extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            new_address: {},
            update: null,
            add_address: props?.user?.delivery_address?.length == 0 ? 1 : 0,
            selected_address: props?.user?.delivery_address?.length > 0 ? 0 : null,
            payment_mode: 'ONLINE',
            delivery_address: props?.user?.delivery_address || [],
            addAddressLoading: false
        };
    }

    componentDidMount = () => {
        if (this.props?.user?.delivery_address?.length)
            this.props.selectedAddess(this.props?.user?.delivery_address[0]);
    }

    updateData = (key, value) => {
        let address = this.state.new_address;
        address[key] = value;
        this.setState({ new_address: address, update: Math.random() });
    }

    addNewAddress = () => {
        const { firstName, lastName, address, number, state, country } = this.state.new_address;
        if (!firstName || !lastName || !address || !number || !state || !country) {
            this.props.alert.show('Fill all the required details.', {
                timeout: 5000,
                type: "error"
            });
            return;
        }
        let data = {
            default: true,
            address: this.state.new_address
        }
        this.setState({ addAddressLoading: true });
        addAddress(data)
            .then(data => {
                this.props.auth();
                this.props.alert.show('Address added successfully', {
                    timeout: 5000,
                    type: "success"
                });
                this.setState({ add_address: 0 });
            }).catch(error => {
                this.props.alert.show(error?.response?.data?.message, {
                    timeout: 5000,
                    type: "error"
                });
            }).finally(f => {
                this.setState({ addAddressLoading: false });
            })
    }

    deleteAddress = (index) => {
        let data = {
            update: false,
            index
        }
        let _delivery_address = this.state.delivery_address;
        _delivery_address[index].loading = true;
        this.setState({ delivery_address: _delivery_address });
        updateAddress(data)
            .then(data => {
                this.props.auth();
                this.props.alert.show('Address updated successfully', {
                    timeout: 5000,
                    type: "success"
                });
                this.setState({ add_address: 0 });
            }).catch(error => {
                this.props.alert.show(error?.response?.data?.message, {
                    timeout: 5000,
                    type: "error"
                });
            }).finally(f => {

            })
    }

    updatePaymentMode = (mode) => {
        this.setState({ payment_mode: mode });
        this.props.updatePaymentMode(mode);
    }

    componentDidUpdate = (props) => {
        if (this.state.delivery_address.length !== props?.user?.delivery_address?.length) {
            this.setState({ delivery_address: props?.user?.delivery_address });
        }
    }

    render() {
        let { new_address, add_address, selected_address, payment_mode, addAddressLoading } = this.state;
        let { user } = this.props;
        let delivery_address = this.state.delivery_address || [];
        return <>
            <div className="row mt-5">
                <div className="col-md-12 order-md-1">
                    <div>
                        <h4 className="mb-3">Choose Payment Mode</h4>
                    </div>
                    <div className="row text-center">
                        <div className="col-6 col-md-6 col-sm-12" onClick={() => this.updatePaymentMode('COD')}>
                            <div style={{ color: payment_mode == 'COD' ? '#ff9f00' : '' }} className={`address_card ${payment_mode == 'COD' ? 'address_card_active' : ''}`}>
                                COD
                            </div>
                        </div>
                        <div className="col-6 col-md-6 col-sm-12" onClick={() => this.updatePaymentMode('ONLINE')}>
                            <div style={{ color: payment_mode == 'ONLINE' ? '#ff9f00' : '' }} className={`address_card ${payment_mode == 'ONLINE' ? 'address_card_active' : ''}`}>
                                Online
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 order-md-1">
                    <div>
                        <h4 className="mb-3">Shipping Address
                            <div className="float-right">
                                {/* <button type="button" class=" btn-danger btn-circle btn-xl float-right"><i class="fa fa-plus"></i>
                    </button> */}
                                <button className="btn hover_none" onClick={() => this.setState({ add_address: add_address ^ 1 })}>{add_address ? 'Hide' : 'Add'}</button>
                            </div>

                        </h4>

                    </div>
                    {(add_address == 1) &&
                        <div className="mt-3">
                            <form className="needs-validation">
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label id="address_firstName">First name</label>
                                        <input type="text" className="form-control" value={new_address.firstName} onChange={(e) => this.updateData('firstName', e.target.value)} id="firstName" placeholder="" />
                                        <div className="invalid-feedback">
                                            Valid first name is required.
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label id="address_lastName">Last name</label>
                                        <input type="text" className="form-control" id="lastName" value={new_address.lastName} onChange={e => { this.updateData('lastName', e.target.value) }} placeholder="" required />
                                        <div className="invalid-feedback">
                                            Valid last name is required.
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label id="address_address">Address</label>
                                        <input type="text" className="form-control" id="address" value={new_address.address} onChange={e => { this.updateData('address', e.target.value) }} placeholder="1234 Main St" required />
                                        <div className="invalid-feedback">
                                            Please enter your shipping address.
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label id="address_username">Phone Number</label>
                                        <div className="input-group">

                                            <input type="number" className="form-control" value={new_address.number} onChange={(e) => this.updateData('number', e.target.value)} id="username" placeholder="9998889998" required />
                                            <div className="invalid-feedback">
                                                Your username is required.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-5 mb-3">
                                        <label id="address_country">Country</label>
                                        <select className="custom-select d-block w-100" value={new_address.country} onChange={(e) => this.updateData('country', e.target.value)} id="country" required>
                                            <option  >Choose...</option>
                                            <option>United States</option>
                                            <option>India</option>
                                        </select>
                                        <div className="invalid-feedback">
                                            Please select a valid country.
                                        </div>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label id="address_state">State</label>
                                        <input type="text" className="form-control" value={new_address.state} onChange={(e) => this.updateData('state', e.target.value)} id="username" required />
                                        <div className="invalid-feedback">
                                            Please provide a valid state.
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label id="address_zip">Zip</label>
                                        <input type="text" className="form-control" value={new_address.zip} onChange={(e) => this.updateData('zip', e.target.value)} id="zip" placeholder="" required />
                                        <div className="invalid-feedback">
                                            Zip code required.
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <button className="btn w-100 wishlist_cart_btn" disabled={addAddressLoading} onClick={() => { this.addNewAddress() }}>
                                        Save Address</button>
                                </div>

                            </form>

                        </div>
                    }
                    <div>
                        {delivery_address.map((value, index) => {
                            return <div className={`address_card ${selected_address == index ? 'address_card_active' : ''}`}>
                                <div className="row w-100" onClick={() => { this.props.selectedAddess(delivery_address[index]); this.setState({ selected_address: index }) }}>
                                    <div className="col-11">
                                        <div className="address_value">{value.firstName} {value.lastName}

                                        </div>
                                        <div className="address_value_subvalue">{value.address}</div>
                                        <div className="address_value_subvalue"> {value.state}, {value.country}, {value.pincode}</div>
                                        <div>
                                            <span>Mobile: </span><span className="address_value">{value.number}</span>
                                        </div>
                                    </div>
                                    <div className="col-1">
                                        {value.loading ?
                                            <span className="circle_loader f_right rotate"></span> :
                                            <span><i class="address_delete text-danger fa fa-trash" aria-hidden="true" onClick={() => { this.deleteAddress(index) }}></i></span>
                                        }

                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </>
    }
}

const mapStateToProps = state => ({
    user: state.user.user,
    items_list: state.home.items_list,
    items_list_loading: state.home.items_list_loading,
    error: state.home.error
});

const mapDispatchToProps = dispatch => ({
    auth: data => dispatch(auth(data)),
    getItemsList: data => dispatch(getItemsList(data)),
});
export default compose(
    withAlert(),
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(Address);