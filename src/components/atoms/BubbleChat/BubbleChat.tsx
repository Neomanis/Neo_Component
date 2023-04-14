import { classNames } from "@/utils/tools";
import React, { ReactElement } from "react";
import Linkify from "../Linkify";

export interface BubbleChatProps {
    bgColor?: string;
    border?: string;
    isValidate?: boolean;
    content: string | ReactElement;
}

const BubbleChat = ({ bgColor, border, content, isValidate = true }: BubbleChatProps): ReactElement => {
    return (
        <p
            className={classNames(
                "rounded-md p-2 text-neo-light-grey break-words",
                bgColor,
                border,
                border && "border-2",
                !isValidate && "opacity-50"
            )}
            data-testid="bubbleChat-body"
        >
            <Linkify>{content}</Linkify>
        </p>
    );
};

export default BubbleChat;
