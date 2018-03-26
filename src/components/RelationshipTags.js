import './RelationshipTags.css';

import React from 'react';

export class RelationshipTagGroup extends React.Component {
  render(){
    return (
      <div className={`relationship-tag-group`}>
        {this.props.children}
      </div>
    );
  }
}

export class RelationshipTag extends React.Component {
  render(){
    let { type, label, empty } = this.props
    return (
      <div className={`relationship-tag ${type}${empty? ' empty': ''}`}>
        <div>{label || type }</div>
      </div>
    );
  }
}

export class Tag extends React.Component {
  render(){
    let { type, label, onClick } = this.props;
    return (
      <div className={`tag ${type}`} onClick={onClick}>{label}</div>
    );
  }
}
