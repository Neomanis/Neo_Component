import { formatDistanceToNowStrict, Locale } from "date-fns";
import { enUS, enGB, fr } from "date-fns/locale";

export function getFormatedTimeToNow(date: string): string {
    const dateTicket = new Date(date.includes(" ") ? date.replace(" ", "T") + "Z" : date);
    const formatedDate = formatDistanceToNowStrict(dateTicket).split(" ");
    return formatedDate[0] + formatedDate[1].charAt(0).toUpperCase();
}

export function getFormatedTimeToNowExtended(date: string, lang: string): string {
    const locale = getDateFnsLocaleFromUserLang(lang);
    const formatToDate = new Date(date.includes(" ") ? date.replace(" ", "T") + "Z" : date);
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

export function formatDateToNow(date: string, lang: string): string {
    let formatedDate = "DateError";
    const dateForm = new Date(date);
    const timestampDiff = (new Date().getTime() - Date.parse(date)) / 1000;
    lang = lang.replace("_", "-");

    switch (lang) {
        case "fr-FR":
            if (timestampDiff < 24 * 60 * 60) {
                formatedDate = `${dateForm.getHours()}:${dateForm.getMinutes()}`;
            } else if (timestampDiff < 7 * 24 * 60 * 60) {
                formatedDate = `${dateForm.toLocaleDateString(lang, {
                    weekday: "long",
                })} à ${dateForm.getHours()}:${dateForm.getMinutes()}`;
                formatedDate = formatedDate[0].toUpperCase() + formatedDate.slice(1);
            } else {
                formatedDate = `le ${dateForm.toLocaleDateString(
                    lang
                )} à ${dateForm.getHours()}:${dateForm.getMinutes()}`;
            }
            break;

        case "en-US":
            if (timestampDiff < 24 * 60 * 60) {
                formatedDate = getEnglishHour(dateForm);
            } else if (timestampDiff < 7 * 24 * 60 * 60) {
                formatedDate = `${dateForm.toLocaleDateString(lang, {
                    weekday: "long",
                })}, ${getEnglishHour(dateForm)}`;
            } else {
                formatedDate = `${dateForm.toLocaleDateString(lang, {
                    month: "2-digit",
                    day: "2-digit",
                    year: "2-digit",
                })}, ${getEnglishHour(dateForm)}`;
            }
            break;

        // enUS and enGB date format
        default:
            if (timestampDiff < 24 * 60 * 60) {
                formatedDate = getEnglishHour(dateForm);
            } else if (timestampDiff < 7 * 24 * 60 * 60) {
                formatedDate = `${dateForm.toLocaleDateString("en-GB", {
                    weekday: "long",
                })}, ${getEnglishHour(dateForm)}`;
            } else {
                formatedDate = `${dateForm.toLocaleDateString("en-GB")}, ${getEnglishHour(dateForm)}`;
            }
            break;
    }

    return formatedDate;
}

function getEnglishHour(date: Date): string {
    const hour = date.getHours();
    let displayHour = hour;
    let suffix = "AM";
    if (hour == 0) {
        displayHour = 12;
    } else if (hour > 12) {
        displayHour = hour - 12;
        suffix = "PM";
    } else if (hour == 12) {
        suffix = "PM";
    }
    const englishTime = `${displayHour}:${date.getMinutes()} ${suffix}`;
    return englishTime;
}
