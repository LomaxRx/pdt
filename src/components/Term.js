import './Term.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { Arrow } from './Icons';

export default class Term extends React.Component {

  render(){
    let { term, linkTo } = this.props
    return (
      <div className="term">
        <Link to={linkTo}><div className="term__type">{term.type} <Arrow /></div></Link>
        {term.description !== '' &&
          <div className="term__description">{term.description}</div>
        }
      </div>
    );
  }
}
