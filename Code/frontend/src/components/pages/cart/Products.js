// <-------------------------- Import Packages ----------------------->
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withAlert } from "react-alert";

// <-------------------------- Import Components ----------------------->
import MenuList from "../../common/menuList/MenuList";

// <-------------------------- Import Methods ----------------------->
import { getItemsList } from "../../../redux/home/Action";
import ProductCard from "../../common/productCard/ProductCard";
import { getWishList, getCart } from "../../../redux/user/Action"
import { addCart } from "../../../apis/post/Index";

function Products(props) {

    const [cartlist, setCartlist] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (Object.keys(props?.cartList).length && !loading) {
            setLoading(true);
        }
        if (Object.keys(props?.cartList).length) {
            setCartlist(props?.cartList);
        }
    }, [props?.cartList])

    const handleAddCart = (asin, quantity, size) => {
        if (size === 0) deleteItemInstant(asin);
        let data = {
            id: asin,
            quantity: quantity,
            size
        }
        addCart(data).then(data => {
            props.getCart();
        }).catch(error => {
            props.alert.show(error?.response?.data?.message, {
                timeout: 5000,
                type: "error"
            });
        }).finally(f => {

        })
    }

    const deleteItemInstant = (asin) => {
        let _cartlist = { ...cartlist };

        delete _cartlist[asin]
        handleAddCart(asin, 0);
        setCartlist(_cartlist);
    }

    const updateCart = (value, asin) => {
        let _cartlist = { ...cartlist };

        _cartlist[asin].quantity = value;
        if (value) handleAddCart(asin, value, _cartlist[asin].size)
        setCartlist(_cartlist);
    }

    return <>
        <div className="row">
            <div className="col-12">
                <div className="wrap cf">
                    <div className="cart">
                        <ul className="cartWrap">
                            {Object.values(cartlist)?.map((value, index) => {
                                return <li key={`cart_list_${index}`} className="items odd">
                                    <div className="infoWrap">
                                        <div className="cartSection">
                                            <img src={value.main_image} alt={value.title} height="150" className="itemImg" />
                                            <p className="itemNumber"># {value?.product_information?.brand}</p>
                                            <h3>{value.title}</h3>
                                            <p> <input id={`cart_list_id_${index}`} type="text" value={value.quantity} onChange={(e) => updateCart(e.target.value, value.asin)} className="qty" placeholder="3" /> x {value?.price?.symbol} {value?.price?.current_price}</p>
                                            <p className="stockStatus"> In Stock</p>
                                        </div>
                                        <div className="prodTotal cartSection">
                                            <p>{value?.price?.symbol}{value?.price?.current_price * (value.quantity || 1)}</p>
                                        </div>
                                        <div className="cartSection removeWrap" onClick={() => deleteItemInstant(value.asin)}>
                                            <a href="#" className="remove">x</a>
                                        </div>
                                    </div>
                                </li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </>
}

const mapStateToProps = state => ({
    cartList: state.user.cartList,
    items_list: state.home.items_list,
    items_list_loading: state.home.items_list_loading,
    error: state.home.error
});

const mapDispatchToProps = dispatch => ({
    getItemsList: data => dispatch(getItemsList(data)),
    getCart: data => dispatch(getCart(data)),
});
export default compose(
    withAlert(),
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(Products);