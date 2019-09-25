import React from 'react';
import {DataViewProps, TransformationDictionary} from 'types/index';

export default class DataSet extends React.PureComponent<DataViewProps>{

  // A very simple selector which for a given value picks up a mapped
  // value(if any) from the transformationDictionary
  // Note: the property for which we are applying transformation must match
  // the targetProperty in the transformationDictionary
  selector = (propertyName: string, value: string, transformation?: TransformationDictionary) => {
    const transformedValue = transformation && transformation.dictionary[value];
    return (transformation &&
            transformedValue &&
            transformation.targetProperty === propertyName) ?
            (<span className="highlight">{transformedValue}</span>) : value;
  }

  render() {
    const {dataSource, transformationDictionary} = this.props;
    return (
      <table className="table table-sm">
        <thead className="">
          <tr>
            <th>Product</th>
            <th>Colour</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {dataSource.data.map((product, index) => (
              <tr key={index}>
                {
                  Object.keys(product)
                  .map((propertyName: string, i) => (
                    <td key={i}>
                      {this.selector(propertyName,
                        product[propertyName], transformationDictionary)}
                    </td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    )
  }
}
