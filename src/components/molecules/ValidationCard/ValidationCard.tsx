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
}

const ValidationCard = ({
    classNames = {
        container: "flex text-white items-center justify-center border-2 border-neo-link bg-neo-bg-B rounded-md py-2",
        buttonContainer: "flex row px-2",
    },
    fCallBackValidate,
    fCallBackCancel,
    text = "",
}: ValidationCardProps): ReactElement => {
    return (
        <div className={classNames.container}>
            {text != "" && <p className={classNames.text}>{text}</p>}
            <div className={classNames.buttonContainer}>
                <div className="transform hover:scale-110">
                    <Button
                        startIcon={<FontAwesomeIcon icon={faCheck} />}
                        className={"text-neo-green flex items-center justify-center rounded-lg"}
                        onClick={(): void => {
                            fCallBackValidate();
                        }}
                        variant="none"
                        size="none"
                    />
                </div>
                <div className="transform hover:scale-110">
                    <Button
                        startIcon={<FontAwesomeIcon icon={faTimes} />}
                        className={"text-neo-red flex items-center justify-center rounded-lg"}
                        onClick={(): void => fCallBackCancel()}
                        variant="none"
                        size="none"
                    />
                </div>
            </div>
        </div>
    );
};

export default ValidationCard;
