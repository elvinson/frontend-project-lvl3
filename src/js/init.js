import i18next from 'i18next';
import ru from './../locales/ru.js'
import runApp from './app';

export default () => {
    const i18nInstance = i18next.createInstance();
    const i18nInstanceOptions = {
        lng: 'ru',
        debug: true,
        resources: {
            ru
        }
    };

    i18nInstance
        .init(i18nInstanceOptions)
        .then(() => runApp(i18nInstance));
}