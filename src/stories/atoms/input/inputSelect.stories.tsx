/* eslint-disable no-console */
import React, { useState } from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { InputSelect } from "../../../components/atoms";
import { SubmitHandler, useForm } from "react-hook-form";

export default {
    component: InputSelect,
    title: "Atoms/Input/InputSelect",
} as Meta;

const Template: ComponentStory<typeof InputSelect> = (args) => {
    const formMethods = useForm({ mode: "onChange" });
    const [defaultValue, setDefaultValue] = useState({ label: "Shikamaru", value: "Shikamaru" });

    const onSubmit: SubmitHandler<{ inputSelect: string }> = (data) => {
        console.log(data);
    };

    return (
        <form className="bg-neo-bg-A p-2 space-y-2" onSubmit={formMethods.handleSubmit(onSubmit)}>
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
        { label: "Shikamaru", value: "Shikamaru" },
        { label: "Naruto", value: "Naruto" },
    ],
    required: true,
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
