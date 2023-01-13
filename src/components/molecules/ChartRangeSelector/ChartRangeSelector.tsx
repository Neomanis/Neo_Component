import React, { ReactElement, useEffect, useMemo, useState } from "react";
import {
    startOfDay,
    endOfDay,
    startOfISOWeek,
    endOfISOWeek,
    addMonths,
    startOfMonth,
    endOfMonth,
    addQuarters,
    monthsToQuarters,
    getMonth,
    getYear,
    format,
    addDays,
    addWeeks,
    isDate,
} from "date-fns";
import { useForm } from "react-hook-form";
import { useTranslation } from "@neomanis/neo-translation";
import { IconChevron } from "@/img/svg";
import { getDateFnsLocaleFromUserLang } from "@/utils/dateTools";
import { InputDateTime } from "@/components/atoms";
import { RangeDateValue } from "@neomanis/neo-types";
import { classNames } from "@/utils";

export interface Props {
    fCallBackData: (dates: { period: RangeDateValue; dates: { start: Date; end: Date } }) => void;
    fullSelector?: boolean;
    containerClassName?: string;
    defaultValue?: { period: RangeDateValue | undefined; dates?: { start: Date; end: Date } };
    resetDates?: { reset: boolean; setter: (val: boolean) => void };
}

const ChartRangeSelector = ({
    fCallBackData,
    fullSelector = true,
    containerClassName = "",
    defaultValue = { period: "daily", dates: { start: new Date(), end: new Date() } },
    resetDates,
}: Props): ReactElement => {
    const { t, i18n } = useTranslation();
    const data: { label: string; value: RangeDateValue }[] = [
        { label: t("date.shortDateSelector.week"), value: "weekly" },
        { label: t("date.shortDateSelector.month"), value: "monthly" },
        { label: t("date.shortDateSelector.quarter"), value: "quarterly" },
        { label: t("date.shortDateSelector.year"), value: "yearly" },
    ];

    const refDate: Date = useMemo(() => new Date(), []);
    if (fullSelector) {
        data.unshift({ label: t("date.day_one"), value: "daily" });
        data.push({ label: t("global.period"), value: "custom" });
    }

    const [typeRangeSelect, setTypeRangeSelect] = useState<RangeDateValue>(defaultValue.period);
    const [offset, setOffset] = useState<number>(0);

    const [customRange, setCustomRange] = useState<{ start: Date; end: Date }>({
        start:
            defaultValue.dates?.start && isDate(defaultValue.dates.start)
                ? startOfDay(defaultValue.dates.start)
                : startOfDay(refDate),
        end:
            defaultValue.dates?.end && isDate(defaultValue.dates.end)
                ? endOfDay(defaultValue.dates.end)
                : endOfDay(refDate),
    });

    const formMethods = useForm({ mode: "onChange" });

    function dayRangePicker(date: Date, offsetDay: number): { start: Date; end: Date } {
        const startDate = addDays(startOfDay(date), offsetDay);
        const endDate = addDays(endOfDay(date), offsetDay);
        return { start: startDate, end: endDate };
    }

    function weekRangePicker(date: Date, offsetWeek: number): { start: Date; end: Date } {
        const startDate = addWeeks(startOfISOWeek(date), offsetWeek);
        const endDate = addWeeks(endOfISOWeek(date), offsetWeek);
        return { start: startDate, end: endDate };
    }

    function monthRangePicker(date: Date, offsetMonth: number): { start: Date; end: Date } {
        const selectedDate = addMonths(date, offsetMonth);
        return { start: startOfMonth(selectedDate), end: endOfMonth(selectedDate) };
    }

    function quarterRangePicker(date: Date, offsetQuarter: number): { start: Date; end: Date } {
        const quarterRange: Record<number, { startMonth: number; endMonth: number }> = {
            1: { startMonth: 0, endMonth: 2 },
            2: { startMonth: 3, endMonth: 5 },
            3: { startMonth: 6, endMonth: 8 },
            4: { startMonth: 9, endMonth: 11 },
        };
        const selectedDate = addQuarters(date, offsetQuarter);
        const year = selectedDate.getFullYear();
        const actualQuarterMonth = monthsToQuarters(getMonth(selectedDate) + 1);
        const actualQuarterMonthDates = quarterRange[actualQuarterMonth];
        return {
            start: startOfMonth(new Date(year, actualQuarterMonthDates.startMonth)),
            end: endOfMonth(new Date(year, actualQuarterMonthDates.endMonth)),
        };
    }

    function yearRangePicker(date: Date, offsetYear: number): { start: Date; end: Date } {
        const year = getYear(date) + offsetYear;
        const startDate = new Date(
            format(new Date(`${year}/01/01`), "yyyy/MM/dd HH:mm:ss", {
                locale: getDateFnsLocaleFromUserLang(i18n.language),
            })
        );
        const endDate = new Date(
            format(new Date(`${year}/12/31 23:59:59`), "yyyy/MM/dd HH:mm:ss", {
                locale: getDateFnsLocaleFromUserLang(i18n.language),
            })
        );
        return { start: startDate, end: endDate };
    }

    const dateRange = useMemo(() => {
        switch (typeRangeSelect) {
            case "daily":
                return dayRangePicker(defaultValue.dates?.start ?? refDate, offset);
            case "weekly":
                return weekRangePicker(defaultValue.dates?.start ?? refDate, offset);
            case "monthly":
                return monthRangePicker(defaultValue.dates?.start ?? refDate, offset);
            case "quarterly":
                return quarterRangePicker(defaultValue.dates?.start ?? refDate, offset);
            case "yearly":
                return yearRangePicker(defaultValue.dates?.start ?? refDate, offset);
            case "custom":
                return {
                    start: isDate(customRange.start) ? customRange.start : startOfDay(refDate),
                    end: isDate(customRange.end) ? customRange.end : endOfDay(refDate),
                };
            default:
                return dayRangePicker(refDate, refDate.getDay());
        }
    }, [typeRangeSelect, offset, customRange]);

    const textShow = useMemo(() => {
        switch (typeRangeSelect) {
            case "daily":
                return format(dateRange.start, "EEEE P", {
                    locale: getDateFnsLocaleFromUserLang(i18n.language),
                });
            case "weekly":
                return `${t("date.shortDateSelector.week")} ${format(dateRange.start, "I yyyy")}`;
            case "monthly":
                return format(dateRange.start, "MMMM yyyy", {
                    locale: getDateFnsLocaleFromUserLang(i18n.language),
                });
            case "quarterly":
                return t("date.shortDateSelector.quarter").charAt(0) + format(dateRange.start, "Q yyyy");
            case "yearly":
                return dateRange.start.getFullYear().toString();
            default:
                return undefined;
        }
    }, [typeRangeSelect, dateRange]);

    const periodDefaultValue = useMemo(
        (): [Date, Date] => [
            startOfDay(defaultValue.dates?.start ?? refDate),
            endOfDay(defaultValue.dates?.end ?? refDate),
        ],
        []
    );

    useEffect(() => {
        fCallBackData({ period: typeRangeSelect, dates: { start: dateRange.start, end: dateRange.end } });
    }, [dateRange]);

    useEffect(() => {
        if (resetDates && resetDates.reset) {
            setCustomRange({
                start: refDate,
                end: refDate,
            });
            setTypeRangeSelect(defaultValue.period);
            resetDates.setter(false);
        }
    }, [resetDates]);

    function getWidth(): number {
        switch (typeRangeSelect) {
            case "daily":
                return 170;
            case "weekly":
                return 130;
            case "monthly":
                return 120;
            case "quarterly":
                return 70;
            case "yearly":
                return 50;
            default:
                return 100;
        }
    }

    function showUpDate(): boolean {
        if (dateRange.start && dateRange.end) {
            return dateRange.start.getTime() <= refDate.getTime() && dateRange.end.getTime() <= refDate.getTime();
        }
        return false;
    }

    useEffect(() => {
        const subscription = formMethods.watch(({ date_creation_range }, { name, type }) => {
            if (name === "date_creation_range" && type === "change" && date_creation_range[1] !== null) {
                setCustomRange({ start: date_creation_range[0], end: date_creation_range[1] });
            }
        });
        return () => subscription.unsubscribe();
    }, [formMethods.watch]);

    return (
        <div className={containerClassName}>
            <ul
                data-testid="chartRangeSelector-body"
                className="relative flex text-neo-blue-secondary font-bold text-sm"
            >
                {data.map((item, key) => (
                    <li className="mx-2 flex items-center transition-all" key={key}>
                        <p
                            className={classNames(
                                "uppercase rounded-full px-4 py-1 transition-all",
                                item.value === typeRangeSelect
                                    ? "bg-neo-blue text-white"
                                    : "cursor-pointer hover:bg-neo-blue-secondary hover:text-white hover:scale-110"
                            )}
                            onClick={() => {
                                setTypeRangeSelect(item.value);
                                setOffset(0);
                            }}
                        >
                            {item.label}
                        </p>
                        {item.value === typeRangeSelect && item.value !== "custom" && (
                            <div className="flex items-center">
                                <p className="mx-2 text-white capitalize" style={{ width: getWidth() }}>
                                    {textShow}
                                </p>
                                <div>
                                    <div
                                        onClick={() => {
                                            showUpDate() && setOffset(offset + 1);
                                        }}
                                        className={classNames(
                                            "transform rotate-180 mb-2 p-1 group",
                                            showUpDate()
                                                ? "cursor-pointer hover:scale-110 transition-all"
                                                : "opacity-30"
                                        )}
                                    >
                                        {/* caret up */}
                                        <IconChevron
                                            className={classNames(
                                                showUpDate() &&
                                                    "opacity-60 group-hover:opacity-100 group-hover:animate-bounce",
                                                "w-4 fill-neo-blue-secondary"
                                            )}
                                        />
                                    </div>
                                    <div
                                        onClick={() => {
                                            setOffset(offset - 1);
                                        }}
                                        className="transform hover:scale-110 rotate-180 transition-all hover:cursor-pointer mt-2 p-1 group "
                                    >
                                        {/* caret down  */}
                                        <div className="rotate-180">
                                            <IconChevron className="w-4 fill-neo-blue-secondary group-hover:animate-bounce opacity-60 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {item.value === typeRangeSelect && item.value === "custom" && (
                            <InputDateTime
                                className="w-72 px-4 z-50"
                                defaultValue={periodDefaultValue}
                                maxDate={refDate}
                                refForm="date_creation_range"
                                lang={i18n.language}
                                formMethods={formMethods}
                                isRange
                            />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChartRangeSelector;
