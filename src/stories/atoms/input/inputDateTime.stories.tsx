/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import InputDateTimeDoc from "./inputDateTime.mdx";
import { InputDateTime } from "../../../components/atoms";
import { addMonths } from "date-fns";
import { SubmitHandler, useForm } from "react-hook-form";
import { IconCalendar } from "../../../img/svg/index";

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
    refForm: "date_creation_simple",
    label: "label",
    placeholder: "I'm a placeholder",
    minDate: new Date(),
    maxDate: addMonths(new Date(), 5),
    updateFunction: (reform, data) => console.log(reform, data),
};
export const InputDateTimeRange = Template.bind({});
InputDateTimeRange.args = {
    defaultValue: [new Date(), new Date()],
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
    lang: "fr-FR",
    errorMessage: "Coucou",
};
export const InputTest = Template.bind({});
InputTest.args = {
    defaultValue: new Date(),
    refForm: "inputTest",
    label: "COUCOU",
    lang: "pt-BR",
    labelClassName: "text-neo-blue-secondary font-bold uppercase ml-4",
    inputClassName: "bg-neo-bg-B font-bold rounded h-[40px] pl-4 text-white text-sm w-full text-bold",
    updateFunction: (reform, data) => console.log(reform, data),
    className: "w-full mx-4 relative",
    svg: <IconCalendar className={"fill-neo-link h-8 absolute right-10 z-50"} style={{ top: 32, right: 10 }} />,
};
