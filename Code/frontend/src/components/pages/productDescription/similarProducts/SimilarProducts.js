// <-------------------------- Import Packages ----------------------->
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withAlert } from "react-alert";

// <-------------------------- Import Methods ----------------------->
import { getOffersList } from "../../../../redux/dashboard/Action";
import ProductCard from "../../../common/productCard/ProductCard";
import { getProductList } from "../../../../apis/post/Index";
import { withRouter } from "react-router";

function SimilarProducts(props) {
    const [productList, setProductList] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        if (props.asin) {
            setIsLoading(true);
            let data = {
                page: 0,
                limit: 12,
                from: 'related',
                key: props.product_information?.brand,
                key2: props?.tags.join(',')
            }
            getProductList(data)
                .then(data => {
                    setProductList(data?.data?.data || []);
                }).catch(error => {
                    props.alert.show(error?.response?.data?.message, {
                        timeout: 5000,
                        type: "error"
                    });
                }).finally(f => {
                    setIsLoading(false);
                })
        }
    }, [props.asin]);

    return <>
        <div>
            <div className="row d-flex justify-content-between" style={{ padding: '10px 17px 0px' }}>
                <div className="deals_title"><span className="product_listing_count_title" style={{ fontSize: '20px' }}>Similar Products</span> </div>
                <div>
                    <button className=" deals_view_all_btn" onClick={() => { props.history.push(`/pl?from=related${props.product_information?.brand ? `&key=${props.product_information?.brand.replace('&', '.')}` : ''}${props?.tags?.length ? `&key2=${props?.tags.map(value => { if (value.includes('&')) return value.replace('&', '.'); else return value; })}` : ''}`) }}>
                        View All
                        </button>
                </div>
            </div>
            <div className="each_category_container">
                <div className="row mt-2 pl-3 pr-3">
                    {isLoading ?
                        [1, 2, 3, 4, 5].map((item, key) => {
                            return < ProductCard {...item} isLoading={true} />

                        })
                        :
                        productList.map((item, key) => {
                            return < ProductCard {...item} />

                        })
                    }

                </div>
            </div>
        </div>

    </>
}

const mapStateToProps = state => ({
    offers_list: state.dashboard.offers_list,
    offers_list_loading: state.dashboard.offers_list_loading,
    error: state.home.error
});

const mapDispatchToProps = dispatch => ({
    getOffersList: data => dispatch(getOffersList(data)),
});
export default compose(
    withAlert(),
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(withRouter(SimilarProducts));