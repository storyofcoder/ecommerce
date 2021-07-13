// <-------------------------- Import Packages ----------------------->
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withAlert } from "react-alert";

// <-------------------------- Import Methods ----------------------->
// import { getProductList } from "../../../../redux/dashboard/Action";
import ProductCard from "../../../common/productCard/ProductCard";
import { getProductList } from "../../../../apis/post/Index"
import { withRouter } from "react-router";

function EachCategory(props) {

    const [productList, setProductList] = useState([]);
    const [productListLoading, setProductListLoading] = useState(false);

    useEffect(() => {
        setProductListLoading(true);
        let request = {
            limit: 6,
            page: 0,
            sortBy: 'Rating',
            from: 'home',
            key: props.keyword,
        }
        getProductList(request).then(data => {
            if (data?.data?.data) {
                setProductList(data?.data?.data);
            }
        }).catch(error => {
            props.alert.show(error?.response?.data?.message, {
                timeout: 5000,
                type: "error"
            });
        }).finally(f => {
            setProductListLoading(false);
        })
    }, []);
    
    return <>
            <div className="each_category_container">
                <div className="each_category_image">
                    <img style={{ width: '100%', maxHeight: '400px' }} src={props.banner.image} />
                </div>
                <div>
                    <div className="row d-flex justify-content-between each_category_subcontainer">
                        <div className="deals_title">{props.banner.title}</div>
                        <div>
                            <button className=" deals_view_all_btn" onClick={() => { props.history.push(`pl?from=home&key=${props.keyword}`) }}>
                                View All
                        </button>
                        </div>
                    </div>
                    <div className="row mt-2 pl-3 pr-3">
                        {productListLoading ?
                        [1,2,3,4,5].map((product, key) => {
                            return < ProductCard {...product} isLoading={true}/>

                        })
                        :
                        productList?.map((product, key) => {
                            return < ProductCard {...product} />

                        })}
                    </div>

                </div>
            </div>
        
    </>
}

const mapStateToProps = state => ({
    productList: state.dashboard.productList,
    productListLoading: state.dashboard.productListLoading,
    error: state.home.error
});

const mapDispatchToProps = dispatch => ({
});
export default compose(
    withAlert(),
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(withRouter(EachCategory));