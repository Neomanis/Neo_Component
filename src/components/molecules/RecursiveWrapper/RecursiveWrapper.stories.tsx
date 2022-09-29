/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import RecursiveWrapper from "./RecursiveWrapper";
import { fakeDiag } from "@/utils/storiesData/fakeObject";

export default {
    component: RecursiveWrapper,
    title: "Molecules/RecursiveWrapper",
} as Meta;

const Template: ComponentStory<typeof RecursiveWrapper> = (args) => {
    return <RecursiveWrapper {...args} />;
};

export const Default: ComponentStory<typeof RecursiveWrapper> = Template.bind({});
Default.args = {
    diagnostics: fakeDiag,
    redirectUrl: "/url",
    navigate: (url, state) => console.log(url, state.state),
};
