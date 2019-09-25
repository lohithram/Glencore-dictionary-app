import * as types from 'constants/ActionTypes';
import {createDictionary,
  saveDictionary,
  applyDictionary,
  editDictionary
} from './DictionaryActions';

// No need to create mock store since we are not testing async
// actioin creators
// import configureMockStore from 'redux-mock-store'

describe('DictionaryActions', () => {
  const dictionary = {
    id: "",
    name: "Marketing colours",
    targetProperty: "colour",
    // color mapping goes here
    dictionary: {
      "Anthracite": "Grey",
    }
  };

  describe('createDictionary', () => {
    const SUT = createDictionary;
    it('should create an action of type CREATE_DICTIONARY', () => {
      const expectedAction = {
        type: types.CREATE_DICTIONARY,
      }
      expect(SUT(dictionary)).toEqual(expectedAction)
    })
  })

  describe('saveDictionary', () => {
    const SUT = saveDictionary;
    it('should create an action of type SAVE_DICTIONARY', () => {
      const expectedAction = {
        type: types.SAVE_DICTIONARY,
        dictionary
      }
      expect(SUT(dictionary)).toEqual(expectedAction)
    })
  })

  describe('applyDictionary', () => {
    const SUT = applyDictionary;
    it('should create an action APPLY_DICTIONARY', () => {
      const expectedAction = {
        type: types.APPLY_DICTIONARY,
        dictionary
      }
      expect(SUT(dictionary)).toEqual(expectedAction)
    })
  })
  describe('editDictionary', () => {
    const SUT = editDictionary;
    it('should create an action type EDIT_DICTIONARY', () => {
      const expectedAction = {
        type: types.EDIT_DICTIONARY,
        dictionary
      }
      expect(SUT(dictionary)).toEqual(expectedAction)
    })
  })
})
