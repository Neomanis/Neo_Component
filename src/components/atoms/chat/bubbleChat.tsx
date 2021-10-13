import React, { ReactElement } from "react";
interface Props {
    content: string;
    name: string;
    date: string;
    bgColor?: string;
    border?: boolean;
}

export default function BubbleChat({ content, name, date, bgColor, border }: Props): ReactElement {
    return (
        <div className={`${bgColor} ${border && "border border-neo_blue-light"} rounded-md px-2`}>
            <header className={`flex w-max text-neo_blue-light uppercase font-bold text-sm`}>
                <div className="">{name}</div>
                <div className="mx-1">-</div>
                <div>{date}</div>
            </header>
            <main className="w-full text-neo_lite text-xs pb-1">{content}</main>
        </div>
    );
}
