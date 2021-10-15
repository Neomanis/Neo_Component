import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { Title } from "../..";

export default {
    component: Title,
    title: "Atoms/Title",
} as Meta;

const Template: ComponentStory<typeof Title> = (args) => <Title {...args} />;

export const h1 = Template.bind({});
h1.args = {
    data: "Title H1",
    type: "h1",
};
export const h2 = Template.bind({});
h2.args = {
    data: "Title H2",
    type: "h2",
};
export const h3 = Template.bind({});
h3.args = {
    data: "Title H3",
    type: "h3",
};
export const h4 = Template.bind({});
h4.args = {
    data: "Title H4",
    type: "h4",
};
