import React from 'react';

import { shallow } from 'enzyme';
import Dataset from './Dataset';
import {DataViewProps} from 'types/index';

describe('Dataset', () => {
  let SUT;
  const dataSource = {
    data: [
      {product: "Apple iPhone 6s", colour: "Anthracite", price: "CHF 769"},
      {product: "Apple iPhone 10s", colour: "Gold", price: "CHF 969"}
    ]};

  const tDictionary = {
    id: "999",
    name: "name",
    targetProperty: "colour",
    dictionary: {
      "Anthracite": "Grey",
    }
  };

  it('renders without  transformation', () => {
    SUT = shallow(<Dataset dataSource={dataSource}/>);
    expect(SUT.find('tbody tr').length).toEqual(2);

    expect(SUT.find('tbody tr').at(0).text()).toContain("Anthracite");
    expect(SUT.find('tbody tr').at(1).text()).toContain("Gold");
  });

  it('renders with transformation', () => {
    SUT = shallow(<Dataset dataSource={dataSource}
                            transformationDictionary={tDictionary}
                  />);
    expect(SUT.find('tbody tr').length).toEqual(2);

    expect(SUT.find('tbody tr').at(0).text()).toContain("Grey");
  });

})
