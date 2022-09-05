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
    fCallBackData: ([start, end]) => console.log(new Date(start), new Date(end)),
};

export const Partial: ComponentStory<typeof ChartRangeSelector> = Template.bind({});
Partial.args = {
    fCallBackData: ([start, end]) => console.log(new Date(start), new Date(end)),
    fullSelector: false,
    containerClassName: "border border-2 rounded p-2",
};
