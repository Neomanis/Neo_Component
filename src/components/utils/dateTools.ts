import { formatDistanceToNowStrict, Locale, format, intervalToDuration } from "date-fns";
import { enUS, enGB, fr } from "date-fns/locale";
import i18next from "i18next";
import { i18n } from "../../i18n";

export function getFormatedTimeToNow(date: string): string {
    const dateTicket = new Date(date);
    const formatedDate = formatDistanceToNowStrict(dateTicket).split(" ");
    return formatedDate[0] + formatedDate[1].charAt(0).toUpperCase();
}

export function getTimeToNowWithTranslation(date: string, lang?: string): string {
    const dateTicket = new Date(date);
    const formatedDate = formatDistanceToNowStrict(dateTicket).split(" ");

    const myLanguage = i18next.getFixedT(lang ? lang : "en_US");

    // if formatDistanceToNowStrict is using 'hour' unit, we have to compute difference
    // between dates ourselves to display hours and minutes in HH:mm format
    if (formatedDate[1].startsWith("hour")) {
        const timeDistanceToNow = intervalToDuration({ start: new Date(), end: dateTicket });
        return JSON.stringify(timeDistanceToNow.hours) + " : " + JSON.stringify(timeDistanceToNow.minutes);
    }

    // if formatDistanceToNowStrict is usign 'minute' or 'second' unit, we will use abbreviated translation
    if (formatedDate[1].startsWith("second") || formatedDate[1].startsWith("minute")) {
        return formatedDate[0] + " " + myLanguage(`date.${"abbreviated." + formatedDate[1]}`);
    }

    // in other cases, we just use classic translation
    return formatedDate[0] + " " + myLanguage(`date.${formatedDate[1]}`);
}

export function getFormatedTimeToNowExtended(date: string, lang: string): string {
    const locale = getDateFnsLocaleFromUserLang(lang);
    const formatToDate = new Date(date);
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

export function formatDate(date: string, lang = "en_GB", dayOfWeek = false): string {
    return format(new Date(date), `${dayOfWeek ? "EEEE " : ""}P p`, {
        locale: getDateFnsLocaleFromUserLang(lang),
    });
}

export function formatDateToNow(incomingDate: string, lang: string): string {
    let formatedDate: string;
    const date = new Date(incomingDate);
    const timestampDiff = (new Date().getTime() - new Date(date).getTime()) / 1000;
    const myLanguage = i18n.getFixedT(lang);
    const begin = myLanguage("formatDateToNow.begin");
    const middle = myLanguage("formatDateToNow.middle");
    const end = myLanguage("formatDateToNow.end");

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

export function getDateCompletionPercentage(startDate: string, endDate: string): number {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const now = new Date().getTime();
    return Math.round(((now - start) / (end - start)) * 100);
}
