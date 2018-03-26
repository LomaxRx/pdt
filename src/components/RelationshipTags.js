import './RelationshipTags.css';

import React from 'react';

export class RelationshipTagGroup extends React.Component {
  render(){
    let { size='' } = this.props
    return (
      <div className={`relationship-tag-group ${size}`}>
        {this.props.children}
      </div>
    );
  }
}

export class RelationshipTag extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      expanded: false
    }
  }
  shortenedTag = () => {
    let label = this.props.label || this.props.type;
    if(this.props.sm && !this.state.expanded){
      if(label.length > 10) return `${label.substring(0,9)}...`;
    }

    return label;
  }
  expand = () => {
    this.setState({ expanded: true });
  }

  collapse = () => {
    this.setState({ expanded: false });
  }

  render(){
    let { type, label, empty } = this.props
    return (
      <div className={`relationship-tag ${type}${empty? ' empty': ''}`} onMouseEnter={this.expand} onMouseLeave={this.collapse}>
        <div>{this.shortenedTag()}</div>
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
