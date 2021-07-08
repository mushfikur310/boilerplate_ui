import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import "toastr/build/toastr.css";
import toastr from "toastr";
import configureStore from './redux/configureStore';

import App from './App';

toastr.options = {
  positionClass: "toast-top-right"
}
toastr.options.showMethod = "slideDown";
toastr.options.hideMethod = "slideUp";
toastr.options.progressBar = true;
toastr.options.closeButton = true;
toastr.options.preventDuplicates = true;
toastr.options.closeDuration = 900;

const store = configureStore();
const MOUNT_NODE = document.getElementById('root');

const render = () => {
  ReactDOM.render(
      <Provider store={store}>
          <Router>
              <App/>
          </Router>
      </Provider>,
      MOUNT_NODE
  )
}

render();