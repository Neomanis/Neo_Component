import React, { ReactElement } from "react";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface ValidationCardProps {
    classNames?: {
        container?: string;
        text?: string;
        buttonContainer?: string;
        buttonValidate?: string;
        buttonCancel?: string;
    };
    fCallBackCancel: () => void;
    fCallBackValidate: () => void;
    text?: string;
    id?: string;
}

const ValidationCard = ({
    classNames = {
        container: "flex text-white items-center justify-center border-2 border-neo-link bg-neo-bg-B rounded-md py-2",
        buttonContainer: "flex row px-2",
    },
    fCallBackValidate,
    fCallBackCancel,
    text = "",
    id,
}: ValidationCardProps): ReactElement => {
    return (
        <div data-testid="validation-card-container" className={classNames.container}>
            {text != "" && <p className={classNames.text}>{text}</p>}
            <div className={classNames.buttonContainer}>
                <div className="transform hover:scale-110">
                    <Button
                        data-testid="on-click-validate"
                        startIcon={<FontAwesomeIcon icon={faCheck} />}
                        className={"text-neo-green flex items-center justify-center rounded-lg"}
                        onClick={(): void => {
                            fCallBackValidate();
                        }}
                        variant="none"
                        size="none"
                        id={`${id}-validate`}
                    />
                </div>
                <div className="transform hover:scale-110">
                    <Button
                        data-testid="on-click-cancel"
                        startIcon={<FontAwesomeIcon icon={faTimes} />}
                        className={"text-neo-red flex items-center justify-center rounded-lg"}
                        onClick={(): void => fCallBackCancel()}
                        variant="none"
                        size="none"
                        id={`${id}-cancel`}
                    />
                </div>
            </div>
        </div>
    );
};

export default ValidationCard;
