import React, { ReactElement } from "react";
import { faChevronDown, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../atoms";

interface Props {
    fCallBackCancel: () => void;
    fCallBackValidate: () => void;
    text?: string;
    posText?: string;
    paddingTxt?: string;
}

export default function ValidationCard({
    fCallBackCancel,
    fCallBackValidate,
    text = "",
    posText = "",
    paddingTxt = "pl-4",
}: Props): ReactElement {
    let flexType = "row";
    switch (posText) {
        case "top":
            paddingTxt = "px-2";
            flexType = "flex-col";
            break;
        case "bottom":
            paddingTxt = "px-2";
            flexType = "flex-col-reverse";
            break;
        case "left":
            flexType = "flex-row";
            break;
        case "right":
            paddingTxt = "pr-4";
            flexType = "flex-row-reverse";
            break;
        default:
            flexType = "row";
            break;
    }
    return (
        <div
            className={`flex ${flexType} text-white items-center justify-center border-2 border-neo_link bg-neo_bg_B rounded-md py-2`}
        >
            {text != "" && <p className={`${paddingTxt} py-1`}>{text}</p>}
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
                        className={"text-neo_red flex items-center justify-center rounded-lg mx-2"}
                        fCallback={(): void => fCallBackCancel()}
                    />
                </div>
            </div>
        </div>
    );
}
