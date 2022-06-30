import { ReactElement, useContext, useState, useEffect, useMemo } from "react";
import {
    getHexColorFromTailwindColor,
    IconChevron,
    getDateFnsLocaleFromUserLang,
    InputDateTime,
} from "@neomanis/neo-component";
import { GlobalContext } from "../../../context/globalContext";
import {
    setISOWeek,
    format,
    setDay,
    getISOWeek,
    getMonth,
    getDaysInMonth,
    addMonths,
    monthsToQuarters,
    addQuarters,
    getYear,
} from "date-fns";
import { useTranslation } from "@neomanis/neo-translation";
import { dayZeroToEnd } from "../../utils/statisticsTool";

interface Props {
    fCallBackData: (dates: [number, number]) => void;
}

enum rangeDateValue {
    daily = "daily",
    weekly = "weekly",
    monthly = "monthly",
    quarterly = "quarterly",
    yearly = "yearly",
    custom = "custom",
}

const ChartRangeSelector = ({ fCallBackData }: Props): ReactElement => {
    const { user } = useContext(GlobalContext);
    const { t } = useTranslation();
    const [typeRangeSelect, setTypeRangeSelect] = useState<rangeDateValue>(rangeDateValue.daily);
    const [offset, setOffset] = useState<number>(0);

    const [customRange, setCustomRange] = useState<[Date, Date]>([
        dayZeroToEnd(new Date()).begining,
        dayZeroToEnd(new Date()).end,
    ]);

    const refDate: Date = useMemo(() => new Date(), []);

    const data = [
        { label: t("date.day_one"), value: rangeDateValue.daily },
        { label: t("date.shortDateSelector.week"), value: rangeDateValue.weekly },
        { label: t("date.shortDateSelector.month"), value: rangeDateValue.monthly },
        { label: t("date.shortDateSelector.quarter"), value: rangeDateValue.quarterly },
        { label: t("date.shortDateSelector.year"), value: rangeDateValue.yearly },
        { label: t("global.period"), value: rangeDateValue.custom },
    ];

    function dayRangePicker(date: Date, offsetDay: number): { start: Date; end: Date } {
        const startDate = setDay(dayZeroToEnd(date).begining, offsetDay, {
            locale: getDateFnsLocaleFromUserLang(user.language ?? "en-GB"),
        });
        const endDate = setDay(dayZeroToEnd(date).end, offsetDay, {
            locale: getDateFnsLocaleFromUserLang(user.language ?? "en-GB"),
        });
        return { start: startDate, end: endDate };
    }

    function weekRangePicker(date: Date, offsetWeek: number): { start: Date; end: Date } {
        // 1 is monday value on setDay, 7 is sunday
        const startDate = setISOWeek(setDay(dayZeroToEnd(date).begining, 1), offsetWeek);
        const endDate = setISOWeek(setDay(dayZeroToEnd(date).end, 7), offsetWeek);
        return { start: setISOWeek(startDate, offsetWeek), end: setISOWeek(endDate, offsetWeek) };
    }

    function monthRangePicker(date: Date, offsetMonth: number): { start: Date; end: Date } {
        const selectedDate = addMonths(date, offsetMonth);
        const daysInMonth = getDaysInMonth(date);
        const year = selectedDate.getFullYear();
        const getMonthFormat = getMonth(selectedDate) + 1;
        const month = getMonthFormat > 9 ? getMonthFormat : `0${getMonthFormat}`;
        const startDate = new Date(
            format(new Date(`${year}/${month}/1`), "yyyy/MM/dd HH:mm:ss", {
                locale: getDateFnsLocaleFromUserLang(user.language ?? "en-GB"),
            })
        );
        const endDate = new Date(
            format(new Date(`${year}/${month}/${daysInMonth}`), "yyyy/MM/dd HH:mm:ss", {
                locale: getDateFnsLocaleFromUserLang(user.language ?? "en-GB"),
            })
        );
        return { start: startDate, end: endDate };
    }

    function quarterRangePicker(date: Date, offsetQuarter: number): { start: Date; end: Date } {
        const quarterRange: Record<number, { startMonth: number; endMonth: number }> = {
            1: { startMonth: 1, endMonth: 3 },
            2: { startMonth: 4, endMonth: 6 },
            3: { startMonth: 7, endMonth: 9 },
            4: { startMonth: 10, endMonth: 12 },
        };
        const selectedDate = addQuarters(date, offsetQuarter);
        const year = selectedDate.getFullYear();
        const actualQuarterMonth = monthsToQuarters(getMonth(selectedDate) + 1);
        const actualQuarterMonthDates = quarterRange[actualQuarterMonth];
        const startDate = new Date(
            format(new Date(`${year}/${actualQuarterMonthDates.startMonth}/1`), "yyyy/MM/dd HH:mm:ss", {
                locale: getDateFnsLocaleFromUserLang(user.language ?? "en-GB"),
            })
        );
        const daysInMonth = getDaysInMonth(new Date(`${year}/${actualQuarterMonthDates.endMonth}/1`));
        const endDate = new Date(
            format(new Date(`${year}/${actualQuarterMonthDates.endMonth}/${daysInMonth}`), "yyyy/MM/dd HH:mm:ss", {
                locale: getDateFnsLocaleFromUserLang(user.language ?? "en-GB"),
            })
        );
        return { start: startDate, end: endDate };
    }

    function yearRangePicker(date: Date, offsetYear: number): { start: Date; end: Date } {
        const year = getYear(date) + offsetYear;
        const startDate = new Date(
            format(new Date(`${year}/01/01`), "yyyy/MM/dd HH:mm:ss", {
                locale: getDateFnsLocaleFromUserLang(user.language ?? "en-GB"),
            })
        );
        const endDate = new Date(
            format(new Date(`${year}/12/31 23:59:59`), "yyyy/MM/dd HH:mm:ss", {
                locale: getDateFnsLocaleFromUserLang(user.language ?? "en-GB"),
            })
        );
        return { start: startDate, end: endDate };
    }

    const dateRange = useMemo(() => {
        switch (typeRangeSelect) {
            case rangeDateValue.daily:
                return dayRangePicker(refDate, refDate.getDay() + offset);
            case rangeDateValue.weekly:
                return weekRangePicker(refDate, getISOWeek(refDate) + offset);
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
        if (user.language) {
            switch (typeRangeSelect) {
                case rangeDateValue.daily:
                    return format(dateRange.start, "EEEE P", {
                        locale: getDateFnsLocaleFromUserLang(user.language),
                    });
                case rangeDateValue.weekly:
                    return `${t("date.shortDateSelector.week")} ${format(dateRange.start, "I yyyy")}`;
                case rangeDateValue.monthly:
                    return format(dateRange.start, "MMMM yyyy", {
                        locale: getDateFnsLocaleFromUserLang(user.language),
                    });
                case rangeDateValue.quarterly:
                    return t("date.shortDateSelector.quarter").charAt(0) + format(dateRange.start, "Q yyyy");
                case rangeDateValue.yearly:
                    return dateRange.start.getFullYear().toString();
                default:
                    return undefined;
            }
        }
    }, [typeRangeSelect, dateRange]);

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

    return (
        <ul className="relative flex text-neo-blue-secondary font-bold text-sm">
            {data.map((item, key) => (
                <li className="mx-2 flex items-center" key={key}>
                    <p
                        className={`uppercase transition-colors rounded-full px-4 py-1
                        ${
                            item.value === typeRangeSelect
                                ? "bg-neo-blue text-white"
                                : "cursor-pointer hover:bg-neo-blue-secondary hover:text-white "
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
                                    className={`transform rotate-180 hover:scale-110 transition-all hover:cursor-pointer mb-2 p-1
                                    ${!showUpDate() && "opacity-0"}`}
                                >
                                    {/* caret up */}
                                    <IconChevron width={15} fill={getHexColorFromTailwindColor("neo-blue-secondary")} />
                                </div>
                                <div
                                    onClick={() => {
                                        setOffset(offset - 1);
                                    }}
                                    className="transform hover:scale-110 transition-all hover:cursor-pointer mt-2 p-1"
                                >
                                    {/* caret down  */}
                                    <IconChevron width={15} fill={getHexColorFromTailwindColor("neo-blue-secondary")} />
                                </div>
                            </div>
                        </div>
                    )}
                    {item.value === typeRangeSelect && item.value === rangeDateValue.custom && (
                        <InputDateTime
                            className="w-72 px-4 z-50"
                            defaultValue={[dayZeroToEnd(new Date()).begining, dayZeroToEnd(new Date()).end]}
                            maxDate={new Date()}
                            refForm="date_creation_range"
                            lang={user.language}
                            fCallBack={(dates) => {
                                const formatDate = dates as [Date, Date];
                                setCustomRange([formatDate[0], formatDate[1]]);
                            }}
                            isRange={true}
                        />
                    )}
                </li>
            ))}
        </ul>
    );
};

export default ChartRangeSelector;
