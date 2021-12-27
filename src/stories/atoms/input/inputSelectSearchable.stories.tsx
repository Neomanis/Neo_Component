/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { InputSelectSearchable } from "../../../components/atoms";

export default {
    component: InputSelectSearchable,
    title: "Atoms/Input/InputSelectSearchable",
} as Meta;

const Template: ComponentStory<typeof InputSelectSearchable> = (args) => {
    return (
        <div className="w-1/4 h-96 bg-neo-bg-A">
            <InputSelectSearchable {...args} />
        </div>
    );
};

export const Default = Template.bind({});
export const Labeled = Template.bind({});
export const Updatable = Template.bind({});
export const NotSearchable = Template.bind({});
export const Multiple = Template.bind({});
Default.args = {
    isClearable: true,
    placeholder: "story Searchable",
    containerClassName: "w-full flex items-center",
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
Labeled.args = {
    label: "Label Time!",
    containerClassName: "w-full flex items-center",
    labelClassName: "text-neo-light-grey whitespace-nowrap mx-2",
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
    ],
};
Updatable.args = {
    isUpdateField: true,
    containerClassName: "w-full flex items-center",
    isSearchable: true,
    updateFunction: (refForm: unknown, value: unknown) => console.log(refForm, value),
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
    containerClassName: "w-full flex items-center",
    isSearchable: false,
    placeholder: "story Searchable",
    updateFunction: (refForm: unknown, value: unknown) => console.log(refForm, value),
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
    isUpdateField: true,
    containerClassName: "w-full flex items-center",
    placeholder: "story Searchable",
    isSearchable: true,
    defaultValue: [3, 7],
    isMulti: true,
    refForm: "example 1",
    updateFunction: (refForm: unknown, value: unknown) => console.log(refForm, value),
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
