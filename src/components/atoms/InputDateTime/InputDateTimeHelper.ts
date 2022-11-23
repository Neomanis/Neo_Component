import { closestIndexTo, parse, isAfter } from "date-fns";
import { enGB, enUS, fr } from "date-fns/locale";

export const locales = { "en-GB": enGB, "en-US": enUS, "fr-FR": fr };

export function createHourListElement(content: string) {
    const element = document.createElement("li");
    element.innerHTML = content;
    element.className =
        "react-datepicker__time-list-item bg-neo-stats-black react-datepicker__time-list-item--selected";
    element.dataset.temporary = "true";
    return element;
}

export function insertElementInList(list: HTMLUListElement, element: HTMLLIElement, index: number) {
    const newElement = list.insertBefore(element, list.children[index]);
    list.scrollTo(0, newElement.offsetTop - list.clientHeight / 2);
}

export function checkAndRemoveTemporaryElement(list: HTMLUListElement) {
    [...(list.children as HTMLCollectionOf<HTMLElement>)].forEach((element) => {
        if (element.dataset.temporary) {
            element.remove();
        }
    });
}

export function getListIndexBetweenDates(
    dates: string[],
    date: Date,
    dateFormat: string,
    locale: keyof typeof locales
) {
    let index = closestIndexTo(
        date,
        dates.map((text) => parse(text, dateFormat, date, { locale: locales[locale] }))
    );

    if (index && !isAfter(parse(dates[index], dateFormat, date, { locale: locales[locale] }), date)) {
        index++;
    }

    return index;
}

export function getTimeList() {
    const timeList: HTMLUListElement | null = document.querySelector(".react-datepicker__time-list");
    if (timeList) {
        checkAndRemoveTemporaryElement(timeList);
    }
    return { timeList, dates: [...(timeList?.children ?? [])].map((element) => element.innerHTML) };
}
