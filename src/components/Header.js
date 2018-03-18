import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {

  render(){
    return (
      <header className="header">
        <div className="header-wrapper container">
          <div className="row gutter-10">
            <div className="header__logo col-9">
              <div className="header__logo__img">
                <Link to='/'>Predicate.</Link>
              </div>
            </div>
            <div className="header__account col-3">

            </div>
          </div>
        </div>
      </header>
    );
  }
}
