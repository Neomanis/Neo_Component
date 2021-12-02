import React, { ReactElement, useEffect, useReducer, useRef, useState } from "react";
import { UseFormSetValue, UseFormRegister, FieldValues, UseFormClearErrors } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import inputReducer from "../../utils/reducers/inputReducer";
import Dot from "../dot";

const TestEditableTextarea = (): ReactElement => {
    const [value, setValue] = useState("");

    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
            ["link", "image"],
            ["clean"],
        ],
    };
    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
    ];

    return (
        <div className="flex w-full h-96 bg-neo-bg-A text-white">
            <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} formats={formats} />
        </div>
    );
};

export default TestEditableTextarea;
