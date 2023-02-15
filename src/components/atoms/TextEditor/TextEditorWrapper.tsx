import React, { ReactElement } from "react";
import { useForm } from "react-hook-form";
import TextEditor from "./TextEditor";

interface Props {
    refForm: string;
}

const TextEditorWrapper = ({ refForm }: Props): ReactElement => {
    const formMethods = useForm();
    return <TextEditor formMethods={formMethods} refForm={refForm} />;
};

export default TextEditorWrapper;
