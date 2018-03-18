import React, { Component } from 'react';
import './App.css';
import Header from './components/Header.js';


import { Route, Link } from 'react-router-dom'
import Admin from './pages/Admin'
import People from './pages/People';
import Actions from './pages/Actions';
import Things from './pages/Things';

const App = () => (
  <div className="app">
    <Header />
    <Route exact path={'/(|glossary|relationships)/'} component={Admin} />
    <Route path={'/people/:id/'} component={People} />
    <Route path={'/actions/:id/'} component={Actions} />
    <Route path={'/things/:id/'} component={Things} />
  </div>
)

export default App;
