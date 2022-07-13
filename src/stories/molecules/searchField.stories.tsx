import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import SearchField from "../../components/molecules/searchField";
import { useForm } from "react-hook-form";

export default {
    title: "Molecules/SearchField",
    component: SearchField,
} as Meta;

const Template: ComponentStory<typeof SearchField> = (args) => {
    const { setValue, register, reset } = useForm({ mode: "onChange" });
    return (
        <div className="w-full h-56 bg-neo-bg-A">
            <form>
                <div className="w-1/3 p-2">
                    <SearchField {...args} setValue={setValue} register={register} reset={reset} />
                </div>
            </form>
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    refForm: "input",
    placeholder: "Search ...",
};

export const FullArgs = Template.bind({});
FullArgs.args = {
    refForm: "input",
    placeholder: "Search ...",
    className: "bg-neo-bg-B h-12 flex items-center rounded-md overflow-hidden w-full justify-between",
    showClearButton: true,
};

export const DifferentClassName = Template.bind({});
DifferentClassName.args = {
    refForm: "input",
    placeholder: "Search ...",
    containerClassName:
        "bg-transparent border-2 border-neo-blue h-12 flex items-center rounded-md overflow-hidden w-full justify-between",
    showClearButton: true,
    iconSearchColor: "#22AAFF",
    iconResetColor: "#FF1166",
    inputClassName: "w-full bg-transparent text-neo-blue placeholder-white border-none focus:outline-none",
};
