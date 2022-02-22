import React, { ReactElement } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button, TextEditor } from "../../atoms";
import { useTranslation } from "../../../i18n";

interface Props {
    closeCallback?: () => void;
    isUpdateField?: boolean;
    onSubmitAnswer?: (data: { text: string }) => void;
    text?: string;
    updateFunction?: (refForm: string, value: string) => void;
}

const AnswerForm = ({ closeCallback, isUpdateField, onSubmitAnswer, text, updateFunction }: Props): ReactElement => {
    const { register, setValue, handleSubmit, formState } = useForm({ mode: "onSubmit" });

    const { t } = useTranslation();

    const onSubmit: SubmitHandler<{ text: string }> = async (data) => {
        onSubmitAnswer && onSubmitAnswer(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
            <div className="flex justify-center items-center">
                <TextEditor
                    register={register}
                    refForm="text"
                    required
                    errorMessage={t("ticketForm.errorRequired")}
                    isError={formState?.errors.text}
                    setValue={setValue}
                    isUpdateField={isUpdateField}
                    updateFunction={updateFunction}
                    defaultValue={text}
                    className={"w-full h-48 mb-6 ml-2"}
                />
                <div className="flex flex-col">
                    {isUpdateField && (
                        <Button fontIcon={faTimes} className="text-xl text-white mb-5" fCallback={closeCallback} />
                    )}
                    {!isUpdateField && <Button fontIcon={faSave} type="submit" className="text-xl text-white" />}
                </div>
            </div>
        </form>
    );
};

export default AnswerForm;
