import React, { ReactElement } from "react";
import { useForm } from "react-hook-form";
import TextEditorAdvanced from "./TextEditorAdvanced";

interface TextEditorAdvancedTestWrapperProps {
    required?: boolean;
}

const TextEditorAdvancedTestWrapper = ({ required }: TextEditorAdvancedTestWrapperProps): ReactElement => {
    const formMethods = useForm({ mode: "onChange" });
    return (
        <TextEditorAdvanced
            formMethods={formMethods}
            defaultValue={[
                {
                    type: "paragraph",
                    attrs: {
                        textAlign: "left",
                    },
                    content: [
                        {
                            type: "text",
                            text: "Default value",
                        },
                    ],
                },
            ]}
            refForm="tiptap"
            required={Boolean(required)}
            editable
        />
    );
};

export default TextEditorAdvancedTestWrapper;
