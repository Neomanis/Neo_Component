import React, { ReactElement } from "react";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../atoms";

interface Props {
    classNameContainer?: string;
    classNameText?: string;
    classNameButtonContainer?: string;
    classNameButtonValidate?: string;
    classNameButtonCancel?: string;
    fCallBackCancel: () => void;
    fCallBackValidate: () => void;
    text?: string;
}

export default function ValidationCard({
    classNameContainer = "flex text-white items-center justify-center border-2 border-neo-link bg-neo-bg-B rounded-md py-2",
    classNameText,
    classNameButtonContainer = "flex row px-2",
    fCallBackCancel,
    fCallBackValidate,
    text = "",
}: Props): ReactElement {
    return (
        <div className={classNameContainer}>
            {text != "" && <p className={classNameText}>{text}</p>}
            <div className={classNameButtonContainer}>
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
