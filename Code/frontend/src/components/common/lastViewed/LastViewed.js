// <-------------------------- Import Packages ----------------------->
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withAlert } from "react-alert";

// <-------------------------- Import Methods ----------------------->
import ProductCard from "../productCard/ProductCard";
import { getViewedProducts } from "../../../apis/post/Index";
import { withRouter } from "react-router";
import { getItemInCookies } from "../../utils/utils";

function LastViewed(props) {
    const [productList, setProductList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false)
    useEffect(() => {
        if (props?.history?.location?.pathname) {
            let id = props?.history?.location?.pathname.split('/');
            let value = getItemInCookies(id.length ? id[id.length - 1] : "");
            getViewedProducts({ items: value }).then(data => {
                setProductList(data?.data?.data)
            })
        }

    }, [props?.history?.location?.pathname]);

    return <>
        {productList.length > 0 &&
            <div>
                <div className="row d-flex justify-content-between mt-4" style={{ padding: '10px 17px 0px' }}>
                    <div className="deals_title"><span className="product_listing_count_title" style={{ fontSize: '20px' }}>Your browsing history</span> </div>
                </div>
                <div className="each_category_container">
                    <div className="row mt-2 pl-3 pr-3">
                        {
                            productList.map((item, key) => {
                                return < ProductCard {...item} />
                            })
                        }
                    </div>
                </div>
            </div>
        }
    </>
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});
export default compose(
    withAlert(),
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(withRouter(LastViewed));