import React, { ReactElement, useState } from "react";
import { Icon, Input } from "../atoms";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {
    FieldValues,
    UseFormRegister,
    UseFormSetFocus,
    UseFormSetValue,
} from "../../../node_modules/react-hook-form/dist";

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
                setTimeout(() => {
                    setFocus(refForm);
                }, 400);
                setWidth(200);
            }}
            onMouseLeave={() => !inputFocus && inputEmpty && setWidth(32)}
            className="flex items-center justify-between "
            style={{ width: width + "px", transition: "0.5s linear" }}
        >
            <div className=" bg-neo-bg-B h-8 flex items-center rounded-full overflow-hidden">
                <div className={`${width > 32 && "animate-onSpin"} ${width < 200 && "animate-onSpinReverse"} px-2`}>
                    <Icon fontIcon={faSearch} className="text-white" />
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
