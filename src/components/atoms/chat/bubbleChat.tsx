import React, { ReactElement } from "react";
interface Props {
    bgColor?: string;
    border?: boolean;
    content: string;
    date: string;
    name: string;
}

const BubbleChat = ({ bgColor, border, content, date, name }: Props): ReactElement => {
    return (
        <div className={`${bgColor} ${border && "border border-neo_blue-light"} rounded-md px-2`}>
            <header className={` text-neo_blue-light uppercase font-bold`}>
                <div className="text-sm">{name}</div>
                <div className=" text-neo_blue-blue_sky text-xs">{date}</div>
            </header>
            <main className="w-full text-neo_lite text-xs py-1" style={{ overflowWrap: "anywhere" }}>
                {content}
            </main>
        </div>
    );
};

export default BubbleChat;
