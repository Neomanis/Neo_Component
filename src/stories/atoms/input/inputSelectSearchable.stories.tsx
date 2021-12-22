import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { InputSelectSearchable } from "../../../components/atoms";

export default {
    component: InputSelectSearchable,
    title: "Atoms/Input/InputSelectSearchable",
} as Meta;

const Template: ComponentStory<typeof InputSelectSearchable> = (args) => {
    return <InputSelectSearchable {...args} />;
};

export const Default = Template.bind({});
export const Updatable = Template.bind({});
export const NotSearchable = Template.bind({});
export const Multiple = Template.bind({});
Default.args = {
    isClearable: true,
    placeholder: "story Searchable",
    isSearchable: true,
    defaultValue: 3,
    refForm: "example 1",
    data: [
        {
            label: "Abricot",
            value: 1,
        },
        {
            label: "Banane",
            value: 2,
        },
        {
            label: "Cactus",
            value: 3,
        },
        {
            label: "Detergent",
            value: 4,
        },
        {
            label: "Destruction",
            value: 5,
        },
        {
            label: "Decheance",
            value: 6,
        },
        {
            label: "Detritus",
            value: 7,
        },
        {
            label: "Emergeance",
            value: 8,
        },
    ],
};
Updatable.args = {
    isUpdateField: true,
    isSearchable: true,
    //meant not to display isClearable button since isUpdateField = true
    isClearable: true,
    placeholder: "story Searchable",
    data: [
        {
            label: "Abricot",
            value: 1,
        },
        {
            label: "Banane",
            value: 2,
        },
        {
            label: "Cactus",
            value: 3,
        },
        {
            label: "Detergent",
            value: 4,
        },
        {
            label: "Destruction",
            value: 5,
        },
        {
            label: "Decheance",
            value: 6,
        },
        {
            label: "Detritus",
            value: 7,
        },
        {
            label: "Emergeance",
            value: 8,
        },
    ],
    refForm: "exemple",
};
NotSearchable.args = {
    isUpdateField: true,
    isSearchable: false,
    placeholder: "story Searchable",
    data: [
        {
            label: "Abricot",
            value: 1,
        },
        {
            label: "Banane",
            value: 2,
        },
        {
            label: "Cactus",
            value: 3,
        },
        {
            label: "Detergent",
            value: 4,
        },
        {
            label: "Destruction",
            value: 5,
        },
        {
            label: "Decheance",
            value: 6,
        },
        {
            label: "Detritus",
            value: 7,
        },
        {
            label: "Emergeance",
            value: 8,
        },
    ],
    refForm: "exemple",
};
Multiple.args = {
    isClearable: true,
    placeholder: "story Searchable",
    isSearchable: true,
    defaultValue: 3,
    isMulti: true,
    refForm: "example 1",
    data: [
        {
            label: "Abricot",
            value: 1,
        },
        {
            label: "Banane",
            value: 2,
        },
        {
            label: "Cactus",
            value: 3,
        },
        {
            label: "Detergent",
            value: 4,
        },
        {
            label: "Destruction",
            value: 5,
        },
        {
            label: "Decheance",
            value: 6,
        },
        {
            label: "Detritus",
            value: 7,
        },
        {
            label: "Emergeance",
            value: 8,
        },
    ],
};
