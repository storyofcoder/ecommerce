import React, { useLayoutEffect, useState, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withAlert } from "react-alert";
import { setAuthDialog } from "../../redux/header/Action";
import { withRouter } from "react-router";
import { searchProduct } from "../../apis/get/Index";

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

function ShowWindowDimensions(props) {
  const [width, height] = useWindowSize();
  return { width, height };
}

function Header(props) {

  const [suggestions, setSuggestions] = useState([]);
  const [search, setSearch] = useState('');
  const [settleDown, setsettleDown] = useState(false)

  useEffect(() => {
    if (search) {
      searchProduct(search).then(result => {
        setSuggestions(result.data.data);
      });
    }
  }, [search])

  useEffect(() => {
    if (props.user && window.innerWidth >= 800) {
      // setsettleDown(true);
      setTimeout(() => {
        const drop_btn = document.querySelector(".drop-btn span");
        const menu_wrapper = document.querySelector(".wrapper");
        const menu_bar = document.querySelector(".menu-bar");
        const setting_drop = document.querySelector(".setting-drop");
        const help_drop = document.querySelector(".help-drop");
        // const setting_item = document.querySelector(".setting-item");
        const help_item = document.querySelector(".help-item");
        const setting_btn = document.querySelector(".back-setting-btn");
        const help_btn = document.querySelector(".back-help-btn");

        drop_btn.onclick = (() => {
          menu_wrapper.classList.toggle("show");
        });

        help_item.onclick = (() => {
          menu_bar.style.marginLeft = "-400px";
          setTimeout(() => {
            help_drop.style.display = "block";
          }, 100);
        });
        setting_btn.onclick = (() => {
          menu_bar.style.marginLeft = "0px";
          // setting_drop.style.display = "none";
        });
        help_btn.onclick = (() => {
          help_drop.style.display = "none";
          menu_bar.style.marginLeft = "0px";
        });
      }, 100)
    }

  }, []);

  const handleLoginDialog = () => {
    props.setAuthDialog(true);
  }

  const handleInput = (value) => {
    setSearch(value);
  }

  useEffect(() => {
    document.addEventListener("click", (data) => {
      // user menu
      let array = ["fas fa-question-circle", "fas fa-arrow-left", "header_other_btn"];
      if ((window.innerWidth >= 800) && props.user && !((data.target.innerText == 'Help & support') || array.includes(data.target.className))) {
        if (document.querySelector(".wrapper").classList.value.includes('show')) {
          document.querySelector(".wrapper").classList.remove("show")
        }
      }
    });
  }, [])

  ShowWindowDimensions();

  return <>
    {window.innerWidth < 800 &&
      <nav className=" main_header navbar navbar-expand-lg navbar-light bg-light">
        <span className="ml-3" onClick={() => props.history.push('/')}>
          <img className="main_header_logo" height="30" src="https://raw.githubusercontent.com/storyofcoder/extraImages/master/brain.png" />
          <span className="main_header_logo_text">E Com</span>
        </span>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="fas fa-bars" style={{ color: '#ff9f00' }}></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="form-inline my-2 my-lg-0">
            <div className="w-100">
              <div className="header_search">
                <input type="text" className="searchTerm search_input" placeholder="What are you looking for?" onChange={(e) => { handleInput(e.target.value) }} />
                <button type="submit" className="searchButton">
                  <i className="fa fa-search"></i>
                </button>
              </div>
              {suggestions && search && suggestions.length > 0 &&
                <div className="header_suggestion">
                  {suggestions.map((value, index) => {
                    return <div className="row search_row" onClick={() => {
                      setSuggestions([]);
                      props.history.push(`/pl?from=related${value?.brand ? `&key=${value?.brand}` : ''}${value.tags ? `&key2=${value?.tags}` : ''}`)
                    }}>
                      <div className="col-2 search_list_item"><img style={{ maxWidth: '40px', maxHeight: '40px' }} src={value.main_image} /></div>
                      <div className="col-10 pt-2 search_list_item">{value.value.substr(0, 25)} {value.value.length > 25 ? "..." : ""}</div>
                    </div>
                  })
                  }
                </div>
              }
            </div>
          </form>

          <ul className="navbar-nav mr-auto">
            <li className="nav-item active" onClick={() => { props.history.push('/order-history') }}>
              <div className="d-flex">
                <div className="icon">
                  <span className="fas fa-shopping-bag"></span>
                </div>
          My Orders
        </div>
            </li>
            <li className="nav-item" onClick={() => { props.history.push('/cart') }}>
              <div className="d-flex">
                <div className="icon">
                  <span className="fas fa-shopping-cart"></span>
                </div>
          My Cart
        </div>
            </li>
            <li className="nav-item" onClick={() => { props.history.push('/wishlist') }}>
              <div className="d-flex">
                <div className="icon">
                  <span className="fas fa-heart"></span>
                </div>
          Wishlist
        </div>
            </li>
            <li className="nav-item" >
              <div>
                <div className="icon">
                  <span className="fas fa-user"></span>

                </div>
          Logout
        </div>
            </li>

          </ul>
        </div>
      </nav>

    }
    {window.innerWidth >= 800 &&
      <header className="main_header" style={{ zoom: '0.9'}}>
        <div className="col-3"> <span onClick={() => props.history.push('/')}>
          <img className="main_header_logo" height="30" src="https://raw.githubusercontent.com/storyofcoder/extraImages/master/brain.png" />
          <span className="main_header_logo_text">E Com</span>
        </span></div>
        <div className="col-6">
          {/* <input className="search_input" /> */}
          <div>
            <div className="header_search">
              <input type="text" className="searchTerm search_input" placeholder="What are you looking for?" onChange={(e) => { handleInput(e.target.value) }} />
              <button type="submit" className="searchButton">
                <span className="fas fa-search"></span>
              </button>
            </div>
            {suggestions && search && suggestions.length > 0 &&
              <div className="header_suggestion">
                {suggestions.map((value, index) => {
                  return <div className="row search_row" onClick={() => {
                    setSuggestions([]);
                    props.history.push(`/pl?from=related${value?.brand ? `&key=${value?.brand}` : ''}${value.tags ? `&key2=${value?.tags}` : ''}`)
                  }}>
                    <div className="col-1"><img style={{ maxWidth: '40px', maxHeight: '40px' }} src={value.main_image} /></div>
                    <div className="col-11 pt-2">{value.value.substr(0, 80)} {value.value.length > 80 ? "..." : ""}</div>
                  </div>
                })
                }
              </div>
            }

          </div>
        </div>
        <div className="col-3 row">
          <div className="col-4 text-right">
            {props?.user ?
              // <button className="header_other_btn">  {props?.user?.firstName || 'User'}
              // </button>
              <nav className="header_menu_bar">
                <div className="drop-btn"><span className="header_other_btn">{props?.user?.firstName || 'User'}</span> </div>
                <div className="wrapper">
                  <ul className="menu-bar">
                    <li onClick={() => { props.history.push('/order-history') }}>
                      <div>
                        <div className="icon">
                          <span className="fas fa-shopping-bag"></span>
                        </div>
          My Orders
        </div>
                    </li>
                    <li className="help-item">
                      <div>
                        <div className="icon">
                          <span className="fas fa-question-circle"></span>
                        </div>
          Help & support <i className="fas fa-angle-right"></i>
                      </div>
                    </li>
                    <li>
                      <div>
                        <div className="icon">
                          <span className="fas fa-users"></span>
                        </div>
          About us
        </div>
                    </li>
                    <li>
                      <div>
                        <div className="icon">
                          <span className="fas fa-user"></span>

                        </div>
          Logout
        </div>
                    </li>
                  </ul>
                  <ul className="setting-drop">
                    <li className="arrow back-setting-btn"><span className="fas fa-arrow-left"></span>Settings & privacy</li>
                    <li>
                      <div>
                        <div className="icon">
                          <span className="fas fa-user"></span>
                        </div>
          Personal info
        </div>
                    </li>
                    <li>
                      <div>
                        <div className="icon">
                          <span className="fas fa-lock"></span>
                        </div>
          Password
        </div>
                    </li>
                    <li>
                      <div>
                        <div className="icon">
                          <span className="fas fa-address-book"></span>
                        </div>
          Activity log
        </div>
                    </li>
                    <li>
                      <div>
                        <div className="icon">
                          <span className="fas fa-globe-asia"></span>
                        </div>
          Languages
        </div>
                    </li>
                    <li>
                      <div>
                        <div className="icon">
                          <span className="fas fa-sign-out-alt"></span>
                        </div>
          Log out
        </div>
                    </li>
                  </ul>
                  <ul className="help-drop">
                    <li className="arrow back-help-btn"><span className="fas fa-arrow-left"></span>Help & support</li>
                    <li>
                      <div>
                        <div className="icon">
                          <span className="fas fa-question-circle"></span>
                        </div>
          Help centre
        </div>
                    </li>
                    <li>
                      <div>
                        <div className="icon">
                          <span className="fas fa-envelope"></span>
                        </div>
          Support Inbox
        </div>
                    </li>
                    <li>
                      <div>
                        <div className="icon">
                          <span className="fas fa-comment-alt"></span>
                        </div>
          Send feedback
        </div>
                    </li>
                    <li>
                      <div>
                        <div className="icon">
                          <span className="fas fa-exclamation-circle"></span>
                        </div>
          Report problem
        </div>
                    </li>
                  </ul>
                </div>
              </nav>
              :
              <button type="button" className="header_login_btn" onClick={handleLoginDialog}> Login</button>
            }
          </div>
          <div className="col-4 text-right">

            <button className="header_other_btn" onClick={() => props.history.push('/cart')}> Cart &nbsp;<span className="icon">
              <span className="fas fa-shopping-bag "></span>
            </span>
              {Object.keys(props.cartList).length > 0 &&
                <span class="icon-button__badge">{Object.keys(props.cartList).length}</span>
              }
            </button>
          </div>
          <div className="col-4 text-left d-flex  ">
            <button className="header_other_btn" onClick={() => props.history.push('/wishlist')}>
              Wishlist <div
                style={{ position: 'absolute', left: '140px', top: '-35px' }}
                className={`mt-3 heart ${props.history.location.pathname.includes("/wishlist") ? 'heart_active' : ''}`} onClick={() => props.history.push('/wishlist')}></div>
            </button>


          </div>
        </div>
      </header>
    }
  </>
}

const mapStateToProps = state => ({
  authDialogOpen: state.header.authDialogOpen,
  cartList: state.user.cartList,
  user: state.user.user,
  error: state.home.error
});

const mapDispatchToProps = dispatch => ({
  setAuthDialog: data => dispatch(setAuthDialog(data)),
});
export default compose(
  withAlert(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(withRouter(Header));