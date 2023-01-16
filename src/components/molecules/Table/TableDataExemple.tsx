import { formatDuration, intervalToDuration } from "date-fns";
import { fr } from "date-fns/locale";
import { TableColumn } from "./Table";

interface Data {
    entityName: string;
    timeSpent: number;
}

function getFormatedDuration(timeSpent: number) {
    return intervalToDuration({ start: 0, end: timeSpent * 60 * 1000 });
}

export const columns: TableColumn<Data>[] = [
    { key: "entityName", title: "Entity" },
    {
        key: "timeSpent",
        title: "Time spent",
        render: (_, { timeSpent }) => <span>{formatDuration(getFormatedDuration(timeSpent), { locale: fr })}</span>,
    },
];

export const data: Data[] = [
    { entityName: "The Elephant", timeSpent: 210 },
    { entityName: "Bain", timeSpent: 180 },
    { entityName: "Vlad", timeSpent: 501 },
    { entityName: "Hector", timeSpent: 22 },
    { entityName: "The Dentist", timeSpent: 1930 },
    { entityName: "The Butcher", timeSpent: 70 },
    { entityName: "The Continental", timeSpent: 687 },
    { entityName: "Locke", timeSpent: 77 },
];
