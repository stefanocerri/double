export type Locales = {
    isoCode: 'it-IT' | 'en-US';
    routingHasCountry: boolean;
    label: string;
};

export const locales: Locales[] = [
    { isoCode: 'it-IT', routingHasCountry: false, label: 'Italiano' }, // DEFAULT
    { isoCode: 'en-US', routingHasCountry: false, label: 'English' }
];


export const routerLocales = locales.map(l => ({
    routerCode: l.routingHasCountry ? l.isoCode : l.isoCode.split('-')[0],
    label: l.label,
    isoCode: l.isoCode,
    snakeCode: l.isoCode.replace('-', '_')
}));

export const defaultRouterLocale = routerLocales[0].routerCode;
export const allRouterLocale = routerLocales.map(r => r.routerCode);
export const allIsoCode = locales.map(l => l.isoCode)
