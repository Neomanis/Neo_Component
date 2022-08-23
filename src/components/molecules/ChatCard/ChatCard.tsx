import React, { ReactElement } from "react";
import { InputChoice } from "@/components/atoms";

export interface ChatCardProps {
    data: { label: string; value: number }[];
    fCallBack: (data: { label: string; value: number }) => void;
}

const ChatCard = ({ data, fCallBack }: ChatCardProps): ReactElement => {
    return (
        <div className={`rounded-sm bg-neo-bg-B p-2 border-b-2 border-neo-expanded overflow-hidden`}>
            <div className="px-4 py-1">
                <InputChoice className={"my-1"} data={data} fCallBack={(data) => fCallBack(data)} />
            </div>
        </div>
    );
};

export default ChatCard;
