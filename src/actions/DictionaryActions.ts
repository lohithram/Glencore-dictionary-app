import {TransformationDictionary} from 'types/index';
import {CREATE_DICTIONARY,
  EDIT_DICTIONARY,
  SAVE_DICTIONARY,
  APPLY_DICTIONARY,
  DELETE_DICTIONARY
} from 'constants/ActionTypes';

// action interfaces
export interface CreateDictionaryAction {
    type: typeof CREATE_DICTIONARY;
}

export interface EditDictionaryAction {
    type: typeof EDIT_DICTIONARY;
    dictionary: TransformationDictionary;
}

export interface SaveDictionaryAction {
    type: typeof SAVE_DICTIONARY;
    dictionary: TransformationDictionary;
}

export interface DeleteDictionaryAction {
    type: typeof DELETE_DICTIONARY;
    dictionary: TransformationDictionary;
}

export interface ApplyDictionaryAction {
    type: typeof APPLY_DICTIONARY;
    dictionary: TransformationDictionary;
}

// action creators
export function createDictionary(): CreateDictionaryAction {
  return {
    type: CREATE_DICTIONARY
  };
}

export function editDictionary(dictionary: TransformationDictionary): EditDictionaryAction {
  return {
    type: EDIT_DICTIONARY,
    dictionary
  }
}

export function saveDictionary(dictionary: TransformationDictionary): SaveDictionaryAction {
  return {
    type: SAVE_DICTIONARY,
    dictionary
  }
}

export function applyDictionary(dictionary: TransformationDictionary): ApplyDictionaryAction {
  return {
    type: APPLY_DICTIONARY,
    dictionary
  }
}
export function deleteDictionary(dictionary: TransformationDictionary): DeleteDictionaryAction {
  return {
    type: DELETE_DICTIONARY,
    dictionary
  }
}

export type DictionaryAction = CreateDictionaryAction |
  EditDictionaryAction |
  SaveDictionaryAction |
  ApplyDictionaryAction |
  DeleteDictionaryAction;
