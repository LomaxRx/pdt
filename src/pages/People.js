import React from 'react'
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { savePerson, setPerson, resetPerson } from '../actions';
import Subheader, { MenuList } from '../components/Subheader.js';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import PeopleSetup from './PeopleSetup';
import PeopleAttributes from './PeopleAttributes';
import PeopleRelationships from './PeopleRelationships';
import { Route, Switch } from 'react-router-dom';

class People extends React.Component {
  componentWillMount(){
    let { match: { params: { id } }, people} = this.props;
    if(id !== 'new')
      this.props.setPerson(people.types[id]);
  }

  componentDidMount(){
    window.scrollTo(0,0);
  }
  save = () => {
    this.props.savePerson(this.props.person);
    this.props.resetPerson();
    this.props.changePage('/');
  }

  cancel = () => {
    this.props.resetPerson();
    this.props.changePage('/');
  }

  render(){
    let { match: { params: { id } } } = this.props;
    return (
      <div className="people">
        <Subheader title='Person:' color='blue' buttons={[
          <a className="button red" onClick={this.cancel}>cancel</a>,
          <a className="button" onClick={this.save}>save</a>
        ]}>
          <MenuList items={[
            { label: 'Setup', linkTo: `/people/${id}/` },
            { label: 'Attributes', linkTo: `/people/${id}/attributes/` },
            { label: 'Relationships', linkTo: `/people/${id}/relationships/` },
          ]} />
        </Subheader>
        <Route path="/people/:id/" exact component={PeopleSetup} />
        <Route path="/people/:id/attributes/" exact component={PeopleAttributes} />
        <Route path="/people/:id/relationships/" exact component={PeopleRelationships} />
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: (url) => push(url),
  savePerson: (person) => savePerson(person),
  setPerson: (person) => setPerson(person),
  resetPerson
}, dispatch);


const mapStateToProps = state => ({
  people: state.people,
  person: state.activePerson
});

export default People = connect(mapStateToProps, mapDispatchToProps)(People)
