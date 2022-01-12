import React, { ReactElement, useRef, useState } from "react";
import { Input } from "../atoms";

import {
    FieldValues,
    UseFormRegister,
    UseFormSetFocus,
    UseFormSetValue,
} from "../../../node_modules/react-hook-form/dist";
import { IconSearch } from "../../img/svg";

interface Props {
    fCallBack?: () => void;
    placeholder: string;
    refForm: string;
    register?: UseFormRegister<FieldValues>;
    setFocus?: UseFormSetFocus<FieldValues>;
    setValue?: UseFormSetValue<FieldValues>;
}

const SearchField = ({ fCallBack, placeholder, refForm, register, setValue, setFocus }: Props): ReactElement => {
    const [width, setWidth] = useState(32);
    const [inputFocus, setInputFocus] = useState(false);
    const [inputEmpty, setInputEmpty] = useState(true);
    const timerCall = useRef<NodeJS.Timeout>();

    function onEscape(e: React.KeyboardEvent<HTMLDivElement>) {
        if (e.keyCode === 27) {
            setValue(refForm, "");
            setWidth(32);
            setInputFocus(false);
            fCallBack && fCallBack();
        }
    }

    return (
        <div
            onMouseEnter={() => {
                timerCall.current = setTimeout(() => {
                    setFocus(refForm);
                }, 1000);
                setWidth(200);
            }}
            onMouseLeave={() => {
                !inputFocus && inputEmpty && setWidth(32);
                clearTimeout(timerCall.current);
            }}
            className="flex items-center justify-between"
            style={{ width: width + "px", transition: "0.5s linear", transitionDelay: "400ms" }}
        >
            <div className="bg-neo-bg-B h-8 flex items-center rounded-full overflow-hidden">
                <div
                    className={`${width > 32 && "animate-onSpin"} ${width < 200 && "animate-onSpinReverse"} px-2 de`}
                    style={{ animationDelay: "400ms" }}
                >
                    <div className="w-4">
                        <IconSearch fill="#fff" />
                    </div>
                </div>
                <div onKeyDown={(e) => onEscape(e)}>
                    <Input
                        inputClassName="w-full bg-transparent text-white placeholder-white border-none focus:outline-none"
                        isUpdateField={false}
                        placeholder={placeholder}
                        refForm={refForm}
                        register={register}
                        required={false}
                        setValue={setValue}
                        typeInput="text"
                        onFocusCallBack={() => setInputFocus(true)}
                        onBlurCallBack={() => {
                            setInputFocus(false);
                            inputEmpty && setWidth(32);
                        }}
                        onChangeCallBack={(data) => (data === "" ? setInputEmpty(true) : setInputEmpty(false))}
                    />
                </div>
            </div>
        </div>
    );
};

export default SearchField;
