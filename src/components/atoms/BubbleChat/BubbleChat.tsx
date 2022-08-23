import React, { ReactElement } from "react";

export interface BubbleChatProps {
    bgColor?: string;
    border?: string;
    content: string | ReactElement;
}

const BubbleChat = ({ bgColor, border, content }: BubbleChatProps): ReactElement => {
    return (
        <div
            className={`${bgColor} ${border} ${border && "border-2"} text-xxs rounded-md p-2 text-neo-light-grey`}
            data-testid="bubbleChat-body"
        >
            {content}
        </div>
    );
};

export default BubbleChat;
