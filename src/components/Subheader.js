import React from 'react';
import './Subheader.css';
import { NavLink } from 'react-router-dom';

export class MenuList extends React.Component {

  render(){
    let { items, active } = this.props;
    return (
      <div className="subheader__menu__list">
        {items.map((item, i)=>(
          <h4 key={`menu-item-${i}`}>
            <NavLink exact to={item.linkTo}>{item.label}</NavLink>
          </h4>
        ))}
      </div>
    );
  }
}

const AdminSubheader = ({ title, buttons, children }) => (
  <div className="row gutter-10">
    <div className="subheader__title col-2">
      <h1 className='white'>{title}</h1>
    </div>
    <div className="subheader__spacer col-1">
      <div></div>
    </div>
    <div className="subheader__menu col-6">{children}</div>
    {buttons &&
      <div className="subheader__buttons col-3">{buttons}</div>
    }
  </div>
)

export default class Subheader extends React.Component {

  render(){
    let { title, color='dark-blue', children, buttons, admin } = this.props;
    return (
      <header className={`subheader ${color}`}>
        <div className="subheader-wrapper container">
          {admin &&
            <AdminSubheader title={title} buttons={buttons}>
              {children}
            </AdminSubheader>
          }{!admin &&
            <div>{children}</div>
          }
        </div>
      </header>
    );
  }
}
