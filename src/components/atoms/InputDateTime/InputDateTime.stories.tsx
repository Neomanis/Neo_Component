/* eslint-disable no-console */
import React, { useMemo } from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { addMonths, addHours } from "date-fns";

import { IconCalendar } from "@/img/svg";
import InputDateTime from "./InputDateTime";

export default {
    component: InputDateTime,
    title: "Atoms/Input/InputDateTime",
} as Meta;

const Template: ComponentStory<typeof InputDateTime> = (args) => {
    const formMethods = useForm({ mode: "onChange" });
    const onSubmit: SubmitHandler<unknown> = async (data) => {
        console.log(data);
    };

    useMemo(() => {
        console.log("WATCH: ", formMethods.watch("date_creation"));
    }, [formMethods.watch("date_creation")]);

    return (
        <form onSubmit={formMethods.handleSubmit(onSubmit)} className="bg-neo-bg-A p-3">
            <InputDateTime {...args} formMethods={formMethods} />
        </form>
    );
};

export const Default: ComponentStory<typeof InputDateTime> = Template.bind({});
Default.args = {
    refForm: "date_creation",
    label: "label",
    placeholder: "I'm a placeholder",
    minDate: new Date(),
    maxDate: addMonths(new Date(), 5),
    updateFunction: (reform, data) => console.log(reform, data),
    showTimePicker: true,
};
export const InputDateTimeRange: ComponentStory<typeof InputDateTime> = Template.bind({});
InputDateTimeRange.args = {
    defaultValue: [new Date(), new Date()],
    refForm: "date_creation",
    label: "label",
    minDate: new Date(),
    maxDate: addMonths(new Date(), 5),
    updateFunction: (reform, data) => console.log(reform, data),
    isRange: true,
};
export const InputDateTimeSimpleUpdate: ComponentStory<typeof InputDateTime> = Template.bind({});
InputDateTimeSimpleUpdate.args = {
    defaultValue: new Date(),
    refForm: "date_creation",
    label: "label",
    minDate: new Date(),
    maxDate: addMonths(new Date(), 5),
    updateFunction: (reform, data) => console.log(reform, data),
    isUpdateField: true,
};
export const InputDateTimeRangeUpdate: ComponentStory<typeof InputDateTime> = Template.bind({});
InputDateTimeRangeUpdate.args = {
    defaultValue: [new Date(), new Date()],
    refForm: "date_creation",
    label: "label",
    minDate: new Date(),
    maxDate: addMonths(new Date(), 5),
    updateFunction: (reform, data) => console.log(reform, data),
    isRange: true,
    isUpdateField: true,
    errorMessage: "Coucou",
};
export const InputDateIsError: ComponentStory<typeof InputDateTime> = Template.bind({});
InputDateIsError.args = {
    defaultValue: new Date(),
    refForm: "date_creation",
    label: "label",
    minDate: new Date(),
    maxDate: addMonths(new Date(), 5),
    updateFunction: (reform, data) => console.log(reform, data),
    isError: true,
    lang: "fr-FR",
    errorMessage: "Coucou",
};
export const InputTest: ComponentStory<typeof InputDateTime> = Template.bind({});
InputTest.args = {
    defaultValue: new Date(),
    refForm: "date_creation",
    label: "COUCOU",
    lang: "pt-BR",
    labelClassName: "text-neo-blue-secondary font-bold uppercase ml-4",
    inputClassName: "bg-neo-bg-B font-bold rounded h-[40px] pl-4 text-white text-sm w-full text-bold",
    updateFunction: (reform, data) => console.log(reform, data),
    className: "w-full mx-4 relative",
    svg: <IconCalendar className={"fill-neo-link h-8 absolute right-10 z-50"} style={{ top: 32, right: 10 }} />,
};

export const InputMinTime: ComponentStory<typeof InputDateTime> = Template.bind({});
InputMinTime.args = {
    defaultValue: new Date(),
    refForm: "date_creation",
    label: "COUCOU",
    lang: "pt-BR",
    labelClassName: "text-neo-blue-secondary font-bold uppercase ml-4",
    inputClassName: "bg-neo-bg-B font-bold rounded h-[40px] pl-4 text-white text-sm w-full text-bold",
    updateFunction: (reform, data) => console.log(reform, data),
    className: "w-full mx-4 relative",
    minTime: new Date(),
};

export const InputMaxTime: ComponentStory<typeof InputDateTime> = Template.bind({});
InputMaxTime.args = {
    defaultValue: new Date(),
    refForm: "date_creation",
    label: "COUCOU",
    lang: "pt-BR",
    labelClassName: "text-neo-blue-secondary font-bold uppercase ml-4",
    inputClassName: "bg-neo-bg-B font-bold rounded h-[40px] pl-4 text-white text-sm w-full text-bold",
    updateFunction: (reform, data) => console.log(reform, data),
    className: "w-full mx-4 relative",
    maxTime: new Date(),
};

export const InputMinPlusMaxTime: ComponentStory<typeof InputDateTime> = Template.bind({});
InputMinPlusMaxTime.args = {
    defaultValue: new Date(),
    refForm: "date_creation",
    label: "COUCOU",
    lang: "pt-BR",
    labelClassName: "text-neo-blue-secondary font-bold uppercase ml-4",
    inputClassName: "bg-neo-bg-B font-bold rounded h-[40px] pl-4 text-white text-sm w-full text-bold",
    updateFunction: (reform, data) => console.log(reform, data),
    className: "w-full mx-4 relative",
    maxTime: addHours(new Date(), 1),
    minTime: addHours(new Date(), -1),
};

export const InputDisabled: ComponentStory<typeof InputDateTime> = Template.bind({});
InputDisabled.args = {
    defaultValue: new Date(),
    refForm: "date_creation",
    label: "COUCOU",
    lang: "pt-BR",
    labelClassName: "text-neo-blue-secondary font-bold uppercase ml-4 opacity-50",
    inputClassName: "bg-neo-bg-B font-bold rounded h-[40px] pl-4 text-white text-sm w-full text-bold opacity-50",
    updateFunction: (reform, data) => console.log(reform, data),
    className: "w-full mx-4 relative",
    maxTime: addHours(new Date(), 1),
    minTime: addHours(new Date(), -1),
    disabled: true,
};
