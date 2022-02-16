import React, { ReactElement } from "react";
interface Props {
    bgColor?: string;
    border?: string;
    content: string | ReactElement;
}

const BubbleChat = ({ bgColor, border, content }: Props): ReactElement => {
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
