import './RelationshipTags.css';

import React from 'react';

export class RelationshipTagGroup extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      expanded: false
    }
  }

  expand = () => {
    this.setState({ expanded: true });
  }

  collapse = () => {
    this.setState({ expanded: false });
  }

  render(){
    let { size='' } = this.props
    return (
      <div onMouseEnter={this.expand} onMouseLeave={this.collapse}
        className={`relationship-tag-group ${size}`}>
        {this.props.children.map((c,i)=>{
          return React.cloneElement(c, {expanded: this.state.expanded, sm: size==='small' });
        })}
      </div>
    );
  }
}

export class RelationshipTag extends React.Component {
  shortenedTag = () => {
    let label = this.props.label || this.props.type;
    if(this.props.sm && !this.props.expanded){
      if(label.length > 10) return `${label.substring(0,9)}...`;
    }

    return label;
  }

  render(){
    let { type, label, empty } = this.props
    return (
      <div className={`relationship-tag ${type}${empty? ' empty': ''}`}>
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
