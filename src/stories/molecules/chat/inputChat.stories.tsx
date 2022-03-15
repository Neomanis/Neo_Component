import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { InputChat } from "../../../components/molecules";
import { SubmitHandler, useForm } from "react-hook-form";
import { ITechnicalQuestion } from "../../../interface";

export default {
    component: InputChat,
    title: "Molecules/Chat/InputChat",
} as Meta;

const Template: ComponentStory<typeof InputChat> = (args) => {
    const { setValue, register, handleSubmit } = useForm({ mode: "onChange" });
    const onSubmit: SubmitHandler<ITechnicalQuestion> = async (data) => {
        // eslint-disable-next-line no-console
        console.log(data);
    };
    return (
        <div className="w-full h-56 bg-neo-bg-A">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-4 flex items-center ">
                    <InputChat {...args} setValue={setValue} register={register} refForm="input" />
                </div>
            </form>
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {};

export const WithPrivateOption = Template.bind({});
WithPrivateOption.args = {
    privateMessage: true,
    // eslint-disable-next-line no-console
    fCallbackPrivateMessage: () => console.log("mp"),
    placeholder: "Send a message",
};
