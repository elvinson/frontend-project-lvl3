// import initView from './view.js';
import onChange from 'on-change';
import { string } from 'yup';

export default (i18next) => {
  const state = {
    form: {
      state: 'filling', // sending
      validation: {
        state: true,
        message: ""
      }
    },
    feedList: []
  };

  const form = document.querySelector('form');
  const formUrlInput = form.querySelector('input[name="url"]');
  const formSendButton = form.querySelector('button');
  const formValidationFeedback = document.querySelector('.feedback');

  // Можем ли мы менять состояние в рендере?ы
  const watchedState = onChange(state, (path, value) => {
    if (path === 'form.state' && value === 'filling') {
      form.reset();
      formUrlInput.disabled = false;
      formUrlInput.focus();
      formSendButton.disabled = false;
    }

    if (path === 'form.state' && value === 'sending') {
      formUrlInput.disabled = true;
      formSendButton.disabled = true;
    }

    if (path === 'form.validation') {
      if (watchedState.form.validation.state) {
        formUrlInput.classList.remove('is-invalid');
        formValidationFeedback.textContent = "";
      } else {
        formUrlInput.classList.add('is-invalid');
        formValidationFeedback.textContent = watchedState.form.validation.message;
      }
    }
  });

  const schema = string().required('').trim().url(i18next.t('messages.error.urlIsInvalid'));

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const url = formData.get('url');

    const processValidationSuccess = () => {
      watchedState.form.validation = {
        state: true, 
        message: ""
      };

      watchedState.feedList.push({
        url: url,
        content: []
      });

      watchedState.form.state = 'sending';

      setTimeout(() => {
        watchedState.form.state = 'filling';
      }, 3000);
    };

    const processValidationError = (error) => {
      watchedState.form.validation = {
        state: false, 
        message: error.message
      };
    };

    schema.validate(url)
      .then(() => {
        const feedItem = watchedState.feedList.find((feedItem) => feedItem.url === url);

        if (feedItem) {
          throw new Error(i18next.t('messages.error.rssAlreadyExists'));
        }
      })
      .then(processValidationSuccess)
      .catch(processValidationError);
  });
};



// После отправки данных формы, приложение должно производить валидацию и подсвечивать красным рамку вокруг инпута, если адрес невалидный. 
// Помимо корректности ссылки, нужно валидировать дубли. 
// Если урл уже есть в списке фидов, то он не проходит валидацию. 
// После того как поток добавлен, форма принимает первоначальный вид (очищается инпут, устанавливается фокус).