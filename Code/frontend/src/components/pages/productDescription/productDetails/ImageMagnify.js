// <-------------------------- Import Packages ----------------------->
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withAlert } from "react-alert";

// <-------------------------- Import Methods ----------------------->
import { getOffersList } from "../../../../redux/dashboard/Action";
import ReactImageMagnify from 'react-image-magnify';

function ImageMagnify(props) {
    const imageProps = {
        smallImage: {
            alt: 'Phasellus laoreet',
            //   isFluidWidth: true,
            src: props.image,
            width: 600,
            height: 700
        },
        largeImage: {
            src: props.image,
            imageClassName: 'text-center',
            width: 1200,
            height: 1400
        },
        enlargedImageContainerStyle: { background: '#fff', zIndex: 9 }
    };

    return <>
        <div className="product_image_magnify text-center">
            <ReactImageMagnify {...imageProps} />

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
)(ImageMagnify);