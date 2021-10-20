import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import SearchField from "../../components/molecules/searchField";

export default {
    title: "Molecules/SearchField",
    component: SearchField,
} as Meta;

const Template: ComponentStory<typeof SearchField> = (args) => {
    return (
        <div className=" bg-neo_blue-dark w-full h-56">
            <form>
                <div className="w-1/3 p-2">
                    <SearchField {...args} />
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
