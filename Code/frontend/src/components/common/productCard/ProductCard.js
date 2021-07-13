// <-------------------------- Import Packages ----------------------->
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withAlert } from "react-alert";
import { LazyLoadImage } from 'react-lazy-load-image-component';

// <-------------------------- Import Methods ----------------------->
import { getOffersList } from "../../../redux/dashboard/Action";
import { setAuthDialog } from "../../../redux/header/Action";
import { getWishList, getCart, modifyWishlist } from "../../../redux/user/Action"
import { addWishlist, deleteWishlist, addCart } from "../../../apis/post/Index";
import { withRouter } from "react-router";
import 'react-lazy-load-image-component/src/effects/blur.css';

const ProductCard = (props) => {
    const [isActiveCart, setIsActiveCart] = useState(false);
    const [text, setText] = useState('')
    const handleCart = () => {
        if (!props.user) {
            props.setAuthDialog(true);
            return;
        }

        setIsActiveCart(true);
        setTimeout(() => { setText('Added'); }, 2000);
        if (!props?.cartObj[props?.asin]) {
            handleAddCart();
        } else {
            handleWishlist();
        }
    }

    const handleAddCart = () => {
        let data = {
            id: props.asin,
            quantity: 1
        }
        addCart(data).then(data => {
            handleDeleteWishlist();
            props.getCart();
        }).catch(error => {
            props.alert.show(error?.response?.data?.message, {
                timeout: 5000,
                type: "error"
            });
        }).finally(f => {

        })
    }

    const handleWishlist = () => {
        if (!props.user) {
            props.setAuthDialog(true);
            return;
        }
        if (props?.wishlistObj[props?.asin]) {
            handleDeleteWishlist();
        } else {
            handleAddWishlist();
        }
    };

    const handleDeleteWishlist = () => {
        let data = {
            id: props.asin
        }
        props.modifyWishlist({ id: props.asin, type: 'remove' });
        deleteWishlist(data).then(data => {
            props.getWishList();
        }).catch(error => {
            props.alert.show(error?.response?.data?.message, {
                timeout: 5000,
                type: "error"
            });
        }).finally(f => {
        })
    }

    const handleAddWishlist = () => {
        let data = {
            id: props.asin
        }
        props.modifyWishlist({ id: props.asin, type: 'add' });
        addWishlist(data).then(data => {
            props.getWishList();
        }).catch(error => {
            props.alert.show(error?.response?.data?.message, {
                timeout: 5000,
                type: "error"
            });
        }).finally(f => {
        })
    }

    useEffect(() => {
        return () => {
            setIsActiveCart(false);
            setText('');
        }
    }, [props.wishlist]);

    return (
        props.isLoading ?
            <div className="product_item_card col-lg-2 col-md-4 col-sm-6 p-0" style={{ background: 'transparent' }}>
                <article className="skeleton">
                    <div className="image"></div>
                    <p className="line"></p>
                    <p className="line"></p>
                    <p className="line"></p>
                    <p className="line"></p>
                    <p className="line"></p>
                </article>
            </div>
            :
            <div className="product_item_card col-lg-2 col-md-4 col-sm-6" ref={props.isRef ? props.refValue : null}>
                <div className="_13oc-S">
                    <div data-id="SOPGY9P67ZYV7AFY" >
                        <div className="_4ddWXP">
                            <div className="mt-2" onClick={() => props.history.push(`/p/${props.asin}`)}>
                                <div>
                                    <div className="text-center product_list_card product_image_image">
                                        <LazyLoadImage
                                            effect="blur"
                                            height="200px"
                                            src={props.main_image}
                                        />
                                        {/* <img height="200px" className="product_list_card product_image_image" alt="earthBaby Handmade Neem &amp; Aloe vera soap, for kids 1 year and above 100gm Pack of3" src={props.main_image} /> */}

                                    </div>
                                </div>
                            </div>
                            {props.isWishlist == true ?
                                <div className="wishlist_remove" onClick={handleWishlist}>
                                    <div className="delete_logo">
                                        X
                                        </div>
                                </div>
                                :
                                <div className="wishlist_logo" onClick={handleWishlist}>
                                    <div class={`heart ${props?.wishlistObj[props?.asin] ? 'heart_active' : ''}`}></div>
                                    {/* <div className="_36FSn5"><svg xmlns="http://www.w3.org/2000/svg" className="_1l0elc" width="22"
                                        height="22" viewBox="0 0 20 16">
                                        <path
                                            d="M8.695 16.682C4.06 12.382 1 9.536 1 6.065 1 3.219 3.178 1 5.95 1c1.566 0 3.069.746 4.05 1.915C10.981 1.745 12.484 1 14.05 1 16.822 1 19 3.22 19 6.065c0 3.471-3.06 6.316-7.695 10.617L10 17.897l-1.305-1.215z"
                                            fill={props?.wishlist[props?.asin] ? '#ff9f00' : "lightgrey"}
                                            className="eX72wL"
                                            stroke="#FFF"
                                            fill-rule="evenodd" opacity=".9">
                                        </path>
                                    </svg></div> */}
                                </div>



                            }
                            <div onClick={() => props.history.push(`/p/${props.asin}`)}>
                                <div className="card_product_title">
                                    {props?.title?.length > 50 ? props?.title.substring(0, 50) + "..." : props?.title}
                                </div>
                                <div className="_25b18c">
                                    <div><span className="Stars" style={{ ['--rating']: props?.reviews?.rating || 3.5 }} aria-label={`Rating of this product is ${props?.reviews?.rating || 3.5} out of 5.`}></span>
                                        <span className="rating_count"> {props?.reviews?.total_reviews || 438}</span></div>
                                    <div className="current_price">{props?.price?.symbol}{props?.price?.current_price}</div>
                                    <div className="product_price">{props?.price?.symbol}{props?.price?.before_price}</div>
                                    <div className="price_off_per"><span>{props?.price?.savings_percent}% off</span></div>
                                </div>
                            </div>



                            {props.isWishlist == true &&
                                <div>
                                    {isActiveCart ?
                                        <button class="add-to-cart added">
                                            <div class="default">Added</div>
                                            <div class="success">{text}</div>
                                            <div class="cart">
                                                <div>
                                                    <div></div>
                                                    <div></div>
                                                </div>
                                            </div>
                                            <div class="dots"></div>
                                        </button>
                                        :
                                        <div class="dedcription-btn" onClick={() => { return handleCart() }}>
                                            <span class="name-descripeion">Add To Cart</span>
                                            <div class="btn-icon brain">
                                                <i class="fa fa-shopping-cart"></i></div>
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

    )
};
const mapStateToProps = state => ({
    user: state.user.user,
    wishlist: state.user.wishlist,
    cartList: state.user.cartList,
    wishlistObj: state.user.wishlistObj,
    cartObj: state.user.cartObj,
    error: state.home.error
});

const mapDispatchToProps = dispatch => ({
    getOffersList: data => dispatch(getOffersList(data)),
    setAuthDialog: data => dispatch(setAuthDialog(data)),
    getWishList: data => dispatch(getWishList(data)),
    getCart: data => dispatch(getCart(data)),
    modifyWishlist: data => dispatch(modifyWishlist(data))
});
export default compose(
    withAlert(),
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(withRouter(ProductCard));
