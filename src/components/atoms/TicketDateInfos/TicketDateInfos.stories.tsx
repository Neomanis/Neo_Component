/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { addDays } from "date-fns";

import TicketDateInfos from "./TicketDateInfos";

export default {
    component: TicketDateInfos,
    title: "Atoms/TicketDateInfos",
} as Meta;

const Template: ComponentStory<typeof TicketDateInfos> = (args) => {
    return (
        <div className="w-1/2">
            <TicketDateInfos {...args} />
        </div>
    );
};

export const Fr: ComponentStory<typeof TicketDateInfos> = Template.bind({});
Fr.args = {
    createdAt: new Date(2022, 9, 18, 17, 44, 23).toISOString(),
    updatedAt: new Date().toISOString(),
    userAssigned: "Admin Admintest",
    userLanguage: "fr-FR",
};

export const Today: ComponentStory<typeof TicketDateInfos> = Template.bind({});
Today.args = {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userAssigned: "Admin Admintest",
};

export const ThisWeek: ComponentStory<typeof TicketDateInfos> = Template.bind({});
ThisWeek.args = {
    createdAt: addDays(new Date(), 2).toISOString(),
    updatedAt: addDays(new Date(), 3).toISOString(),
    userAssigned: "Admin Admintest",
};

export const Later: ComponentStory<typeof TicketDateInfos> = Template.bind({});
Later.args = {
    createdAt: addDays(new Date(), 12).toISOString(),
    updatedAt: addDays(new Date(), 13).toISOString(),
    userAssigned: "Admin Admintest",
};
