import React from "react";
import { IOutage } from "../../../interface";
import { Title, IconOutageCategorie } from "../../atoms";
import { getFormatedTimeToNowExtended } from "../../utils/getFormatedTimeToNow";

interface Props {
    data: IOutage;
    languageUser?: string;
}

const OutageTab = ({ data, languageUser }: Props): React.ReactElement => {
    let colorOutage = data.severity === "major" ? "neo_urgency-major" : "neo_urgency";
    if (
        new Date(data.startAt) > new Date() ||
        (data.endAt && data.hideAt && new Date(data.endAt) < new Date() && new Date() < new Date(data.hideAt))
    ) {
        colorOutage = "neo_black-black_05";
    }

    return (
        <div
            className={`cursor-pointer min-h-24 mb-7 bg-${colorOutage} bg-opacity-50 flex items-center justify-between py-3 pl-3 rounded-md z-10`}
        >
            <div className="text-4xl flex items-center">
                <IconOutageCategorie id={data.type === "event" ? 1 : 2} />
            </div>
            <div className="text-left px-4 w-full">
                <p className="text-xs whitespace-nowrap pb-2 ">
                    {getFormatedTimeToNowExtended(data.startAt, languageUser)}
                </p>
                <Title
                    data={data.title}
                    type={"h4"}
                    className="font-bold leading-tight uppercase text-sm truncate w-full"
                />
            </div>
        </div>
    );
};

export default OutageTab;
