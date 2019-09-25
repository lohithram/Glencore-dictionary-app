import {DataSource} from 'types/index';

export interface ProductStoreState {
  productData: DataSource
}

const initialState: ProductStoreState = {
  productData: {
    data: [
      {product: "Apple iPhone 6s", colour: "Anthracite", price: "CHF 769"},
      {product: "Apple iPhone 10s", colour: "Gold", price: "CHF 969"},
      {product: "Apple iPhone 10", colour: "Silver", price: "CHF 869"},
      {product: "Samsung Galaxy S8", colour: "Midnight Black", price: "CHF 569"},
      {product: "Huawei P9", colour: "Mystic Silver", price: "CHF 272"},
    ]
  }
}
export default function reducer(state = initialState, action: any): ProductStoreState {
  // no state management for products in this example
  switch (action.type) {
   }
  return state;
}
