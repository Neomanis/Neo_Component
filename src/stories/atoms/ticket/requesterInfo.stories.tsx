import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { RequesterInfo } from "../../..";

export default {
    component: RequesterInfo,
    title: "Atoms/Ticket/RequesterInfo",
} as Meta;

const Template: ComponentStory<typeof RequesterInfo> = (args) => (
    <div className="bg-neo-bg-B p-2">
        <RequesterInfo {...args} />
    </div>
);

export const UserRequester = Template.bind({});
UserRequester.args = {
    isGroup: false,
    requesterName: "Mario Duplantier ",
};

export const GroupRequester = Template.bind({});
GroupRequester.args = {
    isGroup: true,
    requesterName: "Gojira",
};
