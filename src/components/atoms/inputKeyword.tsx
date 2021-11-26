import React, { ReactElement, useEffect, useRef, useState } from "react";
import { UseFormRegister, FieldValues, UseFormSetValue } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Dot from "./dot";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface Props {
    classButton?: string;
    classNameInput?: string;
    classNameLabel?: string;
    classNameKeyWord?: string;
    classText?: string;
    defaultKeyWord?: string[];
    dotPosition?: string;
    errorMessage?: string;
    isError?: boolean;
    isUpdateField?: boolean;
    label?: string;
    placeholder?: string;
    refForm: string;
    register?: UseFormRegister<FieldValues>;
    setValue?: UseFormSetValue<FieldValues>;
    timerSetting?: number;
    updateFunction?: (refForm: string, value: string[]) => void;
}

const InputKeyword = ({
    classButton,
    classNameInput,
    classNameLabel,
    classNameKeyWord,
    classText,
    defaultKeyWord,
    dotPosition,
    errorMessage,
    isError,
    isUpdateField = false,
    label,
    placeholder,
    refForm,
    register,
    setValue,
    timerSetting = 5000,
    updateFunction,
}: Props): ReactElement => {
    const [dotState, setDotState] = useState<"isSuccess" | "isCooldown">();
    const [tabKeyWord, setTabKeyWord] = useState<string[]>();
    const [tabKeyWordRegister, settabKeyWordRegister] = useState<string[]>();
    const [valueInput, setValueInput] = useState<string>();
    const setTime = useRef<NodeJS.Timeout>();

    useEffect(() => {
        register && register(refForm);
        setValue && setValue(refForm, defaultKeyWord);
        if (defaultKeyWord) {
            setTabKeyWord(defaultKeyWord);
            settabKeyWordRegister(defaultKeyWord);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultKeyWord]);

    useEffect(() => {
        setValue && setValue(refForm, tabKeyWord);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tabKeyWord]);

    useEffect(() => {
        if (dotState === "isSuccess") {
            setTimeout(() => {
                dotState === "isSuccess" && setDotState(undefined);
            }, 2000);
        }
    }, [dotState]);

    function sendUpdate(data: string[]) {
        resetTimer();
        setTime.current = setTimeout(() => {
            setDotState("isSuccess");
            updateFunction && updateFunction(refForm, data);
            settabKeyWordRegister(data);
        }, timerSetting);
    }

    function resetTimer() {
        clearTimeout(setTime.current);
        if (dotState === "isCooldown") {
            setDotState(undefined);
            setTimeout(() => {
                setDotState("isCooldown");
            });
        } else {
            setDotState("isCooldown");
        }
    }

    function addKeyWord(e: React.KeyboardEvent<HTMLInputElement>) {
        resetTimer();
        if (tabKeyWord) {
            if (!tabKeyWord.includes(e.currentTarget.value)) {
                setTabKeyWord(tabKeyWord.concat([e.currentTarget.value]));
                isUpdateField && sendUpdate(tabKeyWord.concat([e.currentTarget.value]));
            }
        } else {
            setTabKeyWord([e.currentTarget.value]);
            isUpdateField && sendUpdate([e.currentTarget.value]);
        }
    }

    return (
        <div className="w-full">
            <div className="flex">
                <label className="flex justify-between items-center w-full ">
                    {label && (
                        <div className={`${classNameLabel ? classNameLabel : "text-neo_blue-light text-lg mr-2"}`}>
                            {label}
                        </div>
                    )}
                    <div className="flex">
                        {tabKeyWord &&
                            tabKeyWord.map((keyWord, key) => {
                                return (
                                    <div
                                        className={`${
                                            classNameKeyWord
                                                ? classNameKeyWord
                                                : "flex bg-neo_lite rounded-xl mx-1 justify-between items-center"
                                        }`}
                                        key={key}
                                        style={{ width: "87%" }}
                                    >
                                        <p
                                            className={`${
                                                classText ? classText : "mx-2 my-1 text-neo_blue font-bold min-w-max"
                                            }`}
                                        >
                                            {keyWord}
                                        </p>
                                        <button
                                            className={`${
                                                classButton ? classButton : "mx-2 my-1 text-neo_red min-w-max"
                                            }`}
                                            onClick={(e) => {
                                                setTabKeyWord(
                                                    tabKeyWord.filter((item) => item !== e.currentTarget.value)
                                                );
                                                isUpdateField &&
                                                    sendUpdate(
                                                        tabKeyWord.filter((item) => item !== e.currentTarget.value)
                                                    );
                                            }}
                                            type="button"
                                            value={keyWord}
                                        >
                                            <FontAwesomeIcon icon={faTimes} className=" text-xl" />
                                        </button>
                                    </div>
                                );
                            })}
                    </div>
                    <input
                        value={valueInput}
                        placeholder={placeholder}
                        className={`${
                            classNameInput ? classNameInput : "w-full ml-2 bg-transparent text-white border-b-2"
                        }`}
                        onKeyPress={(e) => {
                            e.charCode === 13 && e.currentTarget.value !== "" && addKeyWord(e);
                            e.charCode === 13 && setValueInput("");
                        }}
                        onChange={(e) => setValueInput(e.currentTarget.value)}
                    />
                </label>

                <div className="mx-3 mt-2 w-6">
                    {isUpdateField && dotState !== undefined && (
                        <Dot
                            errorMessage={errorMessage}
                            isCancelable={dotState === "isCooldown" || isError}
                            isCooldown={dotState === "isCooldown" || isError}
                            isError={isError}
                            isSuccess={dotState === "isSuccess"}
                            isUpdateField={isUpdateField}
                            onClickCallback={(): void => {
                                setTabKeyWord(tabKeyWordRegister);
                                setDotState(undefined);
                                clearTimeout(setTime.current);
                            }}
                            positionClassname={dotPosition}
                            timer={timerSetting}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default InputKeyword;
