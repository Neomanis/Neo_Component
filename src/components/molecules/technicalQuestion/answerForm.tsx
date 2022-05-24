import React, { ReactElement } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, TextEditor } from "../../atoms";
import { useTranslation } from "../../../i18n";

interface Props {
    isUpdateField?: boolean;
    onSubmitAnswer?: (data: { text: string }) => void;
    text?: string;
    updateFunction?: (refForm: string, value: string) => void;
}

const AnswerForm = ({ isUpdateField, onSubmitAnswer, text, updateFunction }: Props): ReactElement => {
    const { register, setValue, handleSubmit, formState, watch } = useForm({ mode: "onSubmit" });

    const { t } = useTranslation();

    const onSubmit: SubmitHandler<{ text: string }> = async (data) => {
        onSubmitAnswer && onSubmitAnswer(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-2" data-testid="tq-answer-form-body">
            <div className="flex flex-col">
                <TextEditor
                    register={register}
                    refForm="text"
                    required
                    errorMessage={t("error.required")}
                    isError={formState?.errors.text}
                    setValue={setValue}
                    isUpdateField={isUpdateField}
                    updateFunction={updateFunction}
                    defaultValue={text}
                    className={"w-full h-48 mb-14"}
                    watch={watch}
                />
                {!isUpdateField && (
                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            className="h-11 w-40 rounded-3xl text-white flex items-center text-sm justify-center font-extrabold"
                            data={t("technicalQuestion.answer.create")}
                            style={{
                                background: "linear-gradient(49.89deg, #FF1166 12.35%, #FF3355 50.76%, #FF5555 87.67%)",
                            }}
                        />
                    </div>
                )}
            </div>
        </form>
    );
};

export default AnswerForm;
