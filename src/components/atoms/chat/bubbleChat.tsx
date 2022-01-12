import React, { ReactElement } from "react";
interface Props {
    bgColor?: string;
    border?: boolean;
    content: string;
    privateBorder?: boolean;
}

const BubbleChat = ({ bgColor, border, content, privateBorder }: Props): ReactElement => {
    return (
        <div
            className={`${bgColor}
            ${border && !privateBorder ? "border-2 border-neo-bg-B" : "border-2 border-neo-blue "}
             text-xxs rounded-md p-2  text-neo-light-grey`}
            data-testid="bubbleChat-body"
        >
            {content}
        </div>
    );
};

export default BubbleChat;
