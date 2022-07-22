/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import InputDateTimeDoc from "./inputDateTime.mdx";
import { InputDateTime } from "../../../components/atoms";
import { addMonths } from "date-fns";
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
    const formMethods = useForm({ mode: "onChange" });

    const onSubmit: SubmitHandler<unknown> = async (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={formMethods.handleSubmit(onSubmit)} className="bg-neo-bg-A p-3">
            <InputDateTime {...args} formMethods={formMethods} />
        </form>
    );
};

export const InputDateTimeSimple = Template.bind({});
InputDateTimeSimple.args = {
    defaultValue: new Date(2022, 7, 1),
    refForm: "date_creation_simple",
    label: "label",
    minDate: new Date(),
    maxDate: addMonths(new Date(), 5),
    updateFunction: (reform, data) => console.log(reform, data),
};
export const InputDateTimeRange = Template.bind({});
InputDateTimeRange.args = {
    defaultValue: new Date(),
    refForm: "date_creation_range",
    label: "label",
    minDate: new Date(),
    maxDate: addMonths(new Date(), 5),
    updateFunction: (reform, data) => console.log(reform, data),
    isRange: true,
};
export const InputDateTimeSimpleUpdate = Template.bind({});
InputDateTimeSimpleUpdate.args = {
    defaultValue: new Date(),
    refForm: "date_creation_simple_update",
    label: "label",
    minDate: new Date(),
    maxDate: addMonths(new Date(), 5),
    updateFunction: (reform, data) => console.log(reform, data),
    isUpdateField: true,
};
export const InputDateTimeRangeUpdate = Template.bind({});
InputDateTimeRangeUpdate.args = {
    defaultValue: new Date(),
    refForm: "date_creation_range_update",
    label: "label",
    minDate: new Date(),
    maxDate: addMonths(new Date(), 5),
    updateFunction: (reform, data) => console.log(reform, data),
    isRange: true,
    isUpdateField: true,
    errorMessage: "Coucou",
};
export const InputDateIsError = Template.bind({});
InputDateIsError.args = {
    defaultValue: new Date(),
    refForm: "date_creation_range_update",
    label: "label",
    minDate: new Date(),
    maxDate: addMonths(new Date(), 5),
    updateFunction: (reform, data) => console.log(reform, data),
    isError: true,
    errorMessage: "Coucou",
};
