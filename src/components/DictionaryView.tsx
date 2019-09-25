import React from 'react';
import {connect} from 'react-redux';
import { AppState } from "store/configureStore";
import { TransformationDictionary, DictionaryFormValues } from 'types/index';
import { RouteComponentProps } from 'react-router-dom';
import { reduxForm,
  InjectedFormProps,
  Field, FieldArray } from 'redux-form';

// form validation function
import dictionaryValidate from 'validations/DictionaryFormValidation';

// components
import renderField from 'components/FormField';
import DictionaryFields from 'components/DictionaryFields';

//actions
import { saveDictionary, deleteDictionary } from 'actions/DictionaryActions'

// styles
import 'sass/DictionaryView.scss'

export interface DictionaryViewProps extends RouteComponentProps<any>{
  transformationDictionary?: TransformationDictionary,
  deleteDictionary: typeof deleteDictionary,
  saveDictionary: typeof saveDictionary,
}

// prepare data for form view and edit
// Essentially the dictionay is changed from
// [id: string]: string to {from: string, to: string}[]

const prepareFormInitialValues = (tDictionary?: TransformationDictionary): DictionaryFormValues | {} => {
  if(!tDictionary) return {};

  const {id, name, targetProperty, dictionary} = tDictionary;
  const formValues: DictionaryFormValues = {id, name, targetProperty, mappings: []};
  Object.keys(tDictionary.dictionary).forEach(from => {
    formValues.mappings.push(
      {from, to: dictionary[from]}
    );
  })
  return formValues;
}

const mapStateToProps = (state: AppState) => ({
  initialValues: prepareFormInitialValues(state.transformation.editDictionary),
  transformationDictionary: state.transformation.editDictionary
});

class DictionaryView extends React.PureComponent<InjectedFormProps<DictionaryFormValues, DictionaryViewProps> & DictionaryViewProps> {

  constructor(props: InjectedFormProps<DictionaryFormValues, DictionaryViewProps> & DictionaryViewProps) {
    super(props);
    this.saveDictionary = this.saveDictionary.bind(this);
    this.deleteDictionary = this.deleteDictionary.bind(this);
  }

  deleteDictionary() {
    const {deleteDictionary, transformationDictionary} = this.props;
    transformationDictionary && deleteDictionary(transformationDictionary);
    this.props.history.push("/");
  }

  saveDictionary(formValues: DictionaryFormValues) {
    const {id, name, targetProperty} = formValues;
    const tDictionary: TransformationDictionary = {id, name, targetProperty, dictionary:{}};
    formValues.mappings.forEach(map => {
      tDictionary.dictionary[map.from] = map.to;
    })
    this.props.saveDictionary(tDictionary);
    this.props.history.push("/");
  }

  render() {
    const {transformationDictionary, history} = this.props;

    if(!transformationDictionary) {
      return null;
    }
    else {
      const {id} = transformationDictionary;
      const {pristine, submitting, handleSubmit} = this.props;

      return (
        <form onSubmit={handleSubmit(this.saveDictionary)}>
          <section className='DictionaryView'>
            <h3 className="DictionaryView-heading">
              {id ? "Edit dictionary" : "Create new dictionary"}
              {id && <button className="btn btn-outline-danger"
                              onClick={this.deleteDictionary}>
                              Delete dictionary
                    </button>}
            </h3>
            <Field
              name="name"
              className="col-sm-6 form-control"
              label="Dictionary name"
              component={renderField}
              type="text"
              placeholder="name"
            />
            <Field
              name="targetProperty"
              className="col-sm-6 form-control"
              label="Target property"
              component={renderField}
              type="text"
              placeholder="product/colour/price"
            />

            <FieldArray name="mappings" component={DictionaryFields} />

            <div className="row DictionaryView-Actions">
              <button className="btn btn-primary col-sm-3"
                      type="submit" disabled={pristine || submitting}>
                Save and return
              </button>

              <button className="btn btn-link col-sm-3"
                      type="button" onClick={()=>{history.push("/")}}>
                Go back
              </button>
            </div>
          </section>
        </form>
      )
    }
  }
}

const DictionaryViewForm = reduxForm<DictionaryFormValues, DictionaryViewProps>({
  form: 'dictionaryForm',
  enableReinitialize: true,
  validate: dictionaryValidate,
})(DictionaryView);

export default connect(mapStateToProps,{saveDictionary, deleteDictionary})(DictionaryViewForm);
