export const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/

export const LANG = (
    (navigator && navigator.languages && navigator.languages[0]) ||
    "en-US"
).split("-")[0]

export enum SupportedLanguages {
    RU = "ru",
    EN = "en",
}

export function t(variants: { [lang: string]: string }) {
    return variants[LANG] || variants["en"]
}
