import React from 'react';
import Button from './Button';
import './RelationshipInput.css';
import { RelationshipTag, RelationshipTagGroup, Tag } from './RelationshipTags';
import { connect } from 'react-redux';

class RelationshipInput extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      actionId: props.actionId,
      personId: props.personId,
      thingId: props.thingId
    }
  }

  changeAction = (actionId) => {
    this.setState({ actionId });
  }

  changeThing = (thingId) => {
    this.setState({ thingId });
  }

  changePerson = (personId) => {
    this.setState({ personId });
  }

  save = () => {
    let { personId, actionId, thingId } = this.state;
    this.props.save(personId, actionId, thingId);
    this.setState({ personId: undefined, actionId: undefined, thingId: undefined });
  }

  render(){
    let { people, actions, things, type } = this.props;
    let { personId, actionId, thingId } = this.state;
    return (
      <div className="rel-input">
        <div className="rel-input__drop-area row no-gutters">
          <div className="rel-input__drop-area__tags col-9">
            <RelationshipTagGroup>
              <RelationshipTag type="person" empty={personId===undefined} label={personId ? people[personId].type : ''}/>
              <RelationshipTag type="action" empty={actionId===undefined} label={actionId ? actions[actionId].type : ''}/>
              <RelationshipTag type="thing" empty={thingId===undefined} label={thingId ? things[thingId].type : ''}/>
            </RelationshipTagGroup>
          </div>
          <div className="rel-input__buttons col-3">
            <Button onClick={this.props.close} color='red' className="" label="close" />
            <Button onClick={this.save} color='dark-blue' className="" label="Save" />
          </div>
        </div>
        <div className="rel-input__drag-items row">
          {(type==='action' || type==='thing') &&
            <div className="rel-input__drag-items__people col-6">
              <div className="section-heading blue">
                <h3>People</h3>
              </div>
              {Object.keys(people).map((k,i)=>(
                <Tag key={`action-tag-${i}`}
                  type='person'
                  onClick={()=>{this.changePerson(people[k].id)}}
                  label={people[k].type} />
              ))}
            </div>
          }{(type==='person' || type==='thing') &&
            <div className="rel-input__drag-items__actions col-6">
              <div className="section-heading green">
                <h3>Actions</h3>
              </div>
              {Object.keys(actions).map((k,i)=>(
                <Tag key={`action-tag-${i}`}
                  type='action'
                  onClick={()=>{this.changeAction(actions[k].id)}}
                  label={actions[k].type} />
              ))}
            </div>
          }{(type==='person' || type==='action') &&
            <div className="rel-input__drag-items__things col-6">
              <div className="section-heading orange">
                <h3>Things</h3>
              </div>
              {Object.keys(things).map((k,i)=>(
                <Tag key={`thing-tag-${i}`}
                  type='thing'
                  onClick={()=>{this.changeThing(things[k].id)}}
                  label={things[k].type} />
              ))}
            </div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  people: state.admin.people.types,
  actions: state.admin.actions.types,
  things: state.admin.things.types
});

export default RelationshipInput = connect(mapStateToProps)(RelationshipInput);
