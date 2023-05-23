/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import TipTap from "./TipTap";
import { SubmitHandler, useForm } from "react-hook-form";

export default {
    component: TipTap,
    title: "Molecules/TipTap",
} as Meta;

const Template: ComponentStory<typeof TipTap> = (args) => {
    const formMethods = useForm({ mode: "onChange" });

    const onSubmit: SubmitHandler<{ tiptap: string }> = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={formMethods.handleSubmit(onSubmit)} className="w-full">
            <TipTap
                defaultValue={args.defaultValue}
                formMethods={formMethods}
                refForm="tiptap"
                label="Tiptap"
                isUpdateField
                updateFunction={(field, value) => console.log(field, value)}
                required
                placeholder="Write something here..."
            />
        </form>
    );
};

const Template2: ComponentStory<typeof TipTap> = (args) => {
    const formMethods = useForm({ mode: "onChange" });

    const onSubmit: SubmitHandler<{ tiptap: string }> = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={formMethods.handleSubmit(onSubmit)} className="w-full">
            <TipTap
                defaultValue={args.defaultValue}
                formMethods={formMethods}
                refForm="tiptap"
                label="Tiptap"
                isUpdateField
                updateFunction={(field, value) => console.log(field, value)}
                required
                placeholder="Write something here..."
                isAutoFocus="end"
            />
        </form>
    );
};

export const Default: ComponentStory<typeof TipTap> = Template.bind({});
Default.args = {
    defaultValue:
        "<p>Default value</p><p>Default value</p><p>Default value</p><p>Default value</p><p>Default value</p><p>Default value</p>",
};

export const AutoFocus: ComponentStory<typeof TipTap> = Template2.bind({});
AutoFocus.args = {
    defaultValue: "<p>Default value</p",
};
