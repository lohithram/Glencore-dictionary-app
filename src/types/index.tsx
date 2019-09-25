export interface ProductData {
  product: string,
  colour: string,
  price: string,
  [index: string]: string
}

export interface DataSource {
  data: ProductData[]
}

export interface TransformationDictionary {
  id: string,
  name: string,
  targetProperty: string, // name of the property to which the transformation is applied
  dictionary: {
    [index: string]: string // contains the mapping of values ["Antracite"] = "Dark Grey"}, ...
  },
}

export interface DataViewProps {
  dataSource: DataSource,
  transformationDictionary?: TransformationDictionary
}

export interface DictionaryFormValues {
  id: string,
  name: string,
  targetProperty: string,
  mappings: {from: string, to: string}[]
}
