/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { InputSelectSearchable } from "../../../components/atoms";
import { SubmitHandler, useForm } from "react-hook-form";

export default {
    component: InputSelectSearchable,
    title: "Atoms/Input/InputSelectSearchable",
} as Meta;

const Template: ComponentStory<typeof InputSelectSearchable> = (args) => {
    const {
        setValue,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: "onChange" });
    const onSubmit: SubmitHandler<unknown> = async (data) => {
        // eslint-disable-next-line no-console
        console.log(data);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className=" bg-neo-bg-A pt-5 relative">
            <InputSelectSearchable
                {...args}
                setValue={setValue}
                register={register}
                refForm="input"
                isError={errors?.input && true}
            />
            <button>Submit</button>
        </form>
    );
};

export const Default = Template.bind({});
export const Labeled = Template.bind({});
export const Updatable = Template.bind({});
export const NotSearchable = Template.bind({});
export const Multiple = Template.bind({});
Default.args = {
    customStyleOverride: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        input: (provided, state) => ({
            ...provided,
            color: "#FF1166",
        }),
    },
    isClearable: true,
    placeholder: "story Searchable",
    errorMessage: "error",
    containerClassName: "",
    isSearchable: true,
    isUpdateField: true,
    defaultValue: 3,
    required: true,
    refForm: "example 1",
    isError: true,
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
    containerClassName: "",
    labelClassName: "text-neo-light-grey whitespace-nowrap mx-2",
    isClearable: true,
    placeholder: "story Searchable",
    isSearchable: true,
    isUpdateField: true,
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
    containerClassName: "",
    isSearchable: true,
    updateFunction: (refForm: unknown, value: unknown) => console.log(refForm, value),
    //meant not to display isClearable button since isUpdateField = true
    defaultValue: 2,
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
    containerClassName: "",
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
    containerClassName: "",
    placeholder: "story Searchable",
    isSearchable: true,
    defaultValue: [3, 7],
    isMulti: true,
    required: true,
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
