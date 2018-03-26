import './Person.css';

import React from 'react';
import PersonNew from './PersonNew';
import PersonGrid from './PersonGrid';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import { Route, Switch } from 'react-router-dom';
import { editPersonField, resetPerson, savePerson } from '../actions';

class Person extends React.Component{
  render(){
    return (
      <Switch>
        <Route path='/people/new/' component={PersonNew}/>
        <Route path='/people/:id/' component={PersonGrid} />
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  person: state.main.activePerson,
  peopleTypes: state.admin.people.types
});

const mapDispatchToProps = dispatch => bindActionCreators({
  editField: editPersonField,
  changePage: (url) => push(url),
  savePerson,
  resetPerson
}, dispatch);

Person = connect(mapStateToProps, mapDispatchToProps)(Person);

export default Person;
