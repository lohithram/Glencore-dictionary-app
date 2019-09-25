import { createStore, combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { composeWithDevTools } from "redux-devtools-extension";

// Not using thunk middleware since we have no need to perform async actions
// import thunk from 'redux-thunk';

// reducers
import ProductReducer from 'reducers/ProductReducer'
import DictionaryReducer from 'reducers/DictionaryReducer'

const rootReducer = combineReducers({
  products: ProductReducer,
  transformation: DictionaryReducer,
  form: reduxFormReducer, // using redux form for controlled input components and state management of the same
})

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  // const middleware = applyMiddleware(thunk);
  const store = createStore(rootReducer, //, middleware);
                            composeWithDevTools());
  return store;
}
