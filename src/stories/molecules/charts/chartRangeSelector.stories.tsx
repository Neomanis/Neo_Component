/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import ChartRangeSelector from "../../../components/molecules/charts/chartRangeSelector";

export default {
    component: ChartRangeSelector,
    title: "Molecules/charts/ChartRangeSelector",
} as Meta;

const Template: ComponentStory<typeof ChartRangeSelector> = (args) => (
    <div className="p-8 bg-neo-bg-A">
        <ChartRangeSelector {...args} />
    </div>
);

export const Default = Template.bind({});
Default.args = {
    fCallBackData: (dates) => console.log(dates),
};

export const Partial = Template.bind({});
Partial.args = {
    fCallBackData: (dates) => console.log(dates),
    fullSelector: false,
    classContainer: "border border-2 rounded p-2",
};
