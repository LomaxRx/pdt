import React from 'react';

import Card from '../components/Cards';
import { Text } from '../components/Inputs';
import Button from '../components/Button';
import { Tag } from '../components/RelationshipTags';
import ContactCardField from '../components/ContactCardField';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux'
import { connect } from 'react-redux';
import { editPersonField, resetPerson, updatePerson } from '../actions';
import { RelationshipTagGroup, RelationshipTag } from '../components/RelationshipTags';

class EditBlock extends React.Component {
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
    console.log(this.props.person);
    this.props.save(this.props.person);
    this.deactivateEditMode();
  }
}

class ContactBlock extends EditBlock {

  render(){
    let { person, editField } = this.props;
    let { editMode } = this.state;
    return (
      <Card className={`contact-card ${editMode ? 'edit' : ''}`} title={<div className="contact-card__title">
        {!editMode && <h2>
          {`${person['First Name']} ${person['Last Name']}`}
        </h2>}
        {editMode &&<span>
          <ContactCardField label={'First Name'}
            value={this.props.person['First Name']}
            edit={editMode}
            onChange={(e)=>{editField('First Name',e.target.value)}}/>
          <ContactCardField label={'Last Name'}
            value={this.props.person['Last Name']}
            edit={editMode}
            onChange={(e)=>{editField('Last Name',e.target.value)}}/>
        </span>}
        {!editMode && <div className="active-since">
          <label className="active-since__label">{'Active Since'}</label>
          <label className="active-since__date">{'Jan. 5th, 2005'}</label>
        </div>}
        <span className="contact-card__title__buttons">
          {!editMode && <img src="/icons/edit.svg" alt="edit icon" className="icon-edit" onClick={this.activateEditMode}/>}
          {editMode && <span>
            <Button label="save" onClick={this.save}/>
            <Button label="cancel" color="red" onClick={this.deactivateEditMode} />
          </span>}
        </span>
      </div>}>
        <div className="pdt-card__section">
          {person.types.map((p,i)=>(
            <Tag label={p} type="person" key={`type-${i}`}/>
          ))}
        </div>
        <div className="pdt-card__section">
          {!editMode && <div className="contact-card__field">
            <label className="contact-card__field__label">
              Address
            </label>
            <label className="contact-card__field__value">
              {person['Address']}
              {(person['City'] || person['State']) &&
                <span><br/>{person['City']}, {person['State']} {person['Zip']}</span>}
            </label>
          </div>}{editMode && <span>
            <ContactCardField label={'Address'}
              value={this.props.person['Address']}
              edit={editMode}
              onChange={(e)=>{editField('Address',e.target.value)}}/>
              <ContactCardField label={'City'}
                value={this.props.person['City']}
                edit={editMode}
                onChange={(e)=>{editField('City',e.target.value)}}/>
              <ContactCardField label={'State'}
                value={this.props.person['State']}
                edit={editMode}
                onChange={(e)=>{editField('State',e.target.value)}}/>
              <ContactCardField label={'Zip'}
                value={this.props.person['Zip']}
                edit={editMode}
                onChange={(e)=>{editField('Zip',e.target.value)}}/>
            </span>}
          <ContactCardField label={'Phone'}
            value={this.props.person['Phone']}
            edit={editMode}
            onChange={(e)=>{editField('Phone',e.target.value)}}/>
          <ContactCardField label={'Email'}
            value={this.props.person['Email']}
            edit={editMode}
            onChange={(e)=>{editField('Email',e.target.value)}}/>
        </div>
      </Card>
    );
  }
}

class ActionsBlock extends React.Component {
  render(){
    let { peopleRelationships, actions, things } = this.props;
    return (
      <Card title={<h3>Actions</h3>}>
        {Object.keys(peopleRelationships).map((type,i)=>(
          <div className="pdt-card__section" key={`rel-type-${type}`}>
            {peopleRelationships[type].map((r,i)=>(
              <RelationshipTagGroup key={`rel-group-${i}`} size='small'>
                <RelationshipTag
                  sm={true}
                  type="action"
                  label={actions[r.actionId].type} />
                <RelationshipTag
                  sm={true}
                  type="thing"
                  label={things[r.thingId].type} />
              </RelationshipTagGroup>
            ))}
          </div>
        ))}
      </Card>
    );
  }
}

class InfoBlock extends EditBlock {
  render(){
    let { editField, personType, fields } = this.props;
    let { editMode } = this.state;
    return (
      <Card title={<span>
        <h3 style={{'padding-left': '15px'}}>
          {`${personType} Information`}
        </h3>
        <span className="pdt-card__title__buttons">
          {!editMode && <img src="/icons/edit.svg" alt="edit icon" className="icon-edit" onClick={this.activateEditMode}/>}
          {editMode && <span>
            <Button label="save" onClick={this.save}/>
            <Button label="cancel" color="red" onClick={this.deactivateEditMode} />
          </span>}
        </span>
      </span>}>
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

  render(){
    let { fields } = this.state;
    let { peopleTypes, person, editField, updatePerson, actions, things, peopleRelationships } = this.props;

    return (
      <div className="person person-grid row gutter-10">
        <div className="col-4">
          <ContactBlock
            person={person}
            save={updatePerson}
            editField={editField}/>
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
          <ActionsBlock
            peopleRelationships={peopleRelationships}
            actions={actions}
            things={things}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  person: state.main.activePerson,
  peopleTypes: state.admin.people.types,
  peopleRelationships: state.admin.relationships.people,
  actions: state.admin.actions.types,
  things: state.admin.things.types,
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
