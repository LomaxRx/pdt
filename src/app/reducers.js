import {
  ADD_PERSON_TYPE, EDIT_PERSON_FIELD, SAVE_PERSON, UPDATE_PERSON,
  SET_PERSON, RESET_PERSON
} from './constants';

import { combineReducers } from 'redux';
import storage from 'store';
import slugify from '../slugify';

const people = (state=[], action) => {
  let index, person, persons;
  switch(action.type){
    case SAVE_PERSON:
      if(!action.person) return state;
      person = state.find(p=>p.id===action.person.id);
      if(!person) return [...state, action.person];
      // eslint-disable-next-line
    case UPDATE_PERSON:
      if(!action.person) return state;
      state.find((p,i)=>{
        if(p.id === action.person.id){
          index=i;
          return true;
        }
        return false;
      });
      if(!index===undefined) return state;
      persons = [...state];
      persons.splice(index, 1, {...action.person, id: slugify(`${action.person['First Name']} ${action.person['Last Name']}`)});
      return persons;
    default:
      return state;
  }
}

const activePerson = (state={
  types: []
}, action) => {

  switch(action.type){
    case ADD_PERSON_TYPE:
      if(state.types.indexOf(action.personTypeId) !== -1) return state;
      return {
        ...state,
        types: [...state.types, action.personTypeId]
      };
    case EDIT_PERSON_FIELD:
      return {
        ...state,
        [action.field]: action.value
      }
    case SET_PERSON:
      return action.person;
    case RESET_PERSON:
      return {types: []};
    default:
      return state;
  }
}

const reducers = combineReducers({
  activePerson, people
});

let reducer = (state, action) => {
  storage.set('main', state);
  return reducers(state, action);
}

export default reducer;
