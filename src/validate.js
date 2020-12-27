import isEmpty from 'lodash/isEmpty';

const validateInput = (values) => {
  const errors = {};
  if (isEmpty(values.title)) {
    errors.title = { _error: 'Title is Required' };
  }
  if (isEmpty(values.content)) {
    errors.content = { _error: 'Content is required' };
  }
  if (isEmpty(values.price)) {
    errors.price = { _error: 'Price is required' };
  }
  // if (isEmpty(values.bannerFile)) {
  //   errors.bannerFile = { _error: 'Banner is required' };
  // }
  // if (isEmpty(values.productImageFiles)) {
  //   errors.productImageFiles = { _error: 'List image is required' };
  // }
  return errors;
};

export default validateInput;