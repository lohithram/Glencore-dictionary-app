import { DictionaryFormValues } from 'types/index';

// NOTE: This contains all the validation for dictionary form,
// Ideal candiate to be thoroughly unit tested and its very easy to unit test
// since it is a pure function.

const validate = (values: DictionaryFormValues): any => {
  const errors: any = {};
  const {name, targetProperty, mappings} = values;
  if (!name) {
    errors.name = 'Required';
  }
  if (!targetProperty) {
    errors.targetProperty = 'Required';
  } else if(targetProperty !== 'price'
    && targetProperty !== 'colour'
    && targetProperty !== 'product') {
    errors.targetProperty = 'Value should either be \'product,price,colour\'';
  }

  let mappingValidationError;
  if (!mappings || !mappings.length) {
    mappingValidationError = "Atleast one mapping required"
  } else {
    const mappingArrayErrors: any = [];
    const cloneBucket: {[index: string]: number} = {};
    const forkBucket: {[index: string]: {[index: string]: string}} = {};
    mappings.forEach((mapping, index) => {
      const mappingError: any = {};
      if(!mapping.from) {
        mappingError.from = 'Required';
        mappingArrayErrors[index]= mappingError;
      }
      if(!mapping.to) {
        mappingError.to = 'Required';
        mappingArrayErrors[index]= mappingError;
      }
      if(mapping.from && mapping.to) {
        // hash up to find clones and forks
        // NOTE: by this method, we have captured clones and Forks
        // in just one pass of the mappings array
        const hash = `${mapping.from}::${mapping.to}`;
        if(cloneBucket[hash]) {
          cloneBucket[hash] = cloneBucket[hash]+1;
        } else {
          cloneBucket[hash] = 1;
        }

        if(!forkBucket[mapping.from]) {
          forkBucket[mapping.from] = {};
        }
        forkBucket[mapping.from][mapping.to] = mapping.to;
      }
    })
    let nClones = 0;
    // cloneBucket will look like {{"red:yellow":1, "green:grey": 2}}
    // we are interested in hash greater than 2
    Object.keys(cloneBucket).forEach(hash => {
      if(cloneBucket[hash] > 1) {
        nClones++;
      }
    })
    if(nClones) {
      mappingValidationError = nClones + " clone(s) in the dictionary";
    }

    let nForks = 0;
    // forkBucket will look like {"yellow":{"cream":"cream", "apricot": "apricot"}}
    Object.keys(forkBucket).forEach(from => {
      if(Object.keys(forkBucket[from]).length > 1) {
        nForks++;
      }
    })

    if(nForks) {
      mappingValidationError = (mappingValidationError ? mappingValidationError+" and " : "") +
                               nForks + " fork(s) in the dictionary";
    }

    if (mappingArrayErrors.length) {
      errors.mappings = mappingArrayErrors
    }
  }
  if (mappingValidationError) {
    if(!errors.mappings)
    errors.mappings = {};
    errors.mappings._error = mappingValidationError;
  }
  return errors;
}

export default validate;
