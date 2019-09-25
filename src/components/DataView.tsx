import React from 'react';
import {connect} from 'react-redux';
import { AppState } from "store/configureStore";

import {DataViewProps} from 'types/index';

// components
import Dataset from './Dataset';

// styles
import 'sass/DataView.scss'

const mapStateToProps = (state: AppState) => ({
  dataSource: state.products.productData,
  transformationDictionary: state.transformation.appliedDictionary
});

class DataView extends React.PureComponent<DataViewProps>{

  render() {
    const {dataSource, transformationDictionary} = this.props;
    return (
        <React.Fragment>
          <section className='DataView'>
            <h5>Original dataset</h5>
            <Dataset dataSource={dataSource}/>
          </section>
          <section className='DataView'>
            <h5>Transformed dataset</h5>
            <p className={`alert alert-${transformationDictionary?'info':'warning'}` } role="alert">
              {transformationDictionary ?
                `${transformationDictionary.name} dictionary applied` :
                "No dictionary applied. Choose a dictionary above and click 'Apply' button."}
            </p>
            <Dataset dataSource={dataSource}
                      transformationDictionary={transformationDictionary}
            />
          </section>
        </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, {})(DataView);
