import React, { ReactElement } from "react";
interface Props {
    bgColor?: string;
    border?: boolean;
    content: string;
    date: string;
    name: string;
}

export default function BubbleChat({ bgColor, border, content, date, name }: Props): ReactElement {
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
