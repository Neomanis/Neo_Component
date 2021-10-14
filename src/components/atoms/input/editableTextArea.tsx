import React, { ReactElement, useEffect, useReducer, useRef, useState } from "react";
import { UseFormSetValue, UseFormRegister, FieldValues, UseFormClearErrors } from "react-hook-form";
import Dot from "../dot";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import inputReducer from "../../utils/reducers/inputReducer";

interface Props {
    clearErrors?: UseFormClearErrors<FieldValues>;
    defaultValue?: string;
    dotPosition?: string;
    errorMessage?: string;
    isError?: boolean;
    isUpdateField?: boolean;
    refForm: string;
    register?: UseFormRegister<FieldValues>;
    required?: boolean;
    setValue?: UseFormSetValue<FieldValues>;
    targetId?: number | undefined;
    timerSetting?: number;
    fCallBackOnChange?: (data: string) => void;
    updateFunction?: (refForm: string, value: string) => void;
}

const EditableTextarea = ({
    clearErrors,
    defaultValue = "",
    dotPosition,
    errorMessage,
    isError,
    timerSetting = 5000,
    refForm,
    updateFunction,
    setValue,
    register,
    required,
    isUpdateField = false,
    targetId,
}: Props): ReactElement => {
    const toolbarConfig = [
        "heading",
        "bold",
        "italic",
        "link",
        "outdent",
        "indent",
        "bulletedList",
        "numberedList",
        // For now it's not working as intended
        //"insertTable",

        //variable for file uploadin
        // "uploadImage",
        "blockQuote",
        "undo",
        "redo",
    ];

    const [state, dispatch] = useReducer(inputReducer, {
        isCancelable: false,
        isCooldown: false,
        isSuccess: false,
        previous: getHTMLValue(defaultValue),
        updated: getHTMLValue(defaultValue),
        timeoutId: undefined,
        trigger: false,
    });

    const [key, setKey] = useState(0);

    const isLastMount = useRef(false);

    function getHTMLValue(e: string): string {
        return e.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    }

    useEffect(() => {
        register && register(refForm, { required });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // force unmount
        setKey(key + 1);

        dispatch({ type: "RESET", payload: getHTMLValue(defaultValue) as string });
        setValue && setValue(refForm, getHTMLValue(defaultValue));
        return () => {
            isLastMount.current = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [targetId]);

    useEffect(() => {
        if (isUpdateField && state.updated && state.updated !== state.previous) {
            const newTimeout = setTimeout(() => {
                if (updateFunction && state.updated) {
                    updateFunction(refForm, state.updated as string);
                    dispatch({ type: "UPDATE_SUCCESS" });
                    setTimeout(() => {
                        dispatch({ type: "CLEAR_SUCCESS" });
                    }, 3000);
                }
            }, timerSetting);
            dispatch({ type: "SET_TIMEOUT", payload: newTimeout });
            return () => {
                if (isLastMount.current) {
                    clearTimeout(newTimeout);
                    updateFunction && updateFunction(refForm, state.updated as string);
                    isLastMount.current = false;
                }
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.updated, state.previous]);

    return (
        <div className="flex" style={{ width: "85%" }} key={key}>
            <CKEditor
                id="editor"
                editor={ClassicEditor}
                data={state.updated as string}
                config={{
                    toolbar: toolbarConfig,
                }}
                onChange={(event, editor): void => {
                    const data = editor.getData();
                    setValue && setValue(refForm, data, { shouldValidate: true });
                    if (isUpdateField) {
                        if (state.previous !== data && !isLastMount.current) {
                            dispatch({ type: "SHOW_DOT" });
                        } else {
                            dispatch({ type: "CANCEL_UPDATE" });
                        }
                        if (state.timeoutId) {
                            clearTimeout(state.timeoutId);
                        }
                    }
                }}
                onBlur={(e, editor): void => {
                    const data = editor.getData();
                    if (isUpdateField && state.previous !== data && !isError) {
                        dispatch({ type: "UPDATING", payload: data });
                        if (state.timeoutId) {
                            clearTimeout(state.timeoutId);
                        }
                    }
                }}
            />
            <div className="w-5 mx-3 mt-2">
                {(isError || state.isCancelable || state.isSuccess) && (
                    <Dot
                        positionClassname={dotPosition}
                        isCancelable={state.isCancelable}
                        isCooldown={state.isCooldown}
                        isSuccess={state.isSuccess}
                        isError={isError}
                        isUpdateField={isUpdateField}
                        errorMessage={errorMessage}
                        trigger={state.trigger}
                        onClickCallback={(): void => {
                            if (setValue && clearErrors) {
                                setValue(refForm, state.previous);
                                clearErrors();
                            }
                            if (state.timeoutId) {
                                clearTimeout(state.timeoutId);
                            }
                            dispatch({ type: "CANCEL_UPDATE" });
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default EditableTextarea;
