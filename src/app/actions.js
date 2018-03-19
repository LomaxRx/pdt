import {
  ADD_PERSON_TYPE, EDIT_PERSON_FIELD
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
