import {
  ADD_PERSON_TYPE, EDIT_PERSON_FIELD
} from './constants';

import { combineReducers } from 'redux';
import storage from 'store';

const activePerson = (state={
  types: []
}, action) => {

  switch(action.type){
    case ADD_PERSON_TYPE:
      if(state.types.indexOf(action.personTypeId) != -1) return state;
      return {
        ...state,
        types: [...state.types, action.personTypeId]
      };
    case EDIT_PERSON_FIELD:
      return {
        ...state,
        [action.field]: action.value
      }
    default:
      return state;
  }
}

const reducers = combineReducers({
  activePerson
});

let reducer = (state, action) => {
  storage.set('main', state);
  return reducers(state, action);
}

export default reducer;
