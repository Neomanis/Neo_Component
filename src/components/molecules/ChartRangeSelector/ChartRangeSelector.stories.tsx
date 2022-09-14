/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import ChartRangeSelector from "./ChartRangeSelector";

export default {
    component: ChartRangeSelector,
    title: "Molecules/Statistics/ChartRangeSelector",
} as Meta;

const Template: ComponentStory<typeof ChartRangeSelector> = (args) => {
    return <ChartRangeSelector {...args} />;
};

export const Default: ComponentStory<typeof ChartRangeSelector> = Template.bind({});
Default.args = {
    fCallBackData: (date) => console.log(date),
    defaultValue: {
        period: "weekly",
        dates: {
            start: new Date("Wed Sep 1 2012 00:00:00 GMT+0200"),
            end: new Date("Wed Sep 1 2012 23:59:59 GMT+0200"),
        },
    },
};

export const Partial: ComponentStory<typeof ChartRangeSelector> = Template.bind({});
Partial.args = {
    fCallBackData: (date) => console.log(date),
    fullSelector: false,
    containerClassName: "border border-2 rounded p-2",
};
