import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { IconOutageCategorie } from "../../..";

export default {
    title: "Atoms/Outage/IconOutageCategorie",
    component: IconOutageCategorie,
} as Meta;

const Template: ComponentStory<typeof IconOutageCategorie> = (args) => <IconOutageCategorie {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Intervention = Template.bind({});
Intervention.args = {
    id: 1,
};
export const Outage = Template.bind({});
Outage.args = {
    id: 2,
};
