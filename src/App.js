import React, { Component } from "react";
import { Provider } from "react-redux";

import Map from "./components/map/map";
import "./config/reactotronConfig";
import store from "./store";

import "./styles.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DevList from "./components/devList/devList";

toast.configure({
  autoClose: 5000,
  position: "top-center"
});
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div id="wrapper">
          <Map />
          <DevList />
        </div>
      </Provider>
    );
  }
}
