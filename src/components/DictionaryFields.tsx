import React from 'react';
import renderField from 'components/FormField';
import {Field, WrappedFieldArrayProps} from 'redux-form';

const DictionaryFields: React.FC<WrappedFieldArrayProps> = (props) => {
  const { fields, meta: { error, submitFailed } } = props;
  return(
    <table className="table table-hover">
      <thead className="thead-light">
        <tr>
          <th>From</th>
          <th>To</th>
          <th>
            <button type="button"
                    className="btn btn-sm btn-primary"
                    onClick={()=>{fields.push({from:"", to:""})}}>
              Create new mapping
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
      {
        fields.map((mapping, index) => (
          <tr key={index}>
            <td>
              <Field
                name={`${mapping}.from`}
                component={renderField}
                type="text"
                placeholder="from"
              />
            </td>
            <td>
            <Field
              name={`${mapping}.to`}
              component={renderField}
              type="text"
              placeholder="to"
            />
            </td>
            <td>
              <button className="btn btn-sm btn-outline-danger"
                      type="button"
                      onClick={()=>{fields.remove(index)}}>
                Delete
              </button>
            </td>
          </tr>
        ))
      }
      {submitFailed && error &&
        <span className="text-danger form-field-error">{error}</span>
      }
      </tbody>
    </table>
  )
}

export default DictionaryFields;
