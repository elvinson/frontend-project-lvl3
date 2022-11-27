// import initView from './view.js';
import onChange from 'on-change';
import { string } from 'yup';

export default () => {
  const state = {
    form: {
      state: 'valid',
      errors: [],
    },
  };

  const watchedState = onChange(state, (path, value, previousValue) => {
    if (path === 'form.state' && value === 'invalid') {

    }
  });

  const form = document.querySelector('form');
  const schema = string().required('пустое поле').trim().url('некорректный url');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const url = formData.get('url');

    const processValidationSuccess = (data) => {
      watchedState.form.state = 'valid';
      watchedState.form.errors = [];
    };

    const processValidationError = (error) => {
      watchedState.form.state = 'invalid';
      watchedState.form.errors.push(error);
    };

    schema.validate(url)
      .then(processValidationSuccess)
      .catch(processValidationError);
  });
};
