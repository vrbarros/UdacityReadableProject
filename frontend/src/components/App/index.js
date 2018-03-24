import { Route, Switch } from 'react-router';

import New from 'containers/New';
import Page from 'containers/Page';
import Post from 'containers/Post';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const ConnectedSwitch = connect(state => ({ location: state.location }))(
  Switch
);

const App = () => (
  <ConnectedSwitch>
    <Route path="/" exact component={Page} />
    <Route path="/new/:id" component={New} />
    <Route path="/new" exact component={New} />
    <Route path="/category/:category/:id" component={Post} />
    <Route path="/category/:category" component={Page} />
    <Route component={Page} />
  </ConnectedSwitch>
);

export default withRouter(App);
