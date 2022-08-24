/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import ValidationCard from "./ValidationCard";

export default {
    component: ValidationCard,
    title: "Molecules/ValidationCard",
} as Meta;

const Template: ComponentStory<typeof ValidationCard> = (args) => {
    return <ValidationCard {...args} />;
};

export const Default: ComponentStory<typeof ValidationCard> = Template.bind({});
Default.args = {
    classNames: {
        container: "flex bg-neo-link rounded-md",
        buttonContainer: "flex justify-center items-center",
    },
    fCallBackCancel: () => console.log("CANCELED!"),
    fCallBackValidate: () => console.log("VALIDATED!"),
};

export const ValidationCardWithText: ComponentStory<typeof ValidationCard> = Template.bind({});
ValidationCardWithText.args = {
    fCallBackCancel: () => console.log("CANCELED!"),
    fCallBackValidate: () => console.log("VALIDATED!"),
    text: "Are you sure?",
};
