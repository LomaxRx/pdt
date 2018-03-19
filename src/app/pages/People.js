import './People.css';

import Card from '../components/Cards';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { addPersonType } from '../actions';

class NewButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    }
  }
  search = (e) => {
    this.setState({ searchTerm: e.target.value });
  }
  render(){
    let { peopleTypes } = this.props;

    return (
      <div className="row">
        <div className="col-6">
          <div className="">
            <input value={this.state.searchTerm} placeholder="Search" onChange={this.search}/>
          </div>
        </div>
        <div className="people__new-buttons col-6">
          {Object.keys(peopleTypes).filter((k)=>k!='').map((k,i)=>(
            <Button color="dark-blue"
              linkTo='/person/new/'
              label={`+ ${peopleTypes[k].type}`}
              onClick={()=>{ this.props.addPersonType(peopleTypes[k].id); }}/>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  peopleTypes: state.admin.people.types
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addPersonType
}, dispatch);

NewButtons = connect(mapStateToProps, mapDispatchToProps)(NewButtons);

export default class People extends React.Component{

  render(){

    return (
      <div className="people">
        <Card title={<NewButtons/>}>

        </Card>
      </div>
    );
  }
}
