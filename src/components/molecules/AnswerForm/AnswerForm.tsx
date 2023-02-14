import React, { ReactElement } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslation } from "@neomanis/neo-translation";
import { TextEditor, Button } from "@/components/atoms";

export interface AnswerFormProps {
    isUpdateField?: boolean;
    onSubmitAnswer?: (data: { text: string }) => void;
    text?: string;
    updateFunction?: (refForm: string, value: string) => void;
}

const AnswerForm = ({ isUpdateField, onSubmitAnswer, text, updateFunction }: AnswerFormProps): ReactElement => {
    const formMethods = useForm({ mode: "onSubmit" });
    const { t } = useTranslation();

    const onSubmit: SubmitHandler<{ text: string }> = async (data) => {
        onSubmitAnswer && onSubmitAnswer(data);
    };

    return (
        <form onSubmit={formMethods.handleSubmit(onSubmit)} className="p-2" data-testid="tq-answer-form-body">
            <div className="flex flex-col">
                <TextEditor
                    formMethods={formMethods}
                    refForm="text"
                    required
                    errorMessage={t("error.required")}
                    isUpdateField={isUpdateField}
                    updateFunction={updateFunction}
                    defaultValue={text}
                    className={"w-full h-48 mb-14"}
                />
                {!isUpdateField && (
                    <div className="flex justify-end">
                        <Button type="submit">{t("technicalQuestion.answer.create")}</Button>
                    </div>
                )}
            </div>
        </form>
    );
};

export default AnswerForm;
