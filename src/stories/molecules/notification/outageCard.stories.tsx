/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { OutageCard } from "../../../components/molecules";

export default {
    component: OutageCard,
    title: "Molecules/Notification/OutageCard",
} as Meta;

const Template: ComponentStory<typeof OutageCard> = (args) => {
    return (
        <div className=" bg-neo-bg-A p-2 w-1/2">
            <OutageCard {...args} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    data: {
        id: 1,
        title: "Outage title",
        content:
            "outage content   Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quod cum nihil quasi deleniti, ut, labore, maxime odio sequi pariatur fugiat suscipit dicta alias corrupti? Accusantium hic laboriosam praesentium est!",
        severity: "",
        type: "outage",
        startAt: "2021-09-05T06:58:34.000Z",
        endAt: "2021-09-05T06:58:34.000Z",
        displayAt: "2021-09-05T06:58:34.000Z",
        hideAt: null,
    },
    svgFill: "#15304C",
};
