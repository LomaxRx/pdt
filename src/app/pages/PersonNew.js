import React from 'react';

import Card from '../components/Cards';
import { Text } from '../components/Inputs';
import Button from '../components/Button';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'

import { editPersonField, resetPerson, savePerson } from '../actions';

class PersonNew extends React.Component {
  constructor(props){
    super(props);
    let { person, peopleTypes } = props;
    let fields = [];
    person.types.forEach((t,i)=>{
      peopleTypes[t].attributes.forEach((a)=>{
        if(fields.find((f)=>a.name===f.name)) return;
        fields.push(a);
      });
    })
    this.state = {
      fields
    }
  }

  save = () => {
    let { person, savePerson, resetPerson, changePage } = this.props;
    savePerson(person);
    resetPerson();
    changePage('/people/');
  }

  reset = () => {
    let { resetPerson, changePage } = this.props;
    resetPerson();
    changePage('/people/');
  }

  render(){
    let { peopleTypes, person, editField } = this.props;
    let { fields } = this.state;
    return (
      <div className="person person-new">
        <Card title={<h3>{`New ${peopleTypes[person.types[0]].type}`}</h3>}>
          <div className="pdt-card__wrapper">
            <div className="person__inputs row gutter-10">
              {fields.map((f,i)=>(
                <div className="person__inputs__input col-6" key={`field-${i}`}>
                  <Text label={f.name}
                    value={person[f.name]||''}
                    edit={true}
                    onChange={(e)=>{editField(f.name,e.target.value)}}/>
                </div>
              ))}
            </div>
          </div>
          <div className="pdt-card__footer">
            <Button label="save" onClick={this.save}/>
            <Button label="cancel" color="red" onClick={this.reset}/>
          </div>
        </Card>
      </div>
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

PersonNew = connect(mapStateToProps, mapDispatchToProps)(PersonNew);

export default PersonNew;
