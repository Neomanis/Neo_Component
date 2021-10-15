/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { BrowserRouter as Router } from "react-router-dom";

import { LinkComp } from "../..";

export default {
    component: LinkComp,
    title: "Atoms/Link",
} as Meta;

const Template: ComponentStory<typeof LinkComp> = (args) => (
    <Router>
        <LinkComp {...args} />
    </Router>
);

export const Default = Template.bind({});
Default.args = {
    children: "Exemple",
    fCallBack: () => console.log("ok"),
    href: "https://##.com",
};
export const LinkRouter = Template.bind({});
LinkRouter.args = {
    children: "Another exemple",
    className: "text-red",
    fCallBack: () => console.log("ok"),
    href: "https://##.com",
    type: "linkRouter",
};
