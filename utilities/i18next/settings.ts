import { InitOptions } from 'i18next'
import { resources } from '@/config/i18n.config'
import { defaultRouterLocale, routerLocales } from '@/config/locale.config'

export const fallbackLng = defaultRouterLocale
export const languages = routerLocales.map(r => r.routerCode)
export const defaultNS = 'translation'

export function getOptions(lng = fallbackLng, ns = defaultNS): InitOptions {

  return {
    // Languages
    supportedLngs: languages,
    fallbackLng,
    lng,
    // Namespaces
    fallbackNS: defaultNS,
    defaultNS,
    ns,
    // Resources
    resources
  }

}
