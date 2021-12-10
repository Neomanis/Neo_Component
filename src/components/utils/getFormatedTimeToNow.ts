import { formatDistanceToNowStrict, Locale, format } from "date-fns";
import { enUS, enGB, fr } from "date-fns/locale";

export function getFormatedTimeToNow(date: string): string {
    const dateTicket = new Date(date.replace(/-/g, "/"));
    const formatedDate = formatDistanceToNowStrict(dateTicket).split(" ");
    return formatedDate[0] + formatedDate[1].charAt(0).toUpperCase();
}

export function getFormatedTimeToNowExtended(date: string, lang: string): string {
    const locale = getDateFnsLocaleFromUserLang(lang);
    const formatToDate = new Date(date.replace(/-/g, "/"));
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

export function formatDate(date: string, lang = "en_GB"): string {
    return format(new Date(date), "P p", { locale: getDateFnsLocaleFromUserLang(lang) });
}

export function formatDateToNow(incomingDate: string, lang: string): string {
    let formatedDate: string;
    const date = new Date(incomingDate);
    const timestampDiff = (new Date().getTime() - Date.parse(incomingDate)) / 1000;
    let begin: string;
    let middle: string;
    let end: string;
    switch (lang) {
        case "fr_FR":
            begin = "'le' ";
            middle = " 'à' ";
            end = "";
            break;
        // en_US and en_GB
        default:
            begin = "";
            middle = "',' ";
            end = "";
            break;
    }
    if (timestampDiff < 24 * 60 * 60 && date.getDay() === new Date().getDay()) {
        formatedDate = format(date, `p`, {
            locale: getDateFnsLocaleFromUserLang(lang),
        });
    } else if (timestampDiff < 7 * 24 * 60 * 60 && date.getDay() !== new Date().getDay()) {
        formatedDate = format(date, `eeee${middle}p`, {
            locale: getDateFnsLocaleFromUserLang(lang),
        });
    } else {
        formatedDate = format(date, `${begin}P${middle}p${end}`, {
            locale: getDateFnsLocaleFromUserLang(lang),
        });
    }

    return formatedDate;
}
