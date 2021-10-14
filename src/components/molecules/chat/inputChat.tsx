import React, { ReactElement } from "react";
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import Button from "../../atoms/button";
import Input from "../../atoms/input/input";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";

interface Props {
    register?: UseFormRegister<FieldValues>;
    setValue?: UseFormSetValue<FieldValues>;
    refForm: string;
    cardOpen?: boolean;
}

const InputChat = ({ register, setValue, refForm, cardOpen }: Props): ReactElement => {
    return (
        <div className="flex items-center p-2 bg-neo_blue relative z-20">
            <Input
                placeholder="send"
                inputClassName="bg-transparent w-full border-none text-neo_lite focus:outline-none"
                refForm={refForm}
                typeInput="text"
                register={register}
                setValue={setValue}
                required
                isUpdateField={false}
                disabled={cardOpen}
            />
            <div className="pl-1 transform hover:scale-105">
                <Button className="text-2xl text-neo_lite" type="submit" fontIcon={faPaperPlane} />
            </div>
        </div>
    );
};
export default InputChat;
