// <-------------------------- Import Packages ----------------------->
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withAlert } from "react-alert";

// <-------------------------- Import Components ----------------------->
import MenuList from "../../common/menuList/MenuList";
import SortBy from "./sortBy/SortBy";
import SimilarProducts from "./similarProducts/SimilarProducts"

// <-------------------------- Import Methods ----------------------->
import { getItemsList } from "../../../redux/home/Action";
import Offers from "../../common/offers/Offers";
import ProductDetails from "./productDetails/ProductDetails";
import { getProduct } from "../../../apis/get/Index";
import LastViewed from "../../common/lastViewed/LastViewed";

function ProductDescription(props) {

    const [product, setProduct] = useState({});
    const [productLoading, setProductLoading] = useState(true)

    useEffect(() => {
        if(props?.match?.params?.id){
            let request = {
                id: props?.match?.params?.id
            };
            setProductLoading(true);
            getProduct(request)
                .then(data => {
                    setProduct(data?.data?.data);
                }).catch(error => {
                    props.alert.show(error?.response?.data?.message, {
                        timeout: 5000,
                        type: "error"
                    });
                }).finally(f => {
                    setProductLoading(false);
                })
        }
        
    }, [props?.match?.params?.id]);

    return <>
        <MenuList />

        <div className="dashboard_container">
            {/* <Offers /> */}

            <ProductDetails {...product} isLoading={productLoading} />
            <br /><br /><br /><br /><br /><br /><br />
            {!productLoading &&
                <div >
                    <SimilarProducts {...product} />
                </div>
            }
            <LastViewed />
        </div>
    </>
}

const mapStateToProps = state => ({
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
)(ProductDescription);