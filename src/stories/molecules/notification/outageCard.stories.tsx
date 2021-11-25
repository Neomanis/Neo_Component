/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { OutageCard } from "../../..";

export default {
    component: OutageCard,
    title: "Molecules/Notification/OutageCard",
} as Meta;

const Template: ComponentStory<typeof OutageCard> = (args) => {
    return (
        <div className=" bg-neo_bg_A p-2 w-1/2 flex items-center">
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
        severity: "major",
        type: "outage",
        startAt: new Date(),
        endAt: new Date(),
        displayAt: new Date(),
        hideAt: new Date(),
    },
    languageUser: "FR_fr",
};
