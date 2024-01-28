import { Translation } from "@/types/i18next"
import it from '@/i18n/it/translation.json'
import en from '@/i18n/en/translation.json'

export const resources: {
    it: { translation: Translation },
    en: { translation: Translation }
} = {
    it: { translation: it },
    en: { translation: en }
}