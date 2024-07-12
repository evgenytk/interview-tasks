const parseInteger = (value) => {
  if(value % 1 === 0 && /^[\d-]+$/gm.test(value)) {
    return parseInt(value);
  }
}

const isRequired = (value) => {
  if(typeof value === 'undefined') {
    throw 'Field is required';
  }

  return value;
}

const isInteger = (value) => {
  if(isNaN(value) || typeof value !== 'number' || value % 1 !== 0 || !Number.isSafeInteger(value)) {
    throw 'Must be a valid integer value';
  }

  return value;
}

const minNumber = (min) => (value) => {
  if(value < min) {
    throw `Must be greater than ${min}`
  }

  return value;
}

const maxNumber = (max) => (value) => {
  if(value > max) {
    throw `Must be less than ${max}`
  }

  return value;
}

const minString = (min) => (value) => {
  if(value.length < min) {
    throw `Must be longer than ${min}`
  }

  return value;
}

const maxString = (max) => (value) => {
  if(value.length > max) {
    throw `Must be shorter than ${max}`
  }

  return value;
}

const isEnum = (acceptable) => (value) => {
  if(!acceptable.some(key => key === value)) {
    throw `Must match one of the following values: ${acceptable.join(',')}`;
  }

  return value;
}

const isString = (value) => {
  if(typeof value !== 'string') {
    throw 'Must be a string';
  }

  return value;
}

const isLowerCase = (value) => {
  if(typeof value !== 'string' || value.toLowerCase() !== value) {
    throw `Must be lower-cased`
  }

  return value;
}

const isUpperCase = (value) => {
  if(typeof value !== 'string' || value.toUpperCase() !== value) {
    throw `Must be upper-cased`
  }

  return value;
}

const validate = (...callbacks) => (arg) => {
  const valueIsRequired = callbacks.some(({name}) => name === isRequired.name);
  const isEmpty = (arg === null && typeof arg === 'object') || typeof arg === 'undefined';

  if(!valueIsRequired && isEmpty) {
    return arg;
  }

  return callbacks.reduce((nextArg, call) => {
    return call(nextArg);
  }, arg);
}

const getValidationError = (data, validators) => {
  let errors = {};

  Object.keys(validators).forEach((key) => {
    const validateFn = validators[key];
    const value = data[key];

    try {
      validateFn(value);
    } catch (text) {
      errors[key] = [...errors[key] || [], text];
    }
  });

  Object.keys(data).forEach(key => {
    if(!validators[key]) {
      errors[key] = [...errors[key] || [], 'Parameter is not acceptable'];
    }
  });

  return errors;
}

module.exports = {
  parseInteger,
  isRequired,
  isInteger,
  minNumber,
  maxNumber,
  minString,
  maxString,
  isEnum,
  isString,
  isLowerCase,
  isUpperCase,
  validate,
  getValidationError
}
