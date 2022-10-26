/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import TicketDateInfos from "./TicketDateInfos";

export default {
    component: TicketDateInfos,
    title: "Atoms/TicketDateInfos",
} as Meta;

const Template: ComponentStory<typeof TicketDateInfos> = (args) => {
    return (
        <div className="w-4/8">
            <TicketDateInfos {...args} />
        </div>
    );
};

export const Default: ComponentStory<typeof TicketDateInfos> = Template.bind({});
Default.args = {
    createdAt: new Date(2022, 9, 18, 17, 44, 23).toISOString(),
    updatedAt: new Date().toISOString(),
};
