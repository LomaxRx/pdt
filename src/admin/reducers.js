import {
  SAVE_PERSON, SAVE_ACTION, SAVE_THING,
  ADD_PERSON_ATTRIBUTE, REMOVE_PERSON_ATTRIBUTE,
  ADD_ACTION_ATTRIBUTE, REMOVE_ACTION_ATTRIBUTE,
  ADD_THING_ATTRIBUTE, REMOVE_THING_ATTRIBUTE,
  CHANGE_PERSON_TYPE, CHANGE_ACTION_TYPE, CHANGE_THING_TYPE,
  CHANGE_PERSON_DESCRIPTION, CHANGE_ACTION_DESCRIPTION, CHANGE_THING_DESCRIPTION,
  SET_PERSON, SET_ACTION, SET_THING,
  RESET_PERSON, RESET_ACTION, RESET_THING,
  ADD_RELATIONSHIP, REMOVE_RELATIONSHIP,
  DELETE_PERSON, DELETE_ACTION, DELETE_THING
} from './constants';

import { routerReducer } from 'react-router-redux'
import storage from 'store';
import { combineReducers } from 'redux';

import slugify from '../slugify';

const people = (state={
  types: {},
  blueprints: {
    'default': {
      name: 'Default',
      attributes: [
        { label: 'First name', name: 'first_name', dataType: 'string' },
        { label: 'Last name', name: 'last_name', dataType: 'string' },
        { label: 'Email', name: 'email', dataType: 'string' }
      ]
    }
  }
}, action) => {
  let types;
  switch(action.type){
    case SAVE_PERSON:
      return {
        ...state,
        types: {...state.types, [action.person.id]: { ...action.person } }
      }
    case DELETE_PERSON:
      types = {...state.types};
      delete types[action.person.id];
      return {
        ...state,
        types
      };
    default:
      return state;
  }
}

const actions = (state={
  types: {},
  blueprints: {}
}, action) => {
  let types;
  switch(action.type){
    case SAVE_ACTION:
      return {
        ...state,
        types: {...state.types, [action.action.id]: action.action}
      }
    case DELETE_ACTION:
      types = {...state.types};
      delete types[action.action.id];
      return {
        ...state,
        types
      };
    default:
      return state;
  }
}

const things = (state={
  types: {},
  blueprints: {}
}, action) => {
  let types;
  switch(action.type){
    case SAVE_THING:
      return {
        ...state,
        types: {...state.types, [action.thing.id]: action.thing}
      }
    case DELETE_THING:
      types = {...state.types};
      delete types[action.thing.id];
      return {
        ...state,
        types
      };
    default:
      return state;
  }
}

const activePerson = (state={id: '', type: '', description: '', attributes: []}, action) => {
  let attrs;
  switch(action.type){
    case CHANGE_PERSON_TYPE:
      return {...state, id: slugify(action.objectType), type: action.objectType };
    case CHANGE_PERSON_DESCRIPTION:
      return {...state, description: action.description };
    case ADD_PERSON_ATTRIBUTE:
      return { ...state, attributes: [...state.attributes, action.attribute] };
    case REMOVE_PERSON_ATTRIBUTE:
      attrs = removeAttribute(action, state.attributes);
      return {...state, attributes: attrs};
    case SET_PERSON:
      return { ...action.person };
    case RESET_PERSON:
      return {id: '', type: '', description: '', attributes: []};
    default:
      return state;
  }
}

const activeAction = (state={id: '', type: '', description: '', attributes: []}, action) => {
  let attrs;
  switch(action.type){
    case CHANGE_ACTION_TYPE:
      return {...state, id: slugify(action.objectType), type: action.objectType };
    case CHANGE_ACTION_DESCRIPTION:
      return {...state, description: action.description };
    case ADD_ACTION_ATTRIBUTE:
      return { ...state, attributes: [...state.attributes, action.attribute] };
    case REMOVE_ACTION_ATTRIBUTE:
      attrs = removeAttribute(action, state.attributes);
      return {...state, attributes: attrs};
    case SET_ACTION:
      return { ...action.action };
    case RESET_ACTION:
      return {id: '', type: '', description: '', attributes: []};
    default:
      return state;
  }
}

const activeThing = (state={id: '', type: '', description: '', attributes: []}, action) => {
  let attrs;
  switch(action.type){
    case CHANGE_THING_TYPE:
      return {...state, id: slugify(action.objectType), type: action.objectType };
    case CHANGE_THING_DESCRIPTION:
      return {...state, description: action.description };
    case ADD_THING_ATTRIBUTE:
      return { ...state, attributes: [...state.attributes, action.attribute] };
    case REMOVE_THING_ATTRIBUTE:
      attrs = removeAttribute(action, state.attributes);
      return {...state, attributes: attrs};
    case SET_THING:
      return { ...action.thing };
    case RESET_THING:
      return {id: '', type: '', description: '', attributes: []};
    default:
      return state;
  }
}

const relationships = (state={people: {}, actions: {}, things: {}}, action) => {
  let _person, _action, _thing;
  switch(action.type){
    case ADD_RELATIONSHIP:
      _person = state.people[action.personId] || {};
      _action = state.actions[action.actionId] || {};
      _thing = state.things[action.thingId] || {};
      return {
        people: {
          ...state.people,
          [action.personId]: [
            ..._person,
            {personId: action.personId, actionId: action.actionId, thingId: action.thingId}
          ]
        },
        actions: {
          ...state.actions,
          [action.actionId]: [
            ..._action,
            {personId: action.personId, actionId: action.actionId, thingId: action.thingId}
          ]
        },
        things: {
          ...state.things,
          [action.thingId]: [
            ..._thing,
            {personId: action.personId, actionId: action.actionId, thingId: action.thingId }
          ]
        }
      }
    case REMOVE_RELATIONSHIP:
      _person = removeRelationship(action, state.people[action.personId] || []);
      _action = removeRelationship(action, state.actions[action.actionId] || []);
      _thing = removeRelationship(action, state.things[action.thingId] || []);
      return {
        people: {
          ...state.people,
          [action.personId]: _person
        },
        actions: {
          ...state.actions,
          [action.actionId]: _action
        },
        things: {
          ...state.things,
          [action.thingId]: _thing
        }
      };
    // case DELETE_PERSON:
    // case DELETE_ACTION:
    // case DELETE_THING:
      //TODO remove relationships after delete
    default:
      return state;
  }
}

let reducers = combineReducers({
  people, actions, things,
  activePerson, activeAction, activeThing,
  relationships, routing: routerReducer
});

let reducer = (state, action) => {
  storage.set('state', state);
  return reducers(state, action);
}

export default reducer

function removeRelationship(action, list){
  let { personId, actionId, thingId } = action;
  let index;
  let item = list.find((l,i)=>{
    let match = l.personId === personId && l.actionId === actionId && l.thingId === thingId;
    if(match){
      index = i;
      return true;
    }
    return false;
  });

  if(!item) return list;

  list = [...list];
  list.splice(index,1);
  return list;
}

function removeAttribute(action, attributes){
  let attrs = [...attributes], attr, index;
  let { name } = action.attribute;
  attr = attrs.find((a,i)=>{
    let match = a.name===name;
    if(match){
      index = i;
      return true;
    }
    return false;
  });
  if(attr) attrs.splice(index,1);
  return attrs;
}
