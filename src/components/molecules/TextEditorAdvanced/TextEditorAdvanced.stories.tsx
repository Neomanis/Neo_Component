/* eslint-disable no-console */
import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import TextEditorAdvanced from "./TextEditorAdvanced";
import { SubmitHandler, useForm } from "react-hook-form";

export default {
    component: TextEditorAdvanced,
    title: "Molecules/TextEditorAdvanced",
} as Meta;

const Template: ComponentStory<typeof TextEditorAdvanced> = (args) => {
    const formMethods = useForm({ mode: "onChange" });

    const onSubmit: SubmitHandler<{ tiptap: string }> = (data) => {
        console.log(data);
    };
    return (
        <form onSubmit={formMethods.handleSubmit(onSubmit)} className="w-full">
            <TextEditorAdvanced {...args} formMethods={formMethods} refForm="desc" required />
        </form>
    );
};

export const Default: ComponentStory<typeof TextEditorAdvanced> = Template.bind({});
Default.args = {
    editable: true,
    defaultValue: [
        {
            type: "paragraph",
            attrs: {
                textAlign: "left",
                justifyContent: "justify-start",
            },
            content: [
                {
                    type: "text",
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fermentum at ",
                },
                {
                    type: "text",
                    marks: [
                        {
                            type: "bold",
                        },
                    ],
                    text: "lacus ",
                },
                {
                    type: "text",
                    text: "sit amet viverra. Vivamus vestibulum placerat ornare. Maecenas ac sapien elementum, volutpat ipsum eget, euismod sapien. Etiam vel mi odio. Nam pretium lectus quis suscipit accumsan. Proin rhoncus augue ipsum, ut consequat mauris pretium at. ",
                },
                {
                    type: "text",
                    marks: [
                        {
                            type: "italic",
                        },
                    ],
                    text: "Pellentesque ",
                },
                {
                    type: "text",
                    text: "habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec sit amet aliquam dui.",
                },
            ],
        },
    ],
};
