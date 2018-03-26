import React from 'react';

import Card from '../components/Cards';
import { Text } from '../components/Inputs';
import Button from '../components/Button';
import { Tag } from '../components/RelationshipTags';

import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux'
import { connect } from 'react-redux';
import { editPersonField, resetPerson, updatePerson } from '../actions';

class InfoBlock extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editMode: false
    }
  }

  activateEditMode = () => {
    this.setState({ editMode: true });
  }

  deactivateEditMode = () => {
    this.setState({ editMode: false });
  }

  save = () => {
    this.props.save(this.props.person);
    this.deactivateEditMode();
  }

  render(){
    let { editField, personType, fields } = this.props;
    let { editMode } = this.state;
    return (
      <Card title={<h3>
        {`${personType} Information`}
        <span className="pdt-card__title__buttons">
          {!editMode && <img src="/icons/edit.svg" alt="edit icon" className="icon-edit" onClick={this.activateEditMode}/>}
          {editMode && <span>
            <Button label="save" onClick={this.save}/>
            <Button label="cancel" color="red" onClick={this.deactivateEditMode} />
          </span>}
        </span>
      </h3>}>
        <div className="pdt-card__wrapper">
          <div className="person__inputs row gutter-10">
            {fields.map((f,i)=>(
              <div className="person__inputs__input col-6" key={`field-${i}`}>
                <Text label={f}
                  value={this.props.person[f]||''}
                  edit={editMode}
                  onChange={(e)=>{editField(f,e.target.value)}}/>
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  }
}

class PersonGrid extends React.Component {
  constructor(props){
    super(props);
    let { person, peopleTypes } = this.props;
    let state = {
      fields: {
          contact: [
            'First Name',
            'Last Name',
            'Address',
            'City',
            'State',
            'Zip',
            'Phone',
            'Email'
          ]
      }
    }

    person.types.forEach((t,i)=>{
      state.fields[t] = [];
      peopleTypes[t].attributes.forEach((a)=>{
        if(!this.isDupe(a.name, state)) state.fields[t].push(a.name);
      });
    });

    this.state = state;
  }

  isDupe = (name, state) => {
    let { fields } = state;
    for(let k in fields){
      for(let i=0; i<fields[k].length; i++){
        if(name===fields[k][i]) return true;
      }
    }
  }

  contactBlock = () => {
    let { person } = this.props;
    return (
      <Card className="contact-card" title={<div className="contact-card__title">
        <h2>
          {`${person['First Name']} ${person['Last Name']}`}
        </h2>
        <div className="active-since">
          <label className="active-since__label">{'Active Since'}</label>
          <label className="active-since__date">{'Jan. 5th, 2005'}</label>
        </div>
      </div>}>
        <div className="pdt-card__section">
          {person.types.map((p,i)=>(
            <Tag label={p} type="person" key={`type-${i}`}/>
          ))}
        </div>
        <div className="pdt-card__section">
          <div className="contact-card__field">
            <label className="contact-card__field__label">
              Address
            </label>
            <label className="contact-card__field__value">
              {person['Address']}
              {(person['City'] || person['State']) &&
                <span><br/>{person['City']}, {person['State']} {person['Zip']}</span>}
            </label>
          </div>
          <div className="contact-card__field">
            <label className="contact-card__field__label">
              Phone
            </label>
            <label className="contact-card__field__value">
              {person['Phone']}
            </label>
          </div>
          <div className="contact-card__field">
            <label className="contact-card__field__label">
              Email
            </label>
            <label className="contact-card__field__value">
              {person['Email']}
            </label>
          </div>
        </div>
      </Card>
    );
  }

  render(){
    let { fields } = this.state;
    let { peopleTypes, person, editField, updatePerson } = this.props;
    return (
      <div className="person person-grid row gutter-10">
        <div className="col-4">
          {this.contactBlock()}
        </div>
        <div className="col-6">
          {Object.keys(fields).filter(f=>f!=='contact').map((t,i)=>(
            <InfoBlock
              key={`field-${i}`}
              save={updatePerson}
              person={person}
              editField={editField}
              personType={peopleTypes[t].type}
              fields={fields[t]}/>
          ))}
        </div>
        <div className="col-2">

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  person: state.main.activePerson,
  peopleTypes: state.admin.people.types,
  state
});

const mapDispatchToProps = dispatch => bindActionCreators({
  editField: editPersonField,
  changePage: (url) => push(url),
  updatePerson,
  resetPerson
}, dispatch);

PersonGrid = connect(mapStateToProps, mapDispatchToProps)(PersonGrid);

export default PersonGrid;
