import React, { Component } from 'react';
import './App.css';

import { Route, Link, Redirect, Switch } from 'react-router-dom'
import Subheader, { MenuList } from '../components/Subheader';
import People from './pages/People';
import Person from './pages/Person';

const App = () => (
  <div className="main-app">
    <Subheader>
      <MenuList color="dark-blue" items={[
        { label: 'People', linkTo: '/people/' },
        { label: 'Things', linkTo: '/things/' },
        { label: 'Reports', linkTo: '/reports/' },
        { label: 'Network', linkTo: '/network/' },
        { label: 'Admin', linkTo: '/admin/' }
      ]}/>
    </Subheader>
    <div className="app__wrapper container">
      <Switch>
        <Route path="/people/" component={People} />
        <Route path="/person/" component={Person} />
      </Switch>
    </div>
  </div>
)

export default App;
