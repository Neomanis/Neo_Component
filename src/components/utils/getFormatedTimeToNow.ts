import { formatDistanceToNowStrict, Locale } from "date-fns";
import { enUS, enGB, fr } from "date-fns/locale";

export function getFormatedTimeToNow(date: string): string {
    const dateTicket = new Date(date.replace(" ", "T") + "Z");
    const formatedDate = formatDistanceToNowStrict(dateTicket).split(" ");
    return formatedDate[0] + formatedDate[1].charAt(0).toUpperCase();
}

export function getFormatedTimeToNowExtended(date: string, lang: string): string {
    const locale = getDateFnsLocaleFromUserLang(lang);
    const formatToDate = new Date(date.replace(" ", "T") + "Z");
    const timeToNow = formatDistanceToNowStrict(formatToDate, { addSuffix: true, locale: locale });
    return timeToNow;
}

export function getDateFnsLocaleFromUserLang(lang: string): Locale {
    switch (lang) {
        case "en_US":
            return enUS;
        case "fr_FR":
            return fr;
        case "en_GB":
            return enGB;
        default:
            return enGB;
    }
}

export function formatDate(lang: string): string {
    const local = getDateFnsLocaleFromUserLang(lang).code;
    const date = new Date(lang).toLocaleDateString(local);
    const time = new Date(lang).toLocaleTimeString(local, { hour: "2-digit", minute: "2-digit" });
    return date + " " + time;
}
