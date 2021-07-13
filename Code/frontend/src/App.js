import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
// import { withAlert } from "react-alert";
import Home from "./components/Home";
import "./App.css";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <>
      <Home />
    </>
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});
export default compose(
  // withAlert(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(App);