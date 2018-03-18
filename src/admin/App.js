import React, { Component } from 'react';

import { Route, Link } from 'react-router-dom'
import Admin from './pages/Admin'
import People from './pages/People';
import Actions from './pages/Actions';
import Things from './pages/Things';

const App = () => (
  <div className="admin">
    <Route exact path={'/admin/(|glossary|relationships|org)/'} component={Admin} />
    <Route path={'/admin/people/:id/'} component={People} />
    <Route path={'/admin/actions/:id/'} component={Actions} />
    <Route path={'/admin/things/:id/'} component={Things} />
  </div>
)

export default App;
