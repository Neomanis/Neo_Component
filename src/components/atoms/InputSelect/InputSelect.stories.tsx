/* eslint-disable no-console */
import React, { useState } from "react";
import { ComponentStory, Meta } from "@storybook/react";
import { SubmitHandler, useForm } from "react-hook-form";

import InputSelect from "./InputSelect";

export default {
    component: InputSelect,
    title: "Atoms/Input/InputSelect",
} as Meta;

const Template: ComponentStory<typeof InputSelect> = (args) => {
    const formMethods = useForm({ mode: "onChange" });
    const [defaultValue, setDefaultValue] = useState({ label: "Konoha", value: "Konoha" });
    const onSubmit: SubmitHandler<{ inputSelect: string }> = (data) => {
        console.log(data);
    };

    return (
        <form className="bg-neo-bg-A p-2 space-y-2 w-[320px]" onSubmit={formMethods.handleSubmit(onSubmit)}>
            <InputSelect {...args} formMethods={formMethods} refForm="inputSelect" defaultValue={[defaultValue]} />
            <div className="flex flex-col items-start space-y-2">
                <button
                    type="button"
                    className="bg-neo-red p-2 rounded"
                    onClick={() =>
                        setDefaultValue((old) =>
                            old.value === "Shikamaru"
                                ? { label: "Naruto", value: "Naruto" }
                                : { label: "Shikamaru", value: "Shikamaru" }
                        )
                    }
                >
                    TEST
                </button>
                <button className="bg-neo-red p-2 rounded">SUBMIT</button>
            </div>
        </form>
    );
};

export const Default: ComponentStory<typeof InputSelect> = Template.bind({});
Default.args = {
    options: [
        {
            label: "Characters From Naruto",
            options: [
                { label: "Shikamaru", value: "Shikamaru" },
                { label: "Naruto", value: "Naruto" },
                { label: "Sasuke", value: "Sasuke" },
                { label: "Itachi", value: "Itachi" },
                { label: "Madara", value: "Madara" },
            ],
        },
        {
            label: "Villages From Naruto",
            options: [
                { label: "Konoha", value: "Konoha" },
                { label: "Suna", value: "Suna" },
                { label: "Kumo", value: "Kumo" },
                { label: "Iwa", value: "Iwa" },
                { label: "Kiri", value: "Kiri" },
            ],
        },
        {
            label: "Ninjutsu From Naruto",
            options: [
                { label: "Katon", value: "Katon" },
                { label: "Suiton", value: "Suiton" },
                { label: "Doton", value: "Doton" },
                { label: "Futon", value: "Futon" },
                { label: "Raiton", value: "Raiton" },
                { label: "Mokuton", value: "Mokuton" },
            ],
        },
    ],
    isUpdateField: true,
    isMulti: true,
};

export const Updatable: ComponentStory<typeof InputSelect> = Template.bind({});
Updatable.args = {
    options: [
        { label: "Shikamaru", value: "Shikamaru" },
        { label: "Naruto", value: "Naruto" },
    ],
    required: true,
    isUpdateField: true,
    isMulti: false,
    updateFunction: (field, value) => console.log(field, value),
};
