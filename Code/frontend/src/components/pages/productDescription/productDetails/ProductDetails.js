// <-------------------------- Import Packages ----------------------->
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withAlert } from "react-alert";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

// <-------------------------- Import Methods ----------------------->
import { getOffersList } from "../../../../redux/dashboard/Action";
import { setAuthDialog } from "../../../../redux/header/Action";
import { getWishList, getCart, modifyWishlist } from "../../../../redux/user/Action"
import ImageMagnify from "./ImageMagnify";
import { addWishlist, deleteWishlist, addCart } from "../../../../apis/post/Index";
import { withRouter } from "react-router";
import PageLoader from "../../../common/loader/PageLoader";
import { addItemInCookies } from "../../../utils/utils";

function ProductDetails(props) {

    const [magnifyImage, setMagnifyImage] = useState('');
    const [intervalStatus, setIntervalStatus] = useState(true);
    const [size, setSize] = useState('');
    const images = props?.images || [];
    const [oldpath, setOldpath] = useState('');

    useEffect(() => {
        if (props.asin) {
            addItemInCookies(props?.match?.params?.id);
            setOldpath(props?.match?.params?.id);
            setMagnifyImage(props.total_images ? props?.images[0] : '');
        }
    }, [props.asin])

    useEffect(() => {
        let id;
        if (props.total_images && intervalStatus) {
            let index = 0;
            id = setInterval(() => {
                setMagnifyImage((props?.images[(index + 1) % (props.total_images)]));
                index++;
            }, 4000);
            setTimeout(() => {
                clearInterval(id);
            }, 35000);
        } else {
            clearInterval(id);
        }
        return () => {
            clearInterval(id);
        }
    }, [props.total_images, intervalStatus]);

    if (!magnifyImage && props.total_images) {
        setMagnifyImage(props?.images[0]);
    }
    if (!size && props.cartList[props.asin]?.selected_size) {
        setSize(props.cartList[props.asin].selected_size || '');
    }

    const cartItem = () => {
        if ((props?.tags?.join(', ').includes('Cloth')) && !size) {
            props.alert.show('Please Select Size', {
                timeout: 5000,
                type: "error"
            });
            return;
        }

        if (props.cartList[props.asin]) props.history.push('/cart')
        if (!props.user) {
            props.setAuthDialog(true);
            return;
        } else {
            let data = {
                id: props.asin,
                quantity: 1,
                size: size
            }
            addCart(data).then(data => {
                handleDeleteWishlist(false);
                props.getCart();
            }).catch(error => {
                props.alert.show(error?.response?.data?.message, {
                    timeout: 5000,
                    type: "error"
                });
            }).finally(f => {

            })
        }
    }

    const wishListItem = () => {
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

    const handleDeleteWishlist = (check) => {
        let data = {
            id: props.asin
        }
        props.modifyWishlist({ id: props.asin, type: 'remove' });
        deleteWishlist(data).then(data => {
            props.getWishList();
        }).catch(error => {
            if (check != false)
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

    return <>
        {props.isLoading
            ?
            <div style={{ minHeight: '80vh' }}>
                <PageLoader />
            </div>

            :
            <div>
                <div className="breadcrum_text"><span onClick={()=>props.history.push('/')}>Home</span> › Clothing › {props?.title} </div>
                <div className="row">
                    <div className="product_des_web col-xl-6 col-md-12 row">
                        <div className="col-2">
                            {
                                images.map((value, index) => {
                                    return <div
                                        className="pd_sm_image"
                                        style={magnifyImage == value ? { boxShadow: '0 0 2px 1px #FF9F00' } : {}}
                                        onClick={() => { setIntervalStatus(false); setMagnifyImage(value) }}
                                    ><img height="100" src={value} /></div>
                                })
                            }
                        </div>
                        <div className="col-10 text-center" style={{ height: '500px' }}>
                            <ImageMagnify image={magnifyImage} />
                        </div>
                    </div>
                    <div className="product_des_mobile col-xl-6 col-md-12 row">
                        <OwlCarousel items={1}
                            className="owl-theme"
                            loop={true}
                            touchDrag={true}
                            lazyLoad={true}
                            lazyContent={true}
                            autoplay={true}
                            autoplayHoverPause={true}
                            dots={true}
                            nav={false}
                            margin={8}
                        >
                            {images.map((value, index) => {
                                return <div key={`dashboard_banner_${index}`}>
                                    <img className="item" src={value} />
                                </div>
                            })
                            }

                        </OwlCarousel>
                    </div>
                    <div className="col-xl-6 col-md-12">

                        <div className="p_brand">{props?.product_information?.brand}</div>
                        <div className="p_title">{props?.title}</div>
                        <div>
                            <span className="Stars" style={{ ['--rating']: props?.reviews?.rating }} aria-label="Rating of this product is 2.3 out of 5."></span>
                            <span className="p_rating_count"> | {props?.reviews?.total_reviews} Reviews</span>
                        </div>
                        <div className="mt-4">
                            <span className="p_current_price">{props?.price?.symbol}{props?.price?.current_price}</span>
                            <span className="p_real_price">{props?.price?.symbol}{props?.price?.before_price}</span>
                            <span className="p_price_off">({props?.price?.savings_percent}% OFF)</span>
                        </div>
                        <div className="p_tax_tc">Inclusive of all taxes</div>
                        {props?.tags?.join(', ').includes('Cloth') &&
                            <div className="mt-4">
                                <h4><div className="p_select_size">SELECT SIZE</div></h4>
                                <div>
                                    <button className={`p_size_btn ${size == 'x' ? 'p_size_btn_active' : ''}`} onClick={() => setSize('x')}>X</button>
                                    <button className={`p_size_btn ${size == 'xl' ? 'p_size_btn_active' : ''}`} onClick={() => setSize('xl')}>XL</button>
                                    <button className={`p_size_btn ${size == 'xll' ? 'p_size_btn_active' : ''}`} onClick={() => setSize('xll')}>XLL</button>
                                    <button className={`p_size_btn ${size == 'xlll' ? 'p_size_btn_active' : ''}`} onClick={() => setSize('xlll')}>XLLL</button>
                                </div>
                            </div>
                        }

                        <div className="row mt-5 product_action_buttons">
                            <div className="col-xl-4 col-md-6 col-sm-6">
                                <button className="p_add_cart" onClick={cartItem}>{props.cartList[props.asin] ? 'Open Cart' : 'ADD To Cart'}</button>
                            </div>
                            <div className="col-xl-4 col-md-6 ">
                                <button className={`p_add_wishlist ${props.wishlistObj[props.asin] ? 'p_size_btn_active' : ''}`} onClick={wishListItem}>
                                    <svg xmlns="http://www.w3.org/2000/svg" style={{ position: 'relative', top: '-3.5px', right: '10px' }} width="22" height="22" viewBox="0 0 20 16"><path d="M8.695 16.682C4.06 12.382 1 9.536 1 6.065 1 3.219 3.178 1 5.95 1c1.566 0 3.069.746 4.05 1.915C10.981 1.745 12.484 1 14.05 1 16.822 1 19 3.22 19 6.065c0 3.471-3.06 6.316-7.695 10.617L10 17.897l-1.305-1.215z" fill={props.wishlistObj[props.asin] ? "#FF9F00" : "lightgrey"} className="eX72wL" stroke="#FFF" fill-rule="evenodd" opacity=".9"></path></svg>
                                    WISHLIST</button>
                            </div>
                        </div>
                        <div className="mt-5">
                            <div className="p_details_title">PRODUCT DETAILS</div>
                            <div>
                                {props?.feature_bullets?.map((value) => {
                                    return <div className="pdp-product-description-content">{value ? value.includes(': ') ? <span><b>{value.split(': ')[0]}:</b> {value.split(': ')[1]}</span> : value : ''}</div>
                                })
                                }
                            </div>
                            {props?.description &&
                                <div className="mt-5" style={{ maxWidth: '700px' }}>
                                    <div className="p_details_title"><b>Description</b></div>
                                    <div>
                                        {props?.description}
                                    </div>
                                </div>
                            }

                        </div>
                    </div>
                </div>
            </div>
        }
    </>
}

const mapStateToProps = state => ({
    user: state.user.user,
    offers_list: state.dashboard.offers_list,
    offers_list_loading: state.dashboard.offers_list_loading,
    wishlist: state.user.wishlist,
    wishlistObj: state.user.wishlistObj,
    cartList: state.user.cartList,
    error: state.home.error
});

const mapDispatchToProps = dispatch => ({
    getOffersList: data => dispatch(getOffersList(data)),
    setAuthDialog: data => dispatch(setAuthDialog(data)),
    getWishList: data => dispatch(getWishList(data)),
    getCart: data => dispatch(getCart(data)),
    modifyWishlist: data => dispatch(modifyWishlist(data)),
});

export default compose(
    withAlert(),
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(withRouter(ProductDetails));