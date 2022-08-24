/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import NumberAndSLA from "./NumberAndSLA";
import { TicketLogo } from "@/img/svg";

export default {
    component: NumberAndSLA,
    title: "Molecules/charts/NumberAndSLA",
} as Meta;

const Template: ComponentStory<typeof NumberAndSLA> = (args) => {
    return <NumberAndSLA {...args} />;
};

export const Default: ComponentStory<typeof NumberAndSLA> = Template.bind({});
Default.args = {
    title: "Title",
    subtitle: "Subtitle",
    className: "rounded-lg row-span-3 bg-neo-stats-black w-52 h-52",
    svg: <TicketLogo fill={"#FFF"} width={37} />,
    ticketNumber: 8,
};
