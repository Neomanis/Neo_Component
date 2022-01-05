import React, { ReactElement } from "react";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../atoms";

interface Props {
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

export default function ValidationCard({
    classNames = {
        container: "flex text-white items-center justify-center border-2 border-neo-link bg-neo-bg-B rounded-md py-2",
        buttonContainer: "flex row px-2",
    },
    fCallBackValidate,
    fCallBackCancel,
    text = "",
}: Props): ReactElement {
    return (
        <div className={classNames.container}>
            {text != "" && <p className={classNames.text}>{text}</p>}
            <div className={classNames.buttonContainer}>
                <div className="transform hover:scale-110">
                    <Button
                        fontIcon={faCheck}
                        className={"text-neo-green flex items-center justify-center rounded-lg mx-2"}
                        fCallback={(): void => {
                            fCallBackValidate();
                        }}
                    />
                </div>
                <div className="transform hover:scale-110">
                    <Button
                        fontIcon={faTimes}
                        className={"text-neo-red flex items-center justify-center rounded-lg mx-2"}
                        fCallback={(): void => fCallBackCancel()}
                    />
                </div>
            </div>
        </div>
    );
}
