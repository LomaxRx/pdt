import React from 'react';
import './SectionHeadings.css';

export class Heading1 extends React.Component {

  render(){
    let { label, color, children } = this.props;
    return (
      <div className={`section-heading ${color}`}>
        {children}
        <h1>{label}</h1>
      </div>
    );
  }
}
