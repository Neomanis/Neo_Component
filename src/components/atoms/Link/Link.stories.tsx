/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import Link from "./Link";

export default {
    component: Link,
    title: "Atoms/Link",
} as Meta;

const Template: ComponentStory<typeof Link> = (args) => {
    return <Link {...args} />;
};

export const Default: ComponentStory<typeof Link> = Template.bind({});
Default.args = {
    href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    content: "CLICK ME",
};
