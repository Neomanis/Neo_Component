import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { Button, InputKeyword } from "../../components/atoms";
import { SubmitHandler, useForm } from "react-hook-form";
import { ITechnicalQuestion } from "../../..";

export default {
    component: InputKeyword,
    title: "Atoms/Input/InputKeyword",
} as Meta;

const Template: ComponentStory<typeof InputKeyword> = (args) => {
    const { setValue, register, handleSubmit } = useForm({ mode: "onChange" });
    const onSubmit: SubmitHandler<ITechnicalQuestion> = async (data) => {
        // eslint-disable-next-line no-console
        console.log(data);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className=" bg-neo_bg_B p-2 ">
            <InputKeyword {...args} setValue={setValue} register={register} />
            <div className="my-4">
                <Button className=" bg-neo_bg_B rounded-md px-2" data="submit test" type="submit" />
            </div>
        </form>
    );
};

export const Default = Template.bind({});
Default.args = {
    refForm: "exemple",
    isUpdateField: false,
};
export const Keyword = Template.bind({});
Keyword.args = {
    refForm: "exemple",
    defaultKeyWord: ["test 1", "test 2", "test 3"],
    isUpdateField: true,
    isError: false,
    errorMessage: "error",
    label: "test",
    // eslint-disable-next-line no-console
    updateFunction: (refForm, value) => console.log(refForm, value),
};
