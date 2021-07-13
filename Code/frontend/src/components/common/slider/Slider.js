import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const Slider = (props) => {
    return (
        <div>
            {(props?.data?.length > 0) &&
                <div className="mb-3">
                    <OwlCarousel items={1}
                    className="owl-theme"
                    loop={true}
                    touchDrag={true}
                    lazyLoad={true}
                    lazyContent={true}
                    autoplay={true}
                    autoplayHoverPause={true}
                    dots={false}
                    nav={false}
                    margin={8}
                >
                    {props?.data.map((value, index) => {
                        return <div key={`dashboard_banner_${index}`}>
                            <img className="item" src={value.image} />
                        </div>
                    })
                    }

                </OwlCarousel>
                </div>
            }
        </div>
    )
};

export default Slider;