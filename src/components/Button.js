import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom'

export default class Button extends React.Component {

  render(){
    let { color, label, className, linkTo, onClick } = this.props;
    if(linkTo)
      return (
        <Link className={`button ${color} ${className}`} to={linkTo}>{label}</Link>
      );

    if(onClick)
      return (
        <a className={`button ${color} ${className}`} onClick={onClick}>{label}</a>
      );
  }
}
