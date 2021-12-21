import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { InputSelectSearchable } from "../../../components/atoms";

export default {
    component: InputSelectSearchable,
    title: "Atoms/Input/InputSelectSearchable",
} as Meta;

const Template: ComponentStory<typeof InputSelectSearchable> = (args) => <InputSelectSearchable {...args} />;

export const Default = Template.bind({});
export const Updatable = Template.bind({});
export const NotSearchable = Template.bind({});
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
Updatable.args = {
    isUpdateField: true,
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
NotSearchable.args = {
    isUpdateField: true,
    isSearchable: false,
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
