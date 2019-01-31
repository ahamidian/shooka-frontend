import {Redirect} from 'react-router-dom';

import React from 'react';

export default class LoginRequired extends React.Component {
  render() {
    if (localStorage.getItem("access")) {
      return this.props.children
    } else {
      return <Redirect to="/login"/>;
    }
  }

}


