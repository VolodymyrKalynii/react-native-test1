import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import * as localizationTexts from '../translations';

i18n.fallbacks = true;
i18n.translations = {
    en:localizationTexts.en_US,
    'uk-UA':localizationTexts.uk_UA
};
i18n.locale = Localization.locale;

export class LocalizationTexts {
    static get(str:string) {
        return i18n.t(str)
    }

    static getLocale() {
        return i18n.locale
    }
}

