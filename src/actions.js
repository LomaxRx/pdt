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

import slugify from './slugify';

export const savePerson = (person) => {
  return {
    type: SAVE_PERSON,
    person
  }
};

export const deletePerson = (person) => {
  return {
    type: DELETE_PERSON,
    person
  }
};

export const setPerson = (person) => {
  return {
    type: SET_PERSON,
    person
  }
}

export const resetPerson = () => {
  return {
    type: RESET_PERSON
  }
}

export const saveAction = (action) => ({
  type: SAVE_ACTION,
  action
});

export const deleteAction = (action) => ({
  type: DELETE_ACTION,
  action
});

export const setAction = (action) => {
  return {
    type: SET_ACTION,
    action
  }
}

export const resetAction = () => {
  return {
    type: RESET_ACTION
  }
}

export const saveThing = (thing) => ({
  type: SAVE_THING,
  thing
});

export const deleteThing = (thing) => ({
  type: DELETE_THING,
  thing
});

export const setThing = (thing) => {
  return {
    type: SET_THING,
    thing
  }
}

export const resetThing = () => {
  return {
    type: RESET_THING
  }
}

export const addAttribute = (_type, attribute) => {
  let type = '';
  switch(_type){
    case 'person':
      type = ADD_PERSON_ATTRIBUTE;
      break;
    case 'action':
      type = ADD_ACTION_ATTRIBUTE;
      break;
    case 'thing':
      type = ADD_THING_ATTRIBUTE;
      break;
    default:
      type = '';
  }

  return {
    type,
    attribute
  }
}

export const removeAttribute = (_type, attribute) => {
  let type = '';
  switch(_type){
    case 'person':
      type = REMOVE_PERSON_ATTRIBUTE;
      break;
    case 'action':
      type = REMOVE_ACTION_ATTRIBUTE;
      break;
    case 'thing':
      type = REMOVE_THING_ATTRIBUTE;
      break;
    default:
      type = '';
  }

  return {
    type,
    attribute
  }
}

export const changeType = (_type, objectType) => {
  let type = '';
  switch(_type){
    case 'person':
      type = CHANGE_PERSON_TYPE;
      break;
    case 'action':
      type = CHANGE_ACTION_TYPE;
      break;
    case 'thing':
      type = CHANGE_THING_TYPE;
      break;
    default:
      type = '';
  }

  return {
    type,
    objectType
  }
}

export const changeDescription = (_type, description) => {
  let type = '';
  switch(_type){
    case 'person':
      type = CHANGE_PERSON_DESCRIPTION;
      break;
    case 'action':
      type = CHANGE_ACTION_DESCRIPTION;
      break;
    case 'thing':
      type = CHANGE_THING_DESCRIPTION;
      break;
    default:
      type = '';
  }

  return {
    type,
    description
  }
}

export const addRelationship = (personId, actionId, thingId) => ({
  type: ADD_RELATIONSHIP,
  personId,
  actionId,
  thingId
});

export const removeRelationship = (personId, actionId, thingId) => ({
  type: REMOVE_RELATIONSHIP,
  personId,
  actionId,
  thingId
});
