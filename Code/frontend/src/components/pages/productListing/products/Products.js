// <-------------------------- Import Packages ----------------------->
import React, { useEffect, useState, useRef, useCallback } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withAlert } from "react-alert";
import { LazyLoadComponent } from "react-lazy-load-image-component";

// <-------------------------- Import Methods ----------------------->
import { getOffersList } from "../../../../redux/dashboard/Action";
import ProductCard from "../../../common/productCard/ProductCard";
import { getProductList } from "../../../../apis/post/Index";
import { withRouter } from "react-router";

function Products(props) {

    const [isLoding, setIsLoding] = useState(false);
    const [page, setPage] = useState(-1);
    const [productsList, setProductsList] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef();

    const lastElement = useCallback((node) => {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (!isLoding && hasMore && entries[0].isIntersecting) {
                getProducts(page + 1);
            }
        })
        if (node) observer.current.observe(node);
    }, [isLoding, true])

    useEffect(() => {
        getProducts(0, true);
    }, [props.sortBy, props.history.location.search])

    const getProducts = (page) => {
        if (isLoding || (page && !hasMore)) return;
        let from = new URLSearchParams(props.history.location.search).get('from');
        let key = new URLSearchParams(props.history.location.search).get('key');
        let key2 = new URLSearchParams(props.history.location.search).get('key2');
        setIsLoding(true);
        setPage(page);
        if (page == 0) {
            window.scrollTo({
                top: 80,
                behavior: "smooth"
            });
            setProductsList([]);
        }
        setIsLoding(true);
        let data = {
            page,
            sortBy: props.sortBy,
            from,
            key,
            key2
        }
        getProductList(data).then(response => {
            if (page == 0) {
                setProductsList(response.data.data);
            }
            else setProductsList([...productsList, ...response.data.data]);
            let currentTotal = 30 * (page + 1);
            setHasMore(response.data.count > currentTotal ? true : false)
        }).catch(e => {

        }).finally(f => {
            setIsLoding(false);
        });

    }

    return <>
        <div className="each_category_container">
            <div className="row mt-2 pl-3 pr-3">
                {
                    <>
                        {productsList.map((item, key) => {
                            return <LazyLoadComponent>
                                < ProductCard {...item} refValue={lastElement} isRef={((key + 1) == productsList.length) ? true : false} />
                            </LazyLoadComponent>
                        })}
                        {isLoding == true &&
                            [1, 2, 3, 4].map((item, key) => {
                                return <LazyLoadComponent>
                                    < ProductCard isLoading={true} />
                                </LazyLoadComponent>

                            })
                        }

                    </>

                }

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
)(withRouter(Products));