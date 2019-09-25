import React from 'react';
import {connect} from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {AppState} from 'store/configureStore';
import {TransformationDictionary} from 'types/index';

// components
import DictionaryRow from './DictionaryRow';

//actions
import {createDictionary,
  editDictionary,
  applyDictionary} from 'actions/DictionaryActions'

interface DictionariesProps extends RouteComponentProps<any>, React.Props<any>{
    dictionaries: TransformationDictionary[],
    appliedDictionary?: TransformationDictionary,
    createDictionary: typeof createDictionary,
    editDictionary: typeof editDictionary,
    applyDictionary: typeof applyDictionary,
}

const mapStateToProps = (state: AppState) =>({
  dictionaries: state.transformation.dictionaries,
  appliedDictionary: state.transformation.appliedDictionary,
})

class Dictionaries extends React.PureComponent<DictionariesProps>{

  constructor(props: DictionariesProps) {
    super(props);
    this.handleCreateClick = this.handleCreateClick.bind(this);
  }

  handleCreateClick(e: React.MouseEvent) {
    const {history, createDictionary} = this.props;
    createDictionary(); // set up the redux state before we navigate
    history.push('/dictionary');
  }

  handleEditClick(dictionary: TransformationDictionary) {
    const {history, editDictionary} = this.props;
    editDictionary(dictionary); // set up the redux state before we navigate
    history.push('/dictionary');
  }

  render() {
    const {dictionaries, appliedDictionary, applyDictionary} = this.props;
    return (
      <section>
        <table className="table table-dark">
          <tbody>
            <tr>
              <th>Dictionary name</th>
              <th></th>
              <th></th>
            </tr>
            {dictionaries.map((dictionary, index) => {
              const isApplied = appliedDictionary &&
                dictionary.id === appliedDictionary.id;
              return (
                <DictionaryRow key={index}
                               name={dictionary.name}
                               isApplied={isApplied}
                               handleApplyClick={()=>{applyDictionary(dictionary)}}
                               handleEditClick={()=>{this.handleEditClick(dictionary)}}
                               />
              )
            })}
          </tbody>
        </table>
        <button className="btn btn-primary"
                onClick={this.handleCreateClick}>
          Create new
        </button>
      </section>
    )
  }
}

const withRouterDictionaries = withRouter(Dictionaries);

export default connect(mapStateToProps,
  {createDictionary,
    editDictionary,
    applyDictionary
  })(withRouterDictionaries);
