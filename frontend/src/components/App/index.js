import React from 'react';
import { Route, Switch } from 'react-router';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Page from 'containers/Page';

const ConnectedSwitch = connect(state => ({ location: state.location }))(
  Switch
);

const App = () => (
  <ConnectedSwitch>
    <Route path="/" exact render={() => <Page />} />
  </ConnectedSwitch>
);

export default withRouter(App);
