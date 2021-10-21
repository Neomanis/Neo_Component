import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import SearchField from "../../components/molecules/searchField";
import { useForm } from "react-hook-form";

export default {
    title: "Molecules/SearchField",
    component: SearchField,
} as Meta;

const Template: ComponentStory<typeof SearchField> = (args) => {
    const { setValue, setFocus } = useForm({ mode: "onChange" });
    return (
        <div className="w-full h-56">
            <form>
                <div className="w-1/3 p-2">
                    <SearchField {...args} setFocus={setFocus} setValue={setValue} />
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
