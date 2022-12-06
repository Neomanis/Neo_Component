/* eslint-disable no-console */
import { useState } from "react";
import { Meta, Story } from "@storybook/react";

import ChartRangeSelector, { Props } from "./ChartRangeSelector";

export default {
    component: ChartRangeSelector,
    title: "Molecules/Statistics/ChartRangeSelector",
} as Meta;

export const Default: Story<Props> = () => {
    return (
        <ChartRangeSelector
            fCallBackData={(date) => console.log(date)}
            defaultValue={{
                period: "weekly",
                dates: {
                    start: new Date("Wed Sep 1 2012 00:00:00 GMT+0200"),
                    end: new Date("Wed Sep 1 2012 23:59:59 GMT+0200"),
                },
            }}
        />
    );
};

export const WithReset: Story<Props> = () => {
    const [reset, setReset] = useState(false);
    const [dates, setDates] = useState<{ start: string; end: string }>();
    return (
        <div className="flex-col">
            <button className="text-neo-red" onClick={() => setReset(true)}>
                reset me
            </button>
            <ChartRangeSelector
                fCallBackData={(dates) => {
                    if (dates.dates.start && dates.dates.end) {
                        setDates({ start: dates.dates.start.toISOString(), end: dates.dates.end.toISOString() });
                    }
                }}
                defaultValue={{
                    period: "daily",
                    dates: {
                        start: new Date(),
                        end: new Date(),
                    },
                }}
                resetDates={{ reset, setter: setReset }}
            />
            <p className="text-neo-light-grey">START: {dates?.start ?? ""}</p>
            <p className="text-neo-light-grey">END: {dates?.end ?? ""}</p>
        </div>
    );
};

export const Partial: Story<Props> = () => {
    return (
        <ChartRangeSelector
            fCallBackData={(date) => console.log(date)}
            fullSelector={false}
            containerClassName="border border-2 rounded p-2"
        />
    );
};
