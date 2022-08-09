/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { OutageItem } from "../../../components/molecules";

export default {
    component: OutageItem,
    title: "Molecules/Notification/OutageItem",
} as Meta;

const Template: ComponentStory<typeof OutageItem> = (args) => {
    return (
        <div className=" bg-neo-bg-A p-2 w-96">
            <OutageItem {...args} />
        </div>
    );
};

export const DefaultOutage = Template.bind({});
DefaultOutage.args = {
    data: {
        id: 1,
        title: "Outage kkhfhhfh",
        content:
            "outage content   Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quod cum nihil quasi deleniti, ut, labore, maxime odio sequi pariatur fugiat suscipit dicta alias corrupti? Accusantium hic laboriosam praesentium est!",
        severity: "major",
        type: "outage",
        startAt: "2021-09-05T06:58:34.000Z",
        endAt: "2021-09-05T06:58:34.000Z",
        displayAt: "2021-09-05T06:58:34.000Z",
        hideAt: null,
    },
    hoverInCallBack: (outage, position) => console.log("outage: " + outage, "position: " + position),
    hoverOutCallBack: (outage, position) => console.log("outage: " + outage, "position: " + position),
    isNotSelected: false,
};
export const DefaultEvent = Template.bind({});
DefaultEvent.args = {
    data: {
        id: 1,
        title: "Event kkhfhhfh",
        content:
            "Event content   Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quod cum nihil quasi deleniti, ut, labore, maxime odio sequi pariatur fugiat suscipit dicta alias corrupti? Accusantium hic laboriosam praesentium est!",
        severity: "",
        type: "event",
        startAt: "2021-09-05T06:58:34.000Z",
        endAt: "2021-09-05T06:58:34.000Z",
        displayAt: "2021-09-05T06:58:34.000Z",
        hideAt: null,
    },
    hoverInCallBack: (outage, position) => console.log("event: " + outage, "position: " + position),
    hoverOutCallBack: (outage, position) => console.log("event: " + outage, "position: " + position),
    isNotSelected: false,
};
