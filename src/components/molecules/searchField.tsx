import React, { ReactElement, useRef, useState } from "react";
import { Button, Input } from "../atoms";

import {
    FieldValues,
    UseFormRegister,
    UseFormReset,
    UseFormSetFocus,
    UseFormSetValue,
} from "../../../node_modules/react-hook-form/dist";
import { CloseLogo, IconSearch } from "../../img/svg";

interface Props {
    fCallBack?: () => void;
    placeholder: string;
    refForm: string;
    register?: UseFormRegister<FieldValues>;
    setFocus?: UseFormSetFocus<FieldValues>;
    setValue?: UseFormSetValue<FieldValues>;
    reset?: UseFormReset<FieldValues>;
}

const SearchField = ({ fCallBack, placeholder, refForm, register, setValue, setFocus, reset }: Props): ReactElement => {
    const [width, setWidth] = useState(32);
    const [inputFocus, setInputFocus] = useState(false);
    const [inputEmpty, setInputEmpty] = useState(true);
    const [showClearButton, setShowClearButton] = useState(false);
    const timerCall = useRef<NodeJS.Timeout>();

    function onEscape(e: React.KeyboardEvent<HTMLDivElement>) {
        if (e.code === "Escape") {
            reset && reset();
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
                    onAnimationEnd={() => width === 200 && setShowClearButton(true)}
                    onAnimationStart={() => width === 32 && setShowClearButton(false)}
                >
                    <div className="w-4">
                        <IconSearch fill="#fff" />
                    </div>
                </div>
                <div className="relative" onKeyDown={(e) => onEscape(e)}>
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
                    {showClearButton && (
                        <Button
                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                            svg={<CloseLogo className=" w-2 h-2 " fill="#FFFFFF" />}
                            fCallback={() => reset && reset()}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchField;
