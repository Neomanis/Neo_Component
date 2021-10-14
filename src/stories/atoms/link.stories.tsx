import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { BrowserRouter as Router } from "react-router-dom";
import { LinkComp } from "../..";
export default {
    title: "Atoms/Link",
    component: LinkComp,
} as Meta;

const Template: ComponentStory<typeof LinkComp> = (args) => (
    <Router>
        <LinkComp {...args} />
    </Router>
);

export const Default = Template.bind({});
Default.args = {
    href: "https://##.com",
    children: "Exemple",
    // eslint-disable-next-line no-console
    fCallBack: () => console.log("ok"),
};
export const LinkRouter = Template.bind({});
LinkRouter.args = {
    href: "https://##.com",
    children: "Another exemple",
    className: "text-red",
    type: "linkRouter",
    // eslint-disable-next-line no-console
    fCallBack: () => console.log("ok"),
};
