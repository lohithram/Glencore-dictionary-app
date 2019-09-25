import reducer from './DictionaryReducer';
import * as types from 'constants/ActionTypes';

const initialState: TransformationDictionary =
  {
    id: "999",
    name: "Marketing colours",
    targetProperty: "colour",
    // color mapping goes here
    dictionary: {
      "Anthracite": "Grey",
    }
  };
describe('DictionaryReducer', () => {

  it('ANY_OTHER_ACTION, doesnt affect the state', () => {
    const nextState = reducer(initialState, {type: 'ANY_OTHER_ACTION', dictionary: {}});
    expect(nextState).toEqual(initialState);
  })
  
  it('CREATE_DICTIONARY', () => {

  })
})
