import React, { ReactElement } from "react";
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";

import { Input, Button } from "../../atoms";

interface Props {
    cardOpen?: boolean;
    refForm: string;
    register?: UseFormRegister<FieldValues>;
    setValue?: UseFormSetValue<FieldValues>;
}

const InputChat = ({ cardOpen, refForm, register, setValue }: Props): ReactElement => {
    return (
        <div className="flex items-center p-2 bg-neo_blue relative z-20">
            <Input
                disabled={cardOpen}
                inputClassName="bg-transparent w-full border-none text-neo_lite focus:outline-none"
                isUpdateField={false}
                placeholder="send"
                refForm={refForm}
                register={register}
                required
                setValue={setValue}
                typeInput="text"
            />
            <div className="pl-1 transform hover:scale-105">
                <Button className="text-2xl text-neo_lite" type="submit" fontIcon={faPaperPlane} />
            </div>
        </div>
    );
};
export default InputChat;
