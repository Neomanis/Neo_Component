import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { InputSelect } from "../../../components/atoms";

export default {
    component: InputSelect,
    title: "Atoms/Input/InputSelect",
} as Meta;

const Template: ComponentStory<typeof InputSelect> = (args) => <InputSelect {...args} />;

export const Default = Template.bind({});
Default.args = {
    data: [
        {
            id: 1,
            value: "Abricot",
        },
        {
            id: 2,
            value: "Banane",
        },
        {
            id: 3,
            value: "Cactus",
        },
        {
            id: 4,
            value: "Domino",
        },
        {
            id: 5,
            value: "Detritus",
        },
        {
            id: 6,
            value: "Deterioration",
        },
        {
            id: 7,
            value: "Decheance",
        },
        {
            id: 8,
            value: "Destruction",
        },
    ],
    refForm: "exemple",
};
