import validation from './DictionaryFormValidation';
import {TransformationDictionary, DictionaryFormValidation} from 'types/index';

const emptyDictionary : TransformationDictionary = {
  id: "",
  name: "",
  targetProperty: "",
  mappings: []
  // color mapping goes here
}

const testDictionary : TransformationDictionary = {
  id: "999",
  name: "",
  targetProperty: "colour",
  mappings: []
  // color mapping goes here
}

const cloneMappings = [
  { from: "AA", to: "BB"},
  { from: "CC", to: "DD"},
  { from: "Anthracite", to: "Grey"},
  { from: "CC", to: "DD"},
  { from: "AA", to: "BB"},
  { from: "AA", to: "BB"},
];

const forkMappings = [
  { from: "AA", to: "BB"},
  { from: "AA", to: "CC"},
  { from: "Anthracite", to: "Grey"},
  { from: "CC", to: "DD"},
  { from: "CC", to: "BB"},
];

describe("DictionaryFormValidation", () => {

  it("Reports minimum values required", () => {
    const errors = validation(emptyDictionary);

    expect(errors.name).toEqual("Required");
    expect(errors.targetProperty).toEqual("Required");
    expect(errors.mappings._error).toEqual("Atleast one mapping required");
  })

  it("Report N clones", () => {
    const errors = validation(
      Object.assign({}, testDictionary, {mappings: cloneMappings}));

    expect(errors.mappings._error).toEqual("2 clone(s) in the dictionary");
  })

  it("Report N forks", () => {
    const errors = validation(
      Object.assign({}, testDictionary, {mappings: forkMappings}));

    expect(errors.mappings._error).toEqual("2 fork(s) in the dictionary");
  })

  it("Report both N clones and M forks", () => {
    const mappings = [...cloneMappings, ...forkMappings];
    const errors = validation(
      Object.assign({}, testDictionary, {mappings}));

    expect(errors.mappings._error).toEqual("3 clone(s) in the dictionary and 2 fork(s) in the dictionary");
  })
})
