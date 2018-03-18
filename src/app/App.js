import React, { Component } from 'react';
import './App.css';

import { Route, Link, Redirect } from 'react-router-dom'
import Subheader, { MenuList } from '../components/Subheader';

const App = () => (
  <div className="app">
    <Subheader>
      <MenuList color="dark-blue" items={[
        { label: 'People', linkTo: '/people/' },
        { label: 'Things', linkTo: '/things/' },
        { label: 'Reports', linkTo: '/reports/' },
        { label: 'Glossary', linkTo: '/glossary/' },
        { label: 'Network', linkTo: '/network/' },
      ]}/>
    </Subheader>
  </div>
)

export default App;
