import React from 'react';
import Button from '../components/Button';
import './Attribute.css'
import { removeAttribute } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Attribute extends React.Component {

  render(){
    let { name, type, description, term } = this.props;
    return (
      <div className="attribute">
        <div className="attribute__name">
          <div>{name}</div>
        </div><div className="attribute__type">
          {type}
        </div><div className="attribute__description">
          {description || <span className="attribute__description__none">No description.</span>}
        </div>
        <Button className='button-square-15'
          color="red"
          label="x"
          onClick={()=>{this.props.removeAttribute(term, {name, type, description})}} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  removeAttribute
}, dispatch);

export default Attribute = connect(null, mapDispatchToProps)(Attribute);
