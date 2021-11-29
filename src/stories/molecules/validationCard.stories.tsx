/* eslint-disable no-console */
import React from "react";
import ValidationCard from "../../components/molecules/validationCard";
import { ComponentStory, Meta } from "@storybook/react";

export default {
    title: "Molecules/ValidationCard",
    component: ValidationCard,
} as Meta;

const Template: ComponentStory<typeof ValidationCard> = (args) => {
    return (
        <div className=" bg-neo-bg-A  p-10 flex items-center">
            <ValidationCard {...args} />
        </div>
    );
};

export const ValidationCardDefault = Template.bind({});
ValidationCardDefault.args = {
    // eslint-disable-next-line no-console
    fCallBackCancel: () => console.log("CANCELED!"),
    // eslint-disable-next-line no-console
    fCallBackValidate: () => console.log("VALIDATED!"),
};

export const ValidationCardWithText = Template.bind({});
ValidationCardWithText.args = {
    // eslint-disable-next-line no-console
    fCallBackCancel: () => console.log("CANCELED!"),
    // eslint-disable-next-line no-console
    fCallBackValidate: () => console.log("VALIDATED!"),
    text: "Are you sure?",
};

export const ValidationCardWithTextAndPosition = Template.bind({});
ValidationCardWithTextAndPosition.args = {
    // eslint-disable-next-line no-console
    fCallBackCancel: () => console.log("CANCELED!"),
    // eslint-disable-next-line no-console
    fCallBackValidate: () => console.log("VALIDATED!"),
    text: "Are you sure?",
    posText: "top",
};
