import './Cards.css';

import React from 'react';

export default class Card extends React.Component {
  render(){
    let { title } = this.props;
    return (
      <div className="pdt-card">
        {title && <div className="pdt-card__title">{title}</div>}
        {this.props.children}
      </div>
    );
  }
}
