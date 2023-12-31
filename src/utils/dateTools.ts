import { i18n } from "@neomanis/neo-translation";
import {
    formatDistanceToNowStrict,
    Locale,
    format,
    isFuture,
    getTime,
    intervalToDuration,
    isToday,
    isThisWeek,
} from "date-fns";
import { enUS, enGB, fr } from "date-fns/locale";
import { lowerCaseFirstLetter } from "./tools";

export function getTimeToNowWithTranslation(date: string, lang?: string): string {
    const dateTicket = new Date(date);
    const formatedDate = formatDistanceToNowStrict(dateTicket).split(" ");

    const myLanguage = i18n.getFixedT(lang ? lang : "en-US");

    // if formatDistanceToNowStrict is using 'hour' unit, we have to compute difference
    // between dates ourselves to display hours and minutes in HH:mm format
    if (formatedDate[1].startsWith("hour")) {
        const timeDistanceToNow = intervalToDuration({ start: new Date(), end: dateTicket });
        return (
            ("0" + JSON.stringify(timeDistanceToNow.hours)).slice(-2) +
            " : " +
            ("0" + JSON.stringify(timeDistanceToNow.minutes)).slice(-2)
        );
    }

    if (formatedDate[1].slice(-1) === "s") {
        formatedDate[1] = formatedDate[1].slice(0, -1);
    }

    // if formatDistanceToNowStrict is usign 'minute' or 'second' unit, we will use abbreviated translation
    if (formatedDate[1].startsWith("second") || formatedDate[1].startsWith("minute")) {
        return ("0" + formatedDate[0]).slice(-2) + " " + myLanguage(`date.${"abbreviated." + formatedDate[1]}`);
    }

    // in other cases, we just use classic translation
    return formatedDate[0] + " " + myLanguage(`date.${formatedDate[1]}`, { count: Number(formatedDate[0]) });
}

export function getFormatedTimeToNowExtended(date: string, lang: string | undefined): string {
    const formatToDate = new Date(date);
    const delay = getTime(formatToDate) - Date.now();
    const myLanguage = i18n.getFixedT(lang ? lang : "en-US");
    // We define 500 ms to fit formatDistanceToNowStrict rounding method (round)
    if (isFuture(formatToDate) || delay >= -500) {
        return myLanguage("global.now").toLowerCase();
    }
    const locale = getDateFnsLocaleFromUserLang(lang ?? "");
    return formatDistanceToNowStrict(formatToDate, {
        addSuffix: true,
        locale: locale,
    });
}

export function getDateFnsLocaleFromUserLang(lang: string): Locale {
    switch (lang) {
        case "en-US":
            return enUS;
        case "fr-FR":
            return fr;
        case "en-GB":
            return enGB;
        default:
            return enGB;
    }
}

interface FormatDateOption {
    lang?: string;
    dayOfWeek?: boolean;
    withSecond?: boolean;
}
export function formatDate(date: string, option?: FormatDateOption): string {
    option = option ?? {};
    option.lang = option.lang ?? "en-GB";
    option.dayOfWeek = option.dayOfWeek ?? false;
    option.withSecond = option.withSecond ?? false;
    return format(new Date(date), `${option.dayOfWeek ? "EEEE " : ""}P p${option.withSecond ? ":ss" : ""}`, {
        locale: getDateFnsLocaleFromUserLang(option.lang),
    });
}

//30 days in ms ==> 2678400000 ms
export function getFormatDateOrTimeToNow(date: string, limitInMs: number, lang: string): string {
    if (new Date().getTime() - new Date(date).getTime() <= limitInMs) {
        return getFormatedTimeToNowExtended(date, lang);
    }
    return formatDate(date, { lang: lang });
}

export function formatDateToNow(incomingDate: string, lang: string): string {
    let formatedDate: string;
    const date = new Date(incomingDate);
    const myLanguage = i18n.getFixedT(lang);
    const begin = myLanguage("date.formatDateToNow.begin");
    const middle = myLanguage("date.formatDateToNow.middle");
    const end = myLanguage("date.formatDateToNow.end");
    const todayT = myLanguage("date.today");
    const at = myLanguage("date.at");

    if (isToday(date)) {
        formatedDate = `${todayT} ${at} ${format(date, `p`, {
            locale: getDateFnsLocaleFromUserLang(lang),
        })}`;
    } else if (isThisWeek(date)) {
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

export function formatDateToNowDateLess(incomingDate: string, lang: string): string {
    let formatedDate: string;
    const date = new Date(incomingDate);
    const myLanguage = i18n.getFixedT(lang);
    const begin = myLanguage("date.formatDateToNow.begin");
    const todayT = myLanguage("date.today");

    if (isToday(date)) {
        formatedDate = `${todayT}`;
    } else if (isThisWeek(date)) {
        formatedDate = format(date, "eeee", {
            locale: getDateFnsLocaleFromUserLang(lang),
        });
    } else {
        formatedDate = format(date, `${begin}P`, {
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

export function getOutageDateInformation(
    period: { startAt: string; endAt?: string },
    lang: string,
    options?: { shortenedMonthNames: boolean }
) {
    const t = i18n.getFixedT(lang);
    const month = options?.shortenedMonthNames ? "MMM" : "MMMM";
    const dateFormat =
        lang === "fr-FR"
            ? `d ${month} ${t("date.formatDateToNow.at")} H:mm`
            : `${month} do ${t("date.formatDateToNow.at")} H:mm`;
    const startAt = format(new Date(period.startAt), dateFormat, {
        locale: getDateFnsLocaleFromUserLang(lang),
    });
    if (!period.endAt) {
        return `${t("date.since")} ${startAt}`;
    } else {
        const endAt = format(new Date(period.endAt), dateFormat, {
            locale: getDateFnsLocaleFromUserLang(lang),
        });
        return `${t("date.from")} ${startAt} ${lowerCaseFirstLetter(t("date.to"))} ${endAt}`;
    }
}

export function convertDuration(ms: number) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return days + "d";
    } else if (hours > 0) {
        return hours + "h";
    } else if (minutes > 0) {
        return minutes + "min";
    } else if (seconds > 0) {
        return seconds + "s";
    } else {
        return ms + "ms";
    }
}
