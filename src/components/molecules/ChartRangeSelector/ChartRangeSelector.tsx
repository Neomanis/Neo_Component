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
} from "date-fns";
import { useForm } from "react-hook-form";
import { useTranslation } from "@neomanis/neo-translation";
import { IconChevron } from "@/img/svg";
import { getDateFnsLocaleFromUserLang } from "@/utils/dateTools";
import NeoColors from "@/utils/neoColors";
import { InputDateTime } from "@/components/atoms";
import { addDays, addWeeks } from "date-fns/esm";

export interface ChartRangeSelectorProps {
    fCallBackData: (dates: [number, number]) => void;
    fullSelector?: boolean;
    containerClassName?: string;
}

enum rangeDateValue {
    daily = "daily",
    weekly = "weekly",
    monthly = "monthly",
    quarterly = "quarterly",
    yearly = "yearly",
    custom = "custom",
}

const ChartRangeSelector = ({
    fCallBackData,
    fullSelector = true,
    containerClassName = "",
}: ChartRangeSelectorProps): ReactElement => {
    const { t, i18n } = useTranslation();
    const data = [
        { label: t("date.shortDateSelector.week"), value: rangeDateValue.weekly },
        { label: t("date.shortDateSelector.month"), value: rangeDateValue.monthly },
        { label: t("date.shortDateSelector.quarter"), value: rangeDateValue.quarterly },
        { label: t("date.shortDateSelector.year"), value: rangeDateValue.yearly },
    ];

    if (fullSelector) {
        data.unshift({ label: t("date.day_one"), value: rangeDateValue.daily });
        data.push({ label: t("global.period"), value: rangeDateValue.custom });
    }

    const [typeRangeSelect, setTypeRangeSelect] = useState<rangeDateValue>(data[0].value);
    const [offset, setOffset] = useState<number>(0);

    const [customRange, setCustomRange] = useState<[Date, Date]>([startOfDay(new Date()), endOfDay(new Date())]);

    const refDate: Date = useMemo(() => new Date(), []);

    const formMethods = useForm({ mode: "onChange" });
    function dayRangePicker(date: Date, offsetDay: number): { start: Date; end: Date } {
        const startDate = addDays(startOfDay(date), offsetDay);
        const endDate = addDays(endOfDay(date), offsetDay);
        return { start: startDate, end: endDate };
    }

    function weekRangePicker(date: Date, offsetWeek: number): { start: Date; end: Date } {
        // 1 is monday value on setDay, 7 is sunday
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
        const actualQuarterMonthDates = quarterRange[actualQuarterMonth + 1];
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
            case rangeDateValue.daily:
                return dayRangePicker(refDate, offset);
            case rangeDateValue.weekly:
                return weekRangePicker(refDate, offset);
            case rangeDateValue.monthly:
                return monthRangePicker(refDate, offset);
            case rangeDateValue.quarterly:
                return quarterRangePicker(refDate, offset);
            case rangeDateValue.yearly:
                return yearRangePicker(refDate, offset);
            case rangeDateValue.custom:
                return { start: customRange[0], end: customRange[1] };
            default:
                return dayRangePicker(refDate, refDate.getDay());
        }
    }, [typeRangeSelect, offset, customRange]);

    const textShow = useMemo(() => {
        switch (typeRangeSelect) {
            case rangeDateValue.daily:
                return format(dateRange.start, "EEEE P", {
                    locale: getDateFnsLocaleFromUserLang(i18n.language),
                });
            case rangeDateValue.weekly:
                return `${t("date.shortDateSelector.week")} ${format(dateRange.start, "I yyyy")}`;
            case rangeDateValue.monthly:
                return format(dateRange.start, "MMMM yyyy", {
                    locale: getDateFnsLocaleFromUserLang(i18n.language),
                });
            case rangeDateValue.quarterly:
                return t("date.shortDateSelector.quarter").charAt(0) + format(dateRange.start, "Q yyyy");
            case rangeDateValue.yearly:
                return dateRange.start.getFullYear().toString();
            default:
                return undefined;
        }
    }, [typeRangeSelect, dateRange]);

    const periodDefaultValue = useMemo((): [Date, Date] => [startOfDay(new Date()), endOfDay(new Date())], []);

    useEffect(() => {
        fCallBackData([dateRange.start.getTime(), dateRange.end.getTime()]);
    }, [dateRange]);

    function getWidth(): number {
        switch (typeRangeSelect) {
            case rangeDateValue.daily:
                return 170;
            case rangeDateValue.weekly:
                return 130;
            case rangeDateValue.monthly:
                return 120;
            case rangeDateValue.quarterly:
                return 70;
            case rangeDateValue.yearly:
                return 50;
            default:
                return 100;
        }
    }

    function showUpDate(): boolean {
        return dateRange.start.getTime() <= refDate.getTime() && dateRange.end.getTime() <= refDate.getTime();
    }

    useEffect(() => {
        const subscription = formMethods.watch(({ date_creation_range }, { name, type }) => {
            if (name === "date_creation_range" && type === "change" && date_creation_range[1] !== null) {
                setCustomRange([date_creation_range[0], date_creation_range[1]]);
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
                    <li className="mx-2 flex items-center" key={key}>
                        <p
                            className={`uppercase transition-colors rounded-full px-4 py-1
                        ${
                            item.value === typeRangeSelect
                                ? "bg-neo-blue text-white"
                                : "cursor-pointer hover:bg-neo-blue-secondary hover:text-white"
                        }`}
                            onClick={() => {
                                setTypeRangeSelect(item.value);
                                setOffset(0);
                            }}
                        >
                            {item.label}
                        </p>
                        {item.value === typeRangeSelect && item.value !== rangeDateValue.custom && (
                            <div className="flex items-center">
                                <p className={`mx-2 text-white capitalize`} style={{ width: getWidth() }}>
                                    {textShow}
                                </p>
                                <div>
                                    <div
                                        onClick={() => {
                                            showUpDate() && setOffset(offset + 1);
                                        }}
                                        className={`transform rotate-180 mb-2 p-1
                                    ${showUpDate() ? "cursor-pointer hover:scale-110 transition-all " : "opacity-30"}`}
                                    >
                                        {/* caret up */}
                                        <IconChevron width={15} fill={NeoColors.blue.secondary} />
                                    </div>
                                    <div
                                        onClick={() => {
                                            setOffset(offset - 1);
                                        }}
                                        className="transform hover:scale-110 transition-all hover:cursor-pointer mt-2 p-1"
                                    >
                                        {/* caret down  */}
                                        <IconChevron width={15} fill={NeoColors.blue.secondary} />
                                    </div>
                                </div>
                            </div>
                        )}
                        {item.value === typeRangeSelect && item.value === rangeDateValue.custom && (
                            <InputDateTime
                                className="w-72 px-4 z-50"
                                defaultValue={periodDefaultValue}
                                maxDate={new Date()}
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
