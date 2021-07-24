import React, { useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withAlert } from "react-alert";
// import { getItemsList} from "../redux/home/Action";
import { subscribe } from "../../apis/get/Index";

function Footer(props) {

    const [value, setValue] = useState('');

    const subscribed = () => {
        let _value = value;
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(_value)) {
            props.alert.show('Please enter a valid email.', {
                timeout: 5000,
                type: "error"
            })
            return;
        }
        setValue('');
        subscribe(_value).then(data => {
            props.alert.show("Successfully Subscribed", {
                timeout: 5000,
                type: "success"
            })
        }).catch(error => {
            props.alert.show(error?.response?.data?.message, {
                timeout: 5000,
                type: "error"
            })
        })
    }

    return <>
        <footer className="footer-section mt-5">
            <div className="main_footer">
                <div className="footer-cta pt-5 pb-5">
                    <div className="row">
                        <div className="col-xl-4 col-md-4 mb-30">
                            <div className="single-cta">
                                <i className="fas fa-map-marker-alt"></i>
                                <div className="cta-text">
                                    <h4>Find us</h4>
                                    <span>1010 Avenue, sw 54321, Gurugram, India</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-4 mb-30">
                            <div className="single-cta">
                                <i className="fas fa-phone"></i>
                                <div className="cta-text">
                                    <h4>Call us</h4>
                                    <span>+91 9355242300</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-4 mb-30">
                            <div className="single-cta">
                                <i className="far fa-envelope-open"></i>
                                <div className="cta-text">
                                    <h4>Mail us</h4>
                                    <span>mail@info.com</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-content pt-5 pb-5">
                    <div className="row">
                        <div className="col-xl-4 col-lg-4 mb-50">
                            <div className="footer-widget">
                                <div className="footer-logo">
                                    <a href="index.html"><img height="70" src="https://raw.githubusercontent.com/storyofcoder/extraImages/master/brain.png" alt="logo" /></a>
                                </div>
                                <div className="footer-text">
                                    <p>Lorem ipsum dolor sit amet, consec tetur adipisicing elit, sed do eiusmod tempor incididuntut consec tetur adipisicing
                                        elit,Lorem ipsum dolor sit amet.</p>
                                </div>
                                <div className="footer-social-icon">
                                    <span>Follow us</span>
                                    <a href="#"><i className="fab fa-facebook-f facebook-bg"></i></a>
                                    <a href="#"><i className="fab fa-twitter twitter-bg"></i></a>
                                    <a href="#"><i className="fab fa-google-plus-g google-bg"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
                            <div className="footer-widget">
                                <div className="footer-widget-heading">
                                    <h3>Useful Links</h3>
                                </div>
                                <ul>
                                    <li><a href="#">Home</a></li>
                                    <li><a href="#">about</a></li>
                                    <li><a href="#">services</a></li>
                                    <li><a href="#">portfolio</a></li>
                                    <li><a href="#">Contact</a></li>
                                    <li><a href="#">About us</a></li>
                                    <li><a href="#">Our Services</a></li>
                                    <li><a href="#">Expert Team</a></li>
                                    <li><a href="#">Contact us</a></li>
                                    <li><a href="#">Latest News</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
                            <div className="footer-widget">
                                <div className="footer-widget-heading">
                                    <h3>Subscribe</h3>
                                </div>
                                <div className="footer-text mb-25">
                                    <p>Don’t miss to subscribe to our new feeds, kindly fill the form below.</p>
                                </div>
                                <div className="subscribe-form">
                                    <input value={value} type="text" placeholder="Email Address" onChange={(e) => { setValue(e.target.value) }} />
                                    <button onClick={() => { subscribed() }}><i className="fab fa-telegram-plane"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright-area">
                <div style={{ padding: '0 5%' }}>
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 text-center text-lg-left">
                            <div className="copyright-text">
                                <p>Copyright &copy; 2021, All Right Reserved E Com</p>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 d-none d-lg-block text-right">
                            <div>
                                <img src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/payment-method_69e7ec.svg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </>
}

const mapStateToProps = state => ({
    items_list: state.home.items_list,
    items_list_loading: state.home.items_list_loading,
    error: state.home.error
});

const mapDispatchToProps = dispatch => ({
    //   getItemsList: data => dispatch(getItemsList(data)),
});
export default compose(
    withAlert(),
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(Footer);