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
            <button>yolo</button>
            <TextEditorAdvanced {...args} formMethods={formMethods} refForm="desc" required previewOnly />
        </form>
    );
};

const Template2: ComponentStory<typeof TextEditorAdvanced> = (args) => {
    const formMethods = useForm({ mode: "onChange" });

    const onSubmit: SubmitHandler<{ tiptap: string }> = (data) => {
        console.log(data);
    };
    return (
        <form onSubmit={formMethods.handleSubmit(onSubmit)} className="w-full">
            <button>yolo</button>
            <TextEditorAdvanced
                {...args}
                formMethods={formMethods}
                refForm="desc"
                required
                previewOnly
                isAutoFocus="end"
            />
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
        {
            type: "paragraph",
            attrs: {
                textAlign: "left",
                justifyContent: "justify-start",
            },
        },
        {
            type: "codeBlock",
            attrs: {
                language: "javascript",
            },
            content: [
                {
                    type: "text",
                    text: 'for (var i=1; i <= 20; i++)\n{\n  if (i % 15 == 0)\n    console.log("FizzBuzz");\n  else if (i % 3 == 0)\n    console.log("Fizz");\n  else if (i % 5 == 0)\n    console.log("Buzz");\n  else\n    console.log(i);\n}',
                },
            ],
        },
    ],
};

export const AutoFocus: ComponentStory<typeof TextEditorAdvanced> = Template2.bind({});
AutoFocus.args = {
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
        {
            type: "paragraph",
            attrs: {
                textAlign: "left",
                justifyContent: "justify-start",
            },
        },
    ],
};
