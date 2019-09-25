import uuid from 'uuid';
import {TransformationDictionary} from 'types/index';
import {CREATE_DICTIONARY,
  EDIT_DICTIONARY,
  APPLY_DICTIONARY,
  SAVE_DICTIONARY,
  DELETE_DICTIONARY
} from 'constants/ActionTypes';
import {DictionaryAction} from 'actions/DictionaryActions';

export interface TransformationStoreState {
  dictionaries: TransformationDictionary[],
  appliedDictionary?: TransformationDictionary,
  editDictionary?: TransformationDictionary,
}

const colourDictionary: TransformationDictionary =
  {
    id: uuid.v1(),
    name: "Marketing colours",
    targetProperty: "colour",
    // color mapping goes here
    dictionary: {
      "Anthracite": "Grey",
      "Midnight Black": "Black",
      "Mystic Silver": "Silver",
    }
  };

const productDictionary: TransformationDictionary =
  {
    id: uuid.v1(),
    name: "Product names",
    targetProperty: "product",
    // color mapping goes here
    dictionary: {
      "Samsung Galaxy S8": "Samsung's flagship phone",
    }
  };

const initialState: TransformationStoreState = {
  dictionaries: [colourDictionary, productDictionary],
}

export default function reducer(state = initialState, action: DictionaryAction): TransformationStoreState {

  switch (action.type) {
    case CREATE_DICTIONARY: {
      return { ...state,
        editDictionary: {id: "", name: "", targetProperty: "", dictionary: {}}
      };
    }
    case APPLY_DICTIONARY: {
      return {
        ...state,
        appliedDictionary: action.dictionary
      }
    }
    case EDIT_DICTIONARY: {
      return {
        ...state,
        editDictionary: action.dictionary
      }
    }
    case DELETE_DICTIONARY: {
      const dictionaries = [...state.dictionaries];
      const deleteAtIndex = dictionaries.findIndex(
        dictionary => dictionary.id === action.dictionary.id)
      dictionaries.splice(deleteAtIndex,1);
      return {
        ...state,
        dictionaries,
        editDictionary: undefined,
        appliedDictionary: undefined,
      }
    }
    case SAVE_DICTIONARY: {
      let dictionaries = [...state.dictionaries];
      if(!action.dictionary.id) {
        const newDictionary = action.dictionary;
        newDictionary.id = uuid.v1();
        dictionaries = [...state.dictionaries, newDictionary];
      } else {
        const edittedDictionary = action.dictionary;
        dictionaries.some((dictionary) => {
          if(dictionary.id === edittedDictionary.id) {
            Object.assign(dictionary, edittedDictionary); // updated with the user edited dictionary
            return true;
          }
          return false;
        })
      }
      return {
        ...state,
        dictionaries
      }
    }

   }
  return state;
}
