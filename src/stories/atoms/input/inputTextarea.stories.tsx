import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { InputTextarea } from "../../../components/atoms";
import { SubmitHandler, useForm } from "react-hook-form";

export default {
    component: InputTextarea,
    title: "Atoms/Input/InputTextarea",
} as Meta;

const Template: ComponentStory<typeof InputTextarea> = (args) => {
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
    // eslint-disable-next-line no-console
    console.log(errors);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-neo-bg-A">
            <InputTextarea
                {...args}
                setValue={setValue}
                register={register}
                refForm="exemple"
                isError={errors?.exemple && true}
            />
            <button>Submit</button>
        </form>
    );
};

export const Default = Template.bind({});
Default.args = {
    label: "Exemple",
    placeholder: "Exemple",
    required: true,
    errorMessage: "No text !",
    isUpdateField: true,
    classNames: {
        dot: "self-start mt-2 ml-2",
        textArea: "w-full bg-neo-bg-B p-2 rounded-md shadow-md h-40",
        container: "flex items-center w-full",
        labelBody: "flex-1",
    },
    // eslint-disable-next-line no-console
    updateFunction: (refForm, value) => console.log(refForm, value),
};
