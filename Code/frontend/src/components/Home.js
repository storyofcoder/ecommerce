import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withAlert } from "react-alert";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { getItemsList } from "../redux/home/Action";
import Dashboard from "./pages/dashboard/Dashboard";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import Auth from "./login/Login";
import ProductListing from "./pages/productListing/ProductListing"
import ProductDescription from "./pages/productDescription/ProductDescription";
import Wishlist from "./pages/wishlist/Wishlist";
import Cart from "./pages/cart/Cart";
import { auth, getWishList, getCart } from "../redux/user/Action";
import OrderDetails from "./pages/orderDetails/OrderDetails";
import PageLoader from "./common/loader/PageLoader";
import { getMenuList } from "../redux/dashboard/Action";
import { trackPage } from '../tracking/track';
import ReactGA from "react-ga";
import config from "../constants/config";

function Home(props) {
  const [lastPathname, setLastPathname] = useState('/');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    ReactGA.initialize(config.Google_anylatic);
    props.getMenuList();
    if (localStorage.getItem('accessToken'))
      props.auth();

    setTimeout(() => {
      setIsLoaded(true);
    }, 2000)
  }, [])

  useEffect(() => {
    if (props.user) {
      props.getWishList();
      props.getCart();
    }
  }, [props.user])

  useEffect(() => {
    if (lastPathname !== props?.history?.location?.pathname) {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    };
    ReactGA.pageview(props?.history?.location?.pathname + props?.history?.location?.search);
  }, [props?.history?.location?.pathname]);

  return <>
    {isLoaded == false ?
      <PageLoader text={true}/>

      :
      <>
        <Auth />
        <Header />
        <div className="main_container">
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/pl" component={ProductListing} />
            <Route exact path="/p/:id" component={ProductDescription} />
            <Route exact path="/wishlist" component={Wishlist} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/order-history" component={OrderDetails} />
            <Route component={Dashboard} />
          </Switch>
        </div>
        <Footer />
      </>
    }
  </>
}

const mapStateToProps = state => ({
  user: state.user.user,
  items_list: state.home.items_list,
  items_list_loading: state.home.items_list_loading,
  error: state.home.error
});

const mapDispatchToProps = dispatch => ({
  auth: data => dispatch(auth(data)),
  getMenuList: data => dispatch(getMenuList(data)),
  getWishList: data => dispatch(getWishList(data)),
  getCart: data => dispatch(getCart(data))
});
export default compose(
  withAlert(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(withRouter(Home));