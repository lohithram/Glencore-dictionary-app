import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// import DictionaryRow from 'components/DictionaryRow';
import DataView from 'components/DataView';
import Dictionaries from 'components/Dictionaries';
import DictionaryView from 'components/DictionaryView';

// styles
import 'sass/App.scss';


const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <p>Available dictionaries</p>
          <Dictionaries/>
        </header>
        <Route path="/" exact component={DataView}/>
        <Route path="/dictionary" exact component={DictionaryView}>
        </Route>
      </Router>
    </div>
  );
}

export default App;
