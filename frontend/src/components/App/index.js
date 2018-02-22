import React from 'react';
import { Route, Switch } from 'react-router';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Page from 'containers/Page';
import Post from 'containers/Post';
import New from 'containers/New';

const ConnectedSwitch = connect(state => ({ location: state.location }))(
  Switch
);

const App = () => (
  <ConnectedSwitch>
    <Route path="/" exact component={Page} />
    <Route path="/new/:id" component={New} />
    <Route path="/new" exact component={New} />
    <Route path="/:category/:id" component={Post} />
    <Route path="/:category" component={Page} />
  </ConnectedSwitch>
);

export default withRouter(App);
