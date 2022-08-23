/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import OutageCard from "./OutageCard";
import { Role } from "@neomanis/neo-types";

export default {
    component: OutageCard,
    title: "Molecules/Notification/OutageCard",
} as Meta;

const Template: ComponentStory<typeof OutageCard> = (args) => {
    return <OutageCard {...args} />;
};

export const Default: ComponentStory<typeof OutageCard> = Template.bind({});
Default.args = {
    data: {
        id: 1,
        title: "Outage kkhfhhfh fkdskfdk k fkdskfkdskfk",
        content:
            "outage content   Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quod cum nihil quasi deleniti, ut, labore, maxime odio sequi pariatur fugiat suscipit dicta alias corrupti? Accusantium hic laboriosam praesentium est!",
        severity: "",
        type: "outage",
        startAt: "2021-09-05T06:58:34.000Z",
        endAt: "2021-09-05T06:58:34.000Z",
        displayAt: "2021-09-05T06:58:34.000Z",
        hideAt: null,
        entities: [],
    },
    role: Role.ADMINISTRATOR,
    hoverInCallBack: () => console.log("in"),
    hoverOutCallBack: () => console.log("out"),
    modifCallBack: (data) => console.log(data),
    deleteCallBack: (id) => console.log(id),
};

export const OutageWithoutRole: ComponentStory<typeof OutageCard> = Template.bind({});
OutageWithoutRole.args = {
    data: {
        id: 1,
        title: "Outage kkhfhhfh fkdskfdk k fkdskfkdskfk",
        content:
            "outage content   Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quod cum nihil quasi deleniti, ut, labore, maxime odio sequi pariatur fugiat suscipit dicta alias corrupti? Accusantium hic laboriosam praesentium est!",
        severity: "",
        type: "outage",
        startAt: "2021-09-05T06:58:34.000Z",
        endAt: "2021-09-05T06:58:34.000Z",
        displayAt: "2021-09-05T06:58:34.000Z",
        hideAt: null,
        entities: [],
    },
    hoverInCallBack: () => console.log("in"),
    hoverOutCallBack: () => console.log("out"),
    modifCallBack: (data) => console.log(data),
    deleteCallBack: (id) => console.log(id),
};
