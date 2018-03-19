import './Person.css';

import Card from '../components/Cards';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { Text, TextArea } from '../components/Inputs';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { editPersonField } from '../actions';

class Person extends React.Component{
  constructor(props){
    super(props);
    let { person, peopleTypes } = props;
    let fields = [];
    person.types.map((t,i)=>{
      peopleTypes[t].attributes.forEach((a)=>{
        if(fields.find((f)=>a.name==f.name)) return;
        fields.push(a);
      });
    })
    this.state = {
      fields
    }
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
            <Button label="save" />
            <Button label="cancel" color="red" />
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
  editField: editPersonField
}, dispatch);

Person = connect(mapStateToProps, mapDispatchToProps)(Person);

export default Person;
