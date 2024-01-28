import it from '../i18n/it/translation.json'
import en from '../i18n/en/translation.json'

export type Translation = typeof it & typeof en;

declare module 'i18next' {
    interface CustomTypeOptions {
        defaultNS: 'translation';
        resources: {
            translation: Translation
        };
    }
}