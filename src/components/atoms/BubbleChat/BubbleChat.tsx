import { classNames } from "@/utils/tools";
import React, { ReactElement } from "react";

export interface BubbleChatProps {
    bgColor?: string;
    border?: string;
    isValidate?: boolean;
    content: string | ReactElement;
}

const BubbleChat = ({ bgColor, border, content, isValidate = true }: BubbleChatProps): ReactElement => {
    return (
        <div
            className={classNames(
                "text-xxs rounded-md p-2 text-neo-light-grey break-words",
                bgColor,
                border,
                border && "border-2",
                !isValidate && "opacity-50"
            )}
            data-testid="bubbleChat-body"
        >
            {content}
        </div>
    );
};

export default BubbleChat;
