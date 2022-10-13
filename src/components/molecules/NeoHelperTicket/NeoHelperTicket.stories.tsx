/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import NeoHelperTicket from "./NeoHelperTicket";
import { fakeTicket } from "@/utils/storiesData/fakeObject";
import { faServer } from "@fortawesome/free-solid-svg-icons";

export default {
    component: NeoHelperTicket,
    title: "NeoHelperTicket",
} as Meta;

const Template: ComponentStory<typeof NeoHelperTicket> = (args) => {
    return (
        <div className="w-[260px]">
            <NeoHelperTicket {...args} />;
        </div>
    );
};

export const Default: ComponentStory<typeof NeoHelperTicket> = Template.bind({});
Default.args = {
    ticket: fakeTicket,
    categoryIcon: faServer,
};
