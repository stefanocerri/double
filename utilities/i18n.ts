import {
    useTranslation as useTranslationClientLib,
} from "./i18next/client";

import {
    useTranslation as useTranslationServerLib
} from "./i18next/server";

// Anti corruption layer
// Utilizzare queste funzioni e non quelle implementate in lib
// Se bisogna cambiare libreria si cambia solo qua

export const translationServer = async (lng: string) => {
    return await useTranslationServerLib(lng);
}

export const translationClient = (lng: string) => {
    return useTranslationClientLib(lng)
}
