import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { Title } from "../..";

export default {
    title: "Atoms/Title",
    component: Title,
} as Meta;

const Template: ComponentStory<typeof Title> = (args) => <Title {...args} />;

export const h1 = Template.bind({});
h1.args = {
    type: "h1",
    data: "Title H1",
};
export const h2 = Template.bind({});
h2.args = {
    type: "h2",
    data: "Title H2",
};
export const h3 = Template.bind({});
h3.args = {
    type: "h3",
    data: "Title H3",
};
export const h4 = Template.bind({});
h4.args = {
    type: "h4",
    data: "Title H4",
};
