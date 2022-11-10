/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import Output from "./Output";

export default {
    component: Output,
    title: "Atoms/Output",
} as Meta;

const Template: ComponentStory<typeof Output> = (args) => {
    return (
        <div className="bg-neo-bg-A p-5 w-1/3">
            <Output {...args} />
        </div>
    );
};

export const Default: ComponentStory<typeof Output> = Template.bind({});
Default.args = {
    title: "Output",
    description: "PRE01-ad01.pre01.neo",
};
