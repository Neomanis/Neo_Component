import React, { ReactElement } from "react";
import { faChevronDown, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../atoms";

interface Props {
    fCallBackCancel: () => void;
    fCallBackValidate: () => void;
    text?: string;
    posText?: string;
}

export default function ValidationCard({
    fCallBackCancel,
    fCallBackValidate,
    text = "",
    posText = "",
}: Props): ReactElement {
    let flexType = "row";
    switch (posText) {
        case "top":
            flexType = "flex-col";
            break;
        case "bottom":
            flexType = "flex-col-reverse";
            break;
        case "left":
            flexType = "flex-row";
            break;
        case "right":
            flexType = "flex-row-reverse";
            break;
        default:
            flexType = "row";
            break;
    }
    return (
        <div
            className={`flex ${flexType} items-center justify-center border-2 border-neo_blue-light bg-neo_blue text-neo_blue-light rounded-md`}
        >
            <p className="px-2 py-2">{text}</p>
            <div className="flex row px-2">
                <div className="transform hover:scale-110">
                    <Button
                        fontIcon={faChevronDown}
                        className={"text-neo_green flex items-center justify-center rounded-lg mx-2"}
                        fCallback={(): void => {
                            fCallBackValidate();
                        }}
                    />
                </div>
                <div className="transform hover:scale-110">
                    <Button
                        fontIcon={faTimes}
                        className={"text-neo_red flex items-center justify-center rounded-lg"}
                        fCallback={(): void => fCallBackCancel()}
                    />
                </div>
            </div>
        </div>
    );
}
