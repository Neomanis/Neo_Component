/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TechnicalQuestion } from "@neomanis/neo-types";

import InputChat from "./InputChat";

export default {
    component: InputChat,
    title: "Molecules/Chat/InputChat",
} as Meta;

const Template: ComponentStory<typeof InputChat> = (args) => {
    const { setValue, register, handleSubmit } = useForm({ mode: "onChange" });
    const onSubmit: SubmitHandler<TechnicalQuestion> = async (data) => {
        console.log(data);
    };
    return (
        <div className="w-full h-56 bg-neo-bg-A">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-4 flex items-center ">
                    <InputChat
                        {...args}
                        onClickAddAttachment={() => console.log("pj")}
                        setValue={setValue}
                        register={register}
                        refForm="input"
                    />
                </div>
            </form>
        </div>
    );
};

export const Default: ComponentStory<typeof InputChat> = Template.bind({});

export const WithPrivateOption: ComponentStory<typeof InputChat> = Template.bind({});
WithPrivateOption.args = {
    privateMessage: true,
    fCallbackPrivateMessage: () => console.log("mp"),
    placeholder: "Send a message",
};
