import {
  ADD_PERSON_TYPE, EDIT_PERSON_FIELD, SAVE_PERSON, UPDATE_PERSON,
  SET_PERSON, RESET_PERSON
} from './constants';


export const addPersonType = (personTypeId) => ({
  type: ADD_PERSON_TYPE,
  personTypeId
});

export const editPersonField = (field, value) => ({
  type: EDIT_PERSON_FIELD,
  field,
  value
});

export const savePerson = (person) => ({
  type: SAVE_PERSON,
  person
});

export const updatePerson = (person) => ({
  type: UPDATE_PERSON,
  person
});

export const setPerson = (person) => ({
  type: SET_PERSON,
  person
})

export const resetPerson = () => ({
  type: RESET_PERSON
});
