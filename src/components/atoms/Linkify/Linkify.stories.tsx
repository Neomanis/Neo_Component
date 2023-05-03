/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import Linkify from "./Linkify";

export default {
    component: Linkify,
    title: "Atoms/Linkify",
} as Meta;

const Template: ComponentStory<typeof Linkify> = () => {
    return <Linkify>CLICK THIS !!!! https://www.youtube.com/watch?v=dQw4w9WgXcQ</Linkify>;
};

export const Default: ComponentStory<typeof Linkify> = Template.bind({});
