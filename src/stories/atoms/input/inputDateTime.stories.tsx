import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import InputDateTimeDoc from "./inputDateTime.mdx";
import { InputDateTime } from "../../../components/atoms";
import { addDays, addMonths } from "date-fns";
import { SubmitHandler, useForm } from "react-hook-form";

export default {
    component: InputDateTime,
    title: "Atoms/Input/inputDateTime",
    parameters: {
        docs: {
            page: InputDateTimeDoc,
        },
    },
} as Meta;

const Template: ComponentStory<typeof InputDateTime> = (args) => {
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
        <form onSubmit={handleSubmit(onSubmit)} className="bg-neo-bg-A p-3">
            <InputDateTime
                {...args}
                register={register}
                setValue={setValue}
                isError={errors?.date_creation_range && true}
            />
        </form>
    );
};

export const InputDateTimeUpdate = Template.bind({});
InputDateTimeUpdate.args = {
    defaultValue: new Date(),
    errorMessage: "ERROR",
    isError: true,
    isUpdateField: true,
    refForm: "date_creation",
    label: "label",
    lang: "fr-FR",
    minDate: new Date(),
    maxDate: addMonths(new Date(), 5),
    // eslint-disable-next-line no-console
    updateFunction: (reform, data) => console.log(reform, data),
};
export const InputDateTimeUpdateRange = Template.bind({});
InputDateTimeUpdateRange.args = {
    defaultValue: [new Date(), addDays(new Date(), 2)],
    errorMessage: "ERROR",
    isUpdateField: true,
    refForm: "date_creation_range",
    label: "label",
    lang: "fr-FR",
    minDate: new Date(),
    maxDate: addMonths(new Date(), 5),
    selectsRange: true,
    // eslint-disable-next-line no-console
    updateFunction: (reform, data) => console.log(reform, data),
};
