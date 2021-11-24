import React, { ReactElement } from "react";
interface Props {
    bgColor?: string;
    border?: boolean;
    content: string;
}

const BubbleChat = ({ bgColor, border, content }: Props): ReactElement => {
    return (
        <div className={`${bgColor} ${border && "border-2 border-neo_blue"} rounded-md px-2`}>
            <main className="w-full text-neo_lite text-xs py-1" style={{ overflowWrap: "anywhere" }}>
                {content}
            </main>
        </div>
    );
};

export default BubbleChat;
